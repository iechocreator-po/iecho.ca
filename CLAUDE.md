# iecho.ca — le hub

> **Rôle :** vitrine publique trilingue de l'ensemble du portfolio iecho. Pas un
> produit numérique comme les autres — c'est la porte d'entrée. Voir le
> `CLAUDE.md` racine (`2000_DigitalProducts/CLAUDE.md`) pour le contexte complet
> du portfolio et la mécanique d'intégration produit → vitrine.

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
  sousTitre, résumé, besoin, lien optionnel, stack, roadmap).
- `src/data/produits.config.json` — ordre d'affichage (`ordre`) et liste des
  produits affichant la section technique (`afficherTechnique`).
- `src/data/roadmap.bilbao.json` — **artefact émis par bilbao** (feature-factory),
  committé manuellement, pas encore lu par le build Astro (voir roadmap R13 de
  bilbao et item #3 de `docs/features-roadmap.md` de ce produit).
- `src/components/ProductExplorer.astro` — rend génériquement les données
  ci-dessus (tabs + panneau détail). **Ajouter un produit ne touche jamais ce
  composant**, uniquement les fichiers de données.
- `src/components/FeedbackWidget.astro` — bouton flottant « Partager une idée »,
  modale, envoi Formspree (`FORMSPREE_ID` codé en dur — à extraire vers
  `src/config/settings.json`).
- `src/i18n/ui.ts` — langues, routes localisées, fonction de traduction `t()`.

## Comment un produit s'intègre à la vitrine

Voir la section dédiée du `CLAUDE.md` racine — résumé : éditer
`src/data/produits/{fr,en,es}.json` (un objet par produit) + ajouter l'`id` à
`produits.config.json > ordre` + déposer les captures dans `public/captures/`.
Aucune modification de composant nécessaire.

## Roadmap

Voir [docs/features-roadmap.md](docs/features-roadmap.md) — inclut aussi les
idées à explorer (ex. produit `test-factory`, cockpit de synchronisation des
tests du portfolio).
