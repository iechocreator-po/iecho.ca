# iecho.ca — Roadmap des fonctionnalités

> Statuts : 🔲 À faire · 🔶 En cours · ✅ Terminé · 💡 Proposée (idée à explorer)
> Ce fichier est le squelette de suivi local du hub. Les items votés/priorisés à
> l'échelle du portfolio vivent dans bilbao (feature-factory) — export
> `src/data/roadmap.bilbao.json`, committé manuellement, lu au build Astro.

## Fonctionnalités

| # | ID | Fonctionnalité | Statut | Notes |
| --- | --- | --- | --- | --- |
| 1 | 99 | Vitrine produits trilingue (FR/EN/ES) | ✅ | `ProductExplorer.astro`, données `src/data/produits/{fr,en,es}.json`. |
| 2 | 100 | Sélecteur de produits + fiche détaillée | ✅ | Onglets, bouton « Essayer » conditionnel à la présence d'un `lien`. |
| 3 | 101 | Roadmap publique par produit (issue de bilbao) | 🔲 | Correspond à R13 de la roadmap bilbao — intégration de `roadmap.bilbao.json` dans la vitrine, pas encore branchée côté Astro. |
| 4 | 102 | Bouton de feedback « Partager une idée » (Formspree) | ✅ | `FeedbackWidget.astro` — bouton flottant, `<dialog>` modal, contexte auto (page + produit affiché), envoi Formspree. `FORMSPREE_ID` codé en dur dans le composant — à extraire vers `src/config/settings.json` (voir feedback bilbao). |
| 5 | 103 | Mission / À propos | 🔲 | Textes pas encore rédigés (en attente contenu de Jean-Pierre). |
| 6 | 104 | Section « Logos en gestation » (votes visiteurs) | 🔲 | Idée du brief initial, pas commencée. |

## Idées à explorer

| # | Idée | Statut | Notes |
|---|---|---|---|
| I1 | Produit `test-factory` — cockpit de synchronisation des tests du portfolio | 💡 | Sur le même principe que bilbao (cockpit local, résolution code→dossier via le mapping existant du `CLAUDE.md` racine) : se synchronise avec les fichiers de tests de chaque produit (ex. `pytest tests/` pour toledo, futures suites JS pour valencia/madrid/barcelona), et centralise état des suites, dernière exécution, couverture si disponible. Pas un engagement de livraison — noté ici pour ne pas perdre l'idée. |
