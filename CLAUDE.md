# iecho.ca — le hub

> **Rôle :** vitrine publique trilingue de l'ensemble du portfolio iecho. Pas un
> produit numérique comme les autres — c'est la porte d'entrée. Voir le
> `CLAUDE.md` racine (`2000_DigitalProducts/CLAUDE.md`) pour le contexte complet
> du portfolio et la mécanique d'intégration produit → vitrine.

## Démarrage de session — features en attente

Depuis R24 (2026-07-20), **bilbao** (`../feature-factory/`) est l'unique
source de vérité des features/roadmap du hub — pas de
`docs/features-roadmap.md` local. À chaque nouvelle session sur iecho.ca,
présenter d'emblée la liste des features/idées/questions dont le statut
n'est ni `Livre` ni `Rejete`, lue directement dans l'export JSON (pas besoin
que bilbao tourne) :

```bash
python3 -c "
import json
d = json.load(open('../feature-factory/data/iecho.ca/features.json'))
for f in d['features']:
    if f['statut'] not in ('Livre', 'Rejete'):
        print(f['id'], f['statut'], f['votes'], f['titre'])
"
```

Pour marquer une feature complétée, en ajouter une nouvelle, ou assembler une
release note, passer par l'API de bilbao (`npm start` dans
`feature-factory/`, 127.0.0.1:4600, cible `iecho.ca` — support hub depuis
R17) — jamais éditer `features.json` à la main (régénéré à chaque mutation,
toute édition manuelle serait écrasée).

## Stack

- **Générateur** : Astro (build statique), i18n natif.
- **Déploiement** : Cloudflare Pages, connecté au repo GitHub — chaque push sur
  `main` redéploie automatiquement. Pas de `wrangler.toml`/`wrangler.jsonc`
  nécessaire (patron « Pages classique », voir CLAUDE.md racine).
- **Langues** : français (défaut), anglais, espagnol — routing par chemin
  (`iecho.ca/fr`, `/en`, `/es`), slugs localisés définis dans `src/i18n/ui.ts`
  (`routes`).
- **Identité visuelle propre** : thème sombre, accent sarcelle/ambre, motif
  « ondes concentriques » — variables CSS françaises (`--fond`, `--texte`,
  `--accent`…) dans `src/styles/global.css`. **Ne consomme volontairement pas**
  `design-system/tokens.css` (identité de marque distincte du design system
  utilisé à l'intérieur des produits).

## Structure

- `src/data/produits/{fr,en,es}.json` — un objet par produit (id, nom,
  sousTitre, résumé, besoin, lien optionnel, stack, roadmap). **8 produits**
  depuis le 28/7/2026 : marbella, toledo, madrid, valencia, barcelona (avec
  `lien`), castellana, bilbao, porto (ces trois derniers sans `lien`, même
  patron que toledo/madrid/valencia — app locale, jamais déployée).
- `src/data/produits.config.json` — ordre d'affichage (`ordre`) et liste des
  produits affichant la section technique (`afficherTechnique`).
- `src/data/nouveautes/{fr,en,es}.json` — « Quoi de neuf » par produit, texte
  inline (jamais de lien cliquable — tous les repos produits sont **privés**
  sur GitHub sauf toledo et iecho.ca lui-même, un lien casserait pour un
  visiteur public). N'inclut que les releases marquées `publique: "Oui"`
  dans `feature-factory/data/<id>/releases.json`. Maintenu à la main.
- `src/data/captures-dimensions.json` — **généré par
  `scripts/optimize-images.mjs`**, jamais à la main : largeur/hauteur réelle
  de chaque capture, utilisée par `ProductExplorer.astro` pour fixer
  `width`/`height` sur les `<img>` de la **galerie** (évite le layout shift).
  ⚠️ **Ne jamais poser ces attributs `width`/`height` sur l'`<img class="vignette">`**
  de la carte de sélection (`.onglet-produit`) : elle a un `aspect-ratio: 16/10`
  CSS volontaire (recadrage `object-fit: cover`) pour garder des cartes de
  taille homogène quelle que soit la capture source. Poser `width`/`height`
  HTML dessus fait ignorer ce ratio par le navigateur, qui affiche l'image à
  sa hauteur native (bien plus grande que la carte) — bug réel rencontré et
  corrigé le 26/7/2026, gardait exactement le même symptôme peu importe
  l'image (même une capture jamais modifiée en montrait les effets). Le
  format original (attributs `width`/`height` sur la galerie **seulement**,
  jamais sur la vignette) doit être conservé.
- `src/components/ProductExplorer.astro` — rend génériquement les données
  ci-dessus (tabs + panneau détail). **Ajouter un produit ne touche jamais ce
  composant**, uniquement les fichiers de données.
- `src/components/FeedbackWidget.astro` — bouton flottant « Partager une idée »,
  modale, envoi Formspree (`FORMSPREE_ID` codé en dur — à extraire vers
  `src/config/settings.json`).
- `src/i18n/ui.ts` — langues, routes localisées, fonction de traduction `t()`.
- `scripts/roadmap-diff.mjs`, `scripts/capture-screenshots.mjs`,
  `scripts/optimize-images.mjs` — voir « Workflows » ci-dessous.

## Comment un produit s'intègre à la vitrine

Voir la section dédiée du `CLAUDE.md` racine — résumé : éditer
`src/data/produits/{fr,en,es}.json` (un objet par produit) + ajouter l'`id` à
`produits.config.json > ordre` + déposer les captures dans `public/captures/`.
Aucune modification de composant nécessaire.

## Workflows

**Synchroniser la feuille de route avec bilbao** (source de vérité réelle,
`feature-factory/data/<id>/features.json`) :
```bash
npm run roadmap-diff
```
Compare (heuristique de titres, best-effort) la roadmap actuelle de
`produits/fr.json` avec les features actives côté bilbao et imprime un
rapport (candidats à ajouter, changements de statut, entrées à vérifier) +
l'écrit dans `scripts/.roadmap-diff/<date>.md` (gitignored). **Semi-
automatique par choix** : recopier à la main, en traduisant, dans
`produits/{fr,en,es}.json` — la qualité de traduction reste humaine, jamais
d'écriture automatique de ce script.

**Captures d'écran** (produits locaux uniquement — toledo, madrid, valencia,
castellana, bilbao ; marbella et barcelona hors scope, voir en-tête du
script) :
```bash
npm run captures            # démarrer d'abord chaque serveur local, voir
                             # CONFIG_PRODUITS dans scripts/capture-screenshots.mjs
npm run optimize-images      # convertit en .webp, écrit captures-dimensions.json
# ou npm run captures:full pour enchaîner les deux
```
⚠️ castellana et bilbao affichent tes propres données réelles (watchlist,
feedback) — nettoyer/réinitialiser avant de capturer, ces images deviennent
publiques sur iecho.ca. `optimize-images` est idempotent, supprime les PNG/JPG
sources après conversion (sauvegardés dans
`scripts/.captures-originals-backup/`, gitignored) et ignore (sans y toucher)
tout fichier dont le préfixe ne correspond à aucun id produit connu
(actuellement : `iecho-1.png`/`iecho-2.png`, à revoir manuellement).

**« Quoi de neuf »** : n'ajouter une entrée dans `nouveautes/{fr,en,es}.json`
que si la release correspondante est `publique: "Oui"` dans
`feature-factory/data/<id>/releases.json` — sinon elle reste interne
(ex. castellana au 25/7/2026, release marquée `"Non"`).

