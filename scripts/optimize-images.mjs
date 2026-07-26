#!/usr/bin/env node
// Optimise public/captures/ : redimensionne + convertit en .webp, met à jour
// src/data/captures-dimensions.json (utilisé par ProductExplorer.astro pour
// fixer width/height et éviter le layout shift).
//
// Idempotent : ignore un fichier dont le .webp existe déjà. Convertit et
// SUPPRIME la source PNG/JPG après conversion (sauvegardée d'abord) — sinon
// le regex de ProductExplorer.astro afficherait source ET .webp comme deux
// images distinctes (bug réel, pas cosmétique). Ignore et log un
// avertissement pour tout fichier dont le préfixe ne correspond à aucun id
// produit connu (ex. iecho-1.png) — jamais de suppression automatique dans
// ce cas, à revoir par JP.
//
// Usage : npm run optimize-images   (depuis iecho.ca/)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(ICI, '..');
const DOSSIER_CAPTURES = path.join(RACINE, 'public/captures');
const DOSSIER_BACKUP = path.join(ICI, '.captures-originals-backup');
const CHEMIN_DIMENSIONS = path.join(RACINE, 'src/data/captures-dimensions.json');

const LARGEUR_MAX = 1800;
const QUALITE_WEBP = 80;

// Coquille connue à corriger avant tout traitement (bilbao mal orthographié).
const RENOMMAGES = {
  'bilabo-2.png': 'bilbao-2.png',
};

function idsProduitsConnus() {
  const config = JSON.parse(
    fs.readFileSync(path.join(RACINE, 'src/data/produits.config.json'), 'utf-8')
  );
  return new Set(config.ordre ?? []);
}

function appliquerRenommages() {
  for (const [ancien, nouveau] of Object.entries(RENOMMAGES)) {
    const cheminAncien = path.join(DOSSIER_CAPTURES, ancien);
    const cheminNouveau = path.join(DOSSIER_CAPTURES, nouveau);
    if (fs.existsSync(cheminAncien) && !fs.existsSync(cheminNouveau)) {
      fs.renameSync(cheminAncien, cheminNouveau);
      console.log(`[renommage] ${ancien} → ${nouveau}`);
    }
  }
}

async function main() {
  if (!fs.existsSync(DOSSIER_CAPTURES)) {
    console.log(`Dossier introuvable : ${DOSSIER_CAPTURES}`);
    return;
  }
  fs.mkdirSync(DOSSIER_BACKUP, { recursive: true });

  appliquerRenommages();

  const ids = idsProduitsConnus();
  const fichiers = fs.readdirSync(DOSSIER_CAPTURES);
  const motif = /^([a-z0-9.]+)-(\d+)\.(png|jpe?g)$/i;

  const dimensionsExistantes = fs.existsSync(CHEMIN_DIMENSIONS)
    ? JSON.parse(fs.readFileSync(CHEMIN_DIMENSIONS, 'utf-8'))
    : {};
  // Purge les entrées dont le fichier n'existe plus dans public/captures/
  // (ex. un produit re-capturé avec moins d'images qu'avant).
  const fichiersPresents = new Set(fs.readdirSync(DOSSIER_CAPTURES));
  const dimensions = { _doc: dimensionsExistantes._doc };
  for (const [nom, valeur] of Object.entries(dimensionsExistantes)) {
    if (nom === '_doc' || fichiersPresents.has(nom)) dimensions[nom] = valeur;
  }

  let traites = 0;
  let ignoresIdInconnu = 0;

  for (const fichier of fichiers) {
    const match = fichier.match(motif);
    if (!match) continue; // .webp, .DS_Store, .gitkeep, etc. — pas notre affaire ici

    const prefixe = match[1];
    if (!ids.has(prefixe)) {
      console.warn(`[ignoré] "${fichier}" — préfixe "${prefixe}" ne correspond à aucun produit connu. À revoir manuellement.`);
      ignoresIdInconnu++;
      continue;
    }

    const nomBase = fichier.replace(/\.(png|jpe?g)$/i, '');
    const nomWebp = `${nomBase}.webp`;
    const cheminEntree = path.join(DOSSIER_CAPTURES, fichier);
    const cheminSortie = path.join(DOSSIER_CAPTURES, nomWebp);

    if (fs.existsSync(cheminSortie)) {
      console.log(`[déjà fait] ${fichier} → ${nomWebp} existe déjà, ignoré (idempotent).`);
      continue;
    }

    const image = sharp(cheminEntree).resize({ width: LARGEUR_MAX, withoutEnlargement: true });
    const { width, height } = await image.webp({ quality: QUALITE_WEBP }).toFile(cheminSortie);
    dimensions[nomWebp] = { width, height };

    // Sauvegarde puis suppression de la source (voir note en tête de fichier).
    fs.copyFileSync(cheminEntree, path.join(DOSSIER_BACKUP, fichier));
    fs.unlinkSync(cheminEntree);

    console.log(`[optimisé] ${fichier} → ${nomWebp} (${width}×${height})`);
    traites++;
  }

  fs.writeFileSync(CHEMIN_DIMENSIONS, JSON.stringify(dimensions, null, 2) + '\n');

  console.log(`\n${traites} image(s) optimisée(s), ${ignoresIdInconnu} ignorée(s) (id inconnu).`);
  console.log(`Originaux sauvegardés dans ${path.relative(RACINE, DOSSIER_BACKUP)}`);
  console.log(`Dimensions écrites dans ${path.relative(RACINE, CHEMIN_DIMENSIONS)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
