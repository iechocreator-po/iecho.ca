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

## Journal de bord (12/10/2026, bilbao #432)

Quatrième page du menu, **Journal** (`/fr/journal/`, `/en/journal/`, `/es/diario/`) : entrées datées de type
**Livré** ou **Anticipé**, filtrables par produit et par type, avec un flux RSS (`/journal.xml`, français).
**Travail sur la branche `journal-de-bord`, pas fusionné dans `main` : tant qu'il ne l'est pas, rien n'est en ligne.**

- **Données** : `src/data/journal/entries.json`, une copie **éditoriale commitée**. Elle n'est jamais lue depuis bilbao
  au build (bilbao est local, le build Cloudflare ne le voit pas), et ne reprend jamais la description brute d'une
  feature : titre et résumé sont rédigés ici, en fr/en/es. Seules des entrées volontairement publiques s'y trouvent.
  Les entrées sont rédigées en français d'abord ; les autres langues ne sont pas relues par JP.
- **Maquettes** : fichiers HTML autonomes sous `public/maquettes/`, affichés dans une `<iframe sandbox="">` (aucune
  permission). Publiques par construction : **aucun nom de testeur ni numéro de version inventé** n'y est toléré
  (deux ont été retirés avant l'ajout). Les maquettes propres à castellana restent dans l'onglet Anticipation du produit.
- **Mécanique** : `routes.journal` dans `src/i18n/ui.ts` (slugs `journal`/`journal`/`diario`), lien dans `Header.astro`,
  vue `src/views/JournalView.astro` (filtres en JS minimal, mois groupés), `src/pages/journal.xml.ts` pour le RSS.
- **À faire** : la sortie de bilbao vers `entries.json` reste un geste manuel (pas de script) ; une carte livrée devrait
  basculer son entrée d'« Anticipé » à « Livré » ; la visibilité publique/privée par carte est la feature bilbao #431.

## Stack

- **Générateur** : Astro (build statique), i18n natif.
- **Déploiement** : Cloudflare Pages, connecté au repo GitHub — chaque push sur
  `main` redéploie automatiquement. Pas de `wrangler.toml`/`wrangler.jsonc`
  nécessaire (patron « Pages classique », voir CLAUDE.md racine).
- **Langues** : français (défaut), anglais, espagnol — routing par chemin
  (`iecho.ca/fr`, `/en`, `/es`), slugs localisés définis dans `src/i18n/ui.ts`
  (`routes`).
- **Trois sections** depuis la refonte du 14/8/2026 : **Explorations**
  (l'accueil, ex-« Produits »), **Processus de création** (ex-« Mission ») et
  **Bio** (ex-« À propos »). Les six anciennes URL (`/fr/mission/`,
  `/en/mission/`, `/es/mision/`, `/fr/a-propos/`, `/en/about/`,
  `/es/acerca-de/`) sont redirigées en 301 par `public/_redirects` — ne pas le
  supprimer, ces adresses sont déjà indexées et partagées.
- **Identité visuelle propre** : thème sombre, accent sarcelle/ambre, motif
  « ondes concentriques » — variables CSS françaises (`--fond`, `--texte`,
  `--accent`…) dans `src/styles/global.css`. **Ne consomme volontairement pas**
  `design-system/tokens.css` (identité de marque distincte du design system
  utilisé à l'intérieur des produits).

## Structure

- `src/data/produits/{fr,en,es}.json` — un objet par produit (id, nom,
  sousTitre, résumé, besoin, `demarche` optionnel, lien optionnel, stack,
  roadmap). **8 produits** depuis le 28/7/2026 : marbella, toledo, madrid,
  valencia, barcelona (avec `lien`), castellana, bilbao, porto (ces trois
  derniers sans `lien`, même patron que toledo/madrid/valencia — app locale,
  jamais déployée).
  Le champ **`demarche`** (14/8/2026) porte le gabarit de fiche en 4 blocs —
  `declencheur`, `question`, `conception`, `revele` — rendu par
  `ProductExplorer.astro` **à la place** de la section « Le besoin » (les deux
  premiers blocs la répéteraient). Rédigé pour marbella et toledo ; les 7
  autres explorations gardent « Le besoin » jusqu'à ce que leur fiche soit
  écrite. Ajouter le champ suffit, aucun composant à toucher.
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
- `src/components/InfographieProcessus.astro` — l'infographie des 4 étapes de
  la page Processus, **inlinée** (pas un `<img>`) pour que les variables CSS du
  thème s'appliquent et que son texte reste indexable. Source d'origine :
  `docs/iecho-processus-de-creation.svg`, dont elle s'écarte sur deux points
  assumés — les couleurs de chrome sont branchées sur les jetons iecho (les 4
  teintes d'étape, elles, sont conservées : elles distinguent les étapes) et
  l'`@import` Google Fonts est retiré au profit de `--police`. Les trois
  langues vivent dans un seul objet `textes` en tête du fichier : une retouche
  de mise en page profite aux trois. Le SVG est `aria-hidden` et masqué sous
  720 px ; c'est la liste `.etapes-processus` de `ProcessusView` qui en est la
  version accessible, et elle reste affichée dans tous les cas.
- `src/components/FeedbackWidget.astro` — bouton flottant « Partager une idée »,
  modale, envoi Formspree (`FORMSPREE_ID` codé en dur — à extraire vers
  `src/config/settings.json`).
- `src/components/ProductExplorer.astro` — depuis le 6/9/2026, porte aussi le
  bouton « Télécharger » (champ optionnel `telechargement` sur un produit) et
  son dialogue de mot de passe partagé (`#telechargement-dialogue`, une seule
  instance pour tous les produits). Voir « Téléchargement protégé par mot de
  passe » ci-dessous.
- `src/i18n/ui.ts` — langues, routes localisées, fonction de traduction `t()`.
- `scripts/roadmap-diff.mjs`, `scripts/capture-screenshots.mjs`,
  `scripts/optimize-images.mjs` — voir « Workflows » ci-dessous.

## Comment un produit s'intègre à la vitrine

Voir la section dédiée du `CLAUDE.md` racine — résumé : éditer
`src/data/produits/{fr,en,es}.json` (un objet par produit) + ajouter l'`id` à
`produits.config.json > ordre` + déposer les captures dans `public/captures/`.
Aucune modification de composant nécessaire.

## Téléchargement protégé par mot de passe (6/9/2026)

JP veut donner accès à **castellana** (`trading-assistant`, un autre produit
du portfolio) à deux testeurs (Louis, Guillaume) sans passer par un accès
collaborateur GitHub privé — un lien de téléchargement direct sur iecho.ca,
protégé par un mot de passe simple.

**Ce n'est pas un produit hébergé** : castellana est Express +
`better-sqlite3` + sidecar Python optionnel, incompatible avec le modèle
Workers de ce hub (voir `trading-assistant/CLAUDE.md`, section « Paquet
téléchargeable self-install » pour l'analyse complète). Ce qu'iecho.ca sert
est un **zip du code source** (`public/telechargements/castellana.zip`,
~3 Mo) que le testeur télécharge et installe lui-même via des scripts de
lancement (`demarrer.command`/`demarrer.bat`, dans le zip) qui font
l'installation (npm install, venv Python) au premier double-clic.

**Mécanisme de gate — repris de `porto/gate.js`**, pas de barcelona
(React) : iecho.ca est un site Astro statique sans build-time env
injection pour ce cas, exactement la situation qui avait fait choisir la
variante vanilla JS pour porto. Simplifié par rapport à porto (un seul
bouton à protéger, pas toute l'app) : pas de `gate.config.js` généré au
build, pas de 3 modes (`open`/`password`/`blocked`) — juste un mot de
passe en dur (`tomate`) comparé au clic.

- `src/data/produits/{fr,en,es}.json` — champ optionnel `telechargement`
  (chemin vers le zip) sur l'entrée castellana **uniquement**. Absent
  ailleurs → aucun bouton affiché pour les autres produits (no-op).
- `src/components/ProductExplorer.astro` — bouton `.bouton-telecharger`
  rendu si `p.telechargement` existe (juste après `.bouton-essayer`), UNE
  seule `<dialog id="telechargement-dialogue">` partagée (pas dupliquée par
  produit — rendue une fois après la boucle `produits.map()`). Au clic :
  vérifie `localStorage['iecho.telechargement.<id>.unlocked']`, navigue
  direct si déjà déverrouillé, sinon ouvre le dialogue. Comparaison
  `value.trim().toLowerCase() === 'tomate'`.
- `src/styles/global.css` — `.bouton-telecharger` (contour, distinct de
  `.bouton-essayer` rempli) et `.telechargement-*` (dialogue, adapté de
  `.feedback-dialogue` du même fichier — nouvelles classes pour rester
  sémantiquement distinct).
- `src/i18n/ui.ts` — clés `produit.telecharger*` (fr/en/es), réutilise
  `feedback.fermer` existant pour le bouton Fermer (pas de doublon).

**⚠️ Comme porto/barcelona : dissuasif, pas une vraie barrière de
sécurité** — le mot de passe est visible en clair dans le JS livré. Le
déverrouillage est permanent (localStorage, pas d'expiration), par produit
(clé incluant l'`id`), pour que ce mécanisme reste réutilisable si un
futur produit a aussi besoin d'un lien de téléchargement gated.

**⚠️ Limite réelle non résolue — Gatekeeper macOS** : le script
`demarrer.command` dans le zip téléchargé reçoit l'attribut
`com.apple.quarantine` une fois passé par un navigateur — macOS peut
refuser l'exécution au double-clic. Mitigation documentée dans
`trading-assistant/SETUP.md` (clic droit → Ouvrir), mais **jamais testée
avec un vrai téléchargement navigateur**. Voir `trading-assistant/
CLAUDE.md` pour le détail complet.

**Vérifié en direct** (serveur de dev Astro local, port 4322) : le bouton
« Télécharger castellana » apparaît uniquement sur la fiche castellana
(confirmé — aucun autre produit n'a ce bouton) ; mauvais mot de passe →
erreur inline ; bon mot de passe (`tomate`, testé en majuscules pour
confirmer l'insensibilité à la casse) → requête `GET
/telechargements/castellana.zip` → 200 (le `net::ERR_ABORTED` qui suit est
le comportement normal du navigateur quand une navigation devient un
téléchargement de fichier) ; rechargement de la page → toujours
déverrouillé (`localStorage` persisté) ; reclique sur le bouton → navigue
direct sans redemander le mot de passe ; labels traduits confirmés en
FR/EN/ES. Aucune erreur console à aucune étape.

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

