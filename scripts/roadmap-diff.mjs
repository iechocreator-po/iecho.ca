#!/usr/bin/env node
// Compare la roadmap publique de chaque produit (src/data/produits/fr.json)
// avec la source de vérité bilbao (../feature-factory/data/<id>/features.json)
// et imprime un rapport des écarts — candidats à ajouter, changements de
// statut suggérés, entrées à vérifier.
//
// Lecture SEULE des deux côtés : ne modifie ni features.json (propriété de
// bilbao) ni produits/*.json (JP recopie à la main, avec la bonne traduction
// FR/EN/ES — la qualité de traduction reste humaine, voir CLAUDE.md).
//
// Usage : npm run roadmap-diff   (depuis iecho.ca/)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE_ICHECO = path.resolve(ICI, '..');
const RACINE_PORTFOLIO = path.resolve(RACINE_ICHECO, '..');
const DOSSIER_BILBAO = path.join(RACINE_PORTFOLIO, 'feature-factory', 'data');

// Dupliqué depuis feature-factory/server/roadmap.js:STATUT_PUBLIC — garder en
// synchro manuellement si bilbao change son vocabulaire public.
const STATUT_PUBLIC = {
  Idee: 'proposee',
  Planifie: 'proposee',
  En_Cours: 'encours',
  Livre: 'livree',
};

function normaliser(titre) {
  return titre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accents
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// Score de recouvrement de tokens — heuristique volontairement simple, sert
// d'aide à la lecture pour JP, pas d'auto-résolution fiable.
function scoreRecouvrement(a, b) {
  const ta = new Set(normaliser(a));
  const tb = new Set(normaliser(b));
  if (ta.size === 0 || tb.size === 0) return 0;
  let commun = 0;
  for (const mot of ta) if (tb.has(mot)) commun++;
  return commun / Math.max(ta.size, tb.size);
}

const SEUIL_MATCH = 0.4;

function lireJson(chemin) {
  return JSON.parse(fs.readFileSync(chemin, 'utf-8'));
}

function main() {
  const config = lireJson(path.join(RACINE_ICHECO, 'src/data/produits.config.json'));
  const produitsFr = lireJson(path.join(RACINE_ICHECO, 'src/data/produits/fr.json'));
  const roadmapParId = Object.fromEntries(produitsFr.map((p) => [p.id, p.roadmap ?? []]));

  const ids = config.ordre ?? [];
  const rapport = [];

  for (const id of ids) {
    const cheminFeatures = path.join(DOSSIER_BILBAO, id, 'features.json');
    if (!fs.existsSync(cheminFeatures)) {
      rapport.push({ id, absent: true });
      continue;
    }

    const { features } = lireJson(cheminFeatures);
    const actives = features.filter((f) => f.statut !== 'Rejete' && STATUT_PUBLIC[f.statut]);
    const roadmapActuelle = roadmapParId[id] ?? [];

    const candidats = [];
    const changements = [];
    const matchees = new Set(); // index de roadmapActuelle déjà matché

    for (const f of actives) {
      const statutPublic = STATUT_PUBLIC[f.statut];
      let meilleur = { i: -1, score: 0 };
      roadmapActuelle.forEach((r, i) => {
        if (matchees.has(i)) return;
        const s = scoreRecouvrement(f.titre, r.titre);
        if (s > meilleur.score) meilleur = { i, score: s };
      });

      if (meilleur.score >= SEUIL_MATCH) {
        matchees.add(meilleur.i);
        const existant = roadmapActuelle[meilleur.i];
        if (existant.statut !== statutPublic) {
          changements.push({
            titreBilbao: f.titre,
            titreActuel: existant.titre,
            statutActuel: existant.statut,
            statutSuggere: statutPublic,
          });
        }
      } else {
        candidats.push({ titre: f.titre, statut: statutPublic, votes: f.votes ?? 0 });
      }
    }

    const aVerifier = roadmapActuelle
      .map((r, i) => ({ r, i }))
      .filter(({ i }) => !matchees.has(i))
      .map(({ r }) => r.titre);

    rapport.push({ id, candidats, changements, aVerifier });
  }

  // --- Sortie console ---
  console.log('\n=== Diff roadmap bilbao → iecho.ca ===\n');
  for (const entree of rapport) {
    if (entree.absent) {
      console.log(`• ${entree.id} — aucun features.json trouvé côté bilbao, ignoré.\n`);
      continue;
    }
    const { id, candidats, changements, aVerifier } = entree;
    if (candidats.length === 0 && changements.length === 0 && aVerifier.length === 0) {
      console.log(`• ${id} — rien à signaler, roadmap à jour.\n`);
      continue;
    }
    console.log(`• ${id}`);
    if (candidats.length) {
      console.log('  Candidats à ajouter :');
      for (const c of candidats) console.log(`    [+] (${c.statut}, ${c.votes} votes) ${c.titre}`);
    }
    if (changements.length) {
      console.log('  Changements de statut suggérés :');
      for (const c of changements) {
        console.log(`    [~] "${c.titreActuel}" : ${c.statutActuel} → ${c.statutSuggere} (bilbao: "${c.titreBilbao}")`);
      }
    }
    if (aVerifier.length) {
      console.log('  À vérifier / possiblement obsolète (aucune correspondance active côté bilbao) :');
      for (const t of aVerifier) console.log(`    [?] ${t}`);
    }
    console.log('');
  }
  console.log(
    "Rappel : ce rapport est une aide à la lecture (heuristique de titres), pas une vérité\nautomatique. Recopier à la main, en traduisant, dans produits/{fr,en,es}.json.\n"
  );

  // --- Rapport markdown horodaté ---
  const dossierRapports = path.join(ICI, '.roadmap-diff');
  fs.mkdirSync(dossierRapports, { recursive: true });
  const horodatage = new Date().toISOString().replace(/[:.]/g, '-');
  const cheminRapport = path.join(dossierRapports, `${horodatage}.md`);
  const lignes = [`# Diff roadmap bilbao → iecho.ca — ${new Date().toISOString()}`, ''];
  for (const entree of rapport) {
    if (entree.absent) {
      lignes.push(`## ${entree.id}`, '', '_Aucun features.json trouvé côté bilbao._', '');
      continue;
    }
    const { id, candidats, changements, aVerifier } = entree;
    lignes.push(`## ${id}`, '');
    if (candidats.length) {
      lignes.push('### Candidats à ajouter');
      for (const c of candidats) lignes.push(`- [ ] (${c.statut}, ${c.votes} votes) ${c.titre}`);
      lignes.push('');
    }
    if (changements.length) {
      lignes.push('### Changements de statut suggérés');
      for (const c of changements) {
        lignes.push(`- [ ] "${c.titreActuel}" : ${c.statutActuel} → ${c.statutSuggere} (bilbao: "${c.titreBilbao}")`);
      }
      lignes.push('');
    }
    if (aVerifier.length) {
      lignes.push('### À vérifier / possiblement obsolète');
      for (const t of aVerifier) lignes.push(`- [ ] ${t}`);
      lignes.push('');
    }
    if (!candidats.length && !changements.length && !aVerifier.length) {
      lignes.push('_Rien à signaler._', '');
    }
  }
  fs.writeFileSync(cheminRapport, lignes.join('\n'));
  console.log(`Rapport écrit dans ${path.relative(RACINE_ICHECO, cheminRapport)}`);
}

main();
