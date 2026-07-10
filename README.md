# iecho.ca

Site vitrine d'**iecho** — un atelier de produits numériques. Sombre, sobre, trilingue.
Voir [iecho-brief-projet.md](iecho-brief-projet.md) pour les décisions de départ.

## Stack

- [Astro](https://astro.build) — site statique, i18n natif par chemin (`/fr`, `/en`, `/es`),
  français par défaut (`/` redirige vers `/fr/`)
- Aucun framework front : HTML/CSS + un peu de JS vanilla (onglets produits, modale feedback)
- Feedback : [Formspree](https://formspree.io) — aucun backend

## Développement

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/
```

## Où modifier quoi

| Quoi | Où |
|---|---|
| Contenu des produits (résumé, besoin, stack, roadmap) | `src/data/produits/{fr,en,es}.json` |
| Ordre des produits et affichage de la section technique | `src/data/produits.config.json` (`ordre`, `afficherTechnique`) |
| Textes d'interface et pages Mission / À propos | `src/i18n/ui.ts` |
| Slugs localisés des pages | `routes` dans `src/i18n/ui.ts` + fichiers `src/pages/<lang>/` |
| Design (couleurs, ondes, composants) | `src/styles/global.css` |
| Captures d'écran d'un produit | déposer dans `public/captures/` nommées `<id>-1.png`, `<id>-2.png`… (png/jpg/webp) — la `-1` devient la vignette du bouton, toutes vont dans la galerie. Détection automatique au build, rien d'autre à faire |

Statuts de roadmap : `proposee`, `encours`, `livree`.

## À faire avant la mise en ligne

1. **Formspree** : créer un formulaire sur formspree.io et remplacer `VOTRE_ID_FORMSPREE`
   dans `src/components/FeedbackWidget.astro`
2. Rédiger les textes Mission et À propos (`src/i18n/ui.ts`)
3. Ajouter les captures d'écran des produits
4. Déployer sur Vercel ou Netlify, brancher le domaine iecho.ca (GoDaddy)

## Convention

La marque **iecho** s'écrit toujours en minuscules, même en début de phrase.
