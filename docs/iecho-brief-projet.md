# Brief de projet — iecho.ca

Document de démarrage pour Claude Code. Résume toutes les décisions prises jusqu'ici.

## Identité

- Nom de marque : **iecho** — toujours en minuscule, même en début de phrase ou dans les titres
- Ambiance : sombre, mystérieuse, sobre. Retenue plutôt que tape-à-l'œil.
- Motif visuel signature : ondes concentriques (l'écho), réutilisé dans les interactions — hover, transitions, clic sur une carte
- Langues : français (par défaut), anglais, espagnol
- Routing par chemin : iecho.ca/fr, /en, /es (meilleur pour le référencement et le partage de liens)

## Stack technique recommandée

- **Générateur** : Astro — bon support i18n natif, sites rapides, peu de JS par défaut, bien adapté à une esthétique sombre et sobre
- **Déploiement** : Vercel ou Netlify, domaine iecho.ca (actuellement chez GoDaddy) à brancher dessus
- **Contenu** : fichiers structurés (JSON ou Markdown), un jeu par langue, édités via Claude Code + Git. Pas de CMS lourd pour l'instant — option Decap CMS plus tard si Jean-Pierre veut éditer sans repasser par Claude Code
- **Feedback** : collecte privée, voir section dédiée plus bas

## Structure du site

### Page par défaut : Produits

- Navigation horizontale entre les produits (type tabs ou carrousel)
- Sélection d'un produit → affichage en dessous de :
  - phrase résumé
  - description détaillée (le besoin auquel le produit répond)
  - captures d'écran
  - section technique (stack, fonctionnement)
- Sous-section **Fonctionnalités / Feuille de route** : liste des features avec statut — proposée / en cours / livrée

### Mission

- Intention derrière iecho : expérimentation, apprentissage (le sien d'abord). **Texte à écrire ensemble — pas encore rédigé.**
- Section « Logos en gestation » : les visiteurs votent ou commentent lequel les inspire

### À propos

- Mini-bio à partir du texte LinkedIn que Jean-Pierre va fournir (en attente)
- Sous-section : collaborations / collaborateurs
- Sous-section : trucs personnels, plus légers

## Bouton de feedback — « Partager une idée »

- Discret, persistant, visible partout (coin de l'écran ou pied de page)
- **Version simple à tester dès le jour 1** :
  - bouton flottant → petite fenêtre modale
  - contexte automatique inclus (quelle page / produit / logo était affiché)
  - champ texte libre
  - envoi via un formulaire Formspree (gratuit, aucun backend à coder, réponses reçues par courriel et archivées)
- Rien n'est affiché publiquement par défaut. Jean-Pierre seul consulte les réponses.
- Phase 2 : ajouter un système d'approbation pour choisir quels commentaires deviennent publics (ex. votes de logo affichés)

## Produits actuels

| Nom de code (proposition) | Dossier | Description |
|---|---|---|
| toledo | traducteur-pdf | Manipulation de PDF : traduction, conversion en Markdown, conversion en voix |
| marbella | calc-retirement | Calculatrice pour la retraite |
| valencia | espagne-immo | Agrégateur de fiches immobilières en Espagne + dashboard |
| madrid | investment-dashboard | Dashboard de portefeuille financier |
| barcelona | learning-finance | Apprentissage ludique de concepts avancés en trading |

Noms de code proposés à titre d'exemple, inspirés de villes espagnoles avec un lien thématique où possible (Tolède pour la traduction, en clin d'œil à l'École des traducteurs de Tolède ; Madrid pour la finance/bourse ; Marbella pour la retraite). Jean-Pierre avait ses propres noms en tête — à remplacer si différents.

## Prochaines étapes

1. Ouvrir le dossier `iecho.ca` dans Claude Code et lui donner ce brief comme point de départ
2. Mise en place du projet Astro, structure de dossiers, page Produits avec navigation horizontale
3. Bouton de feedback, version Formspree
4. Mission et À propos une fois les textes fournis
5. Déploiement et branchement du domaine
