# Brief complet — Refonte iecho.ca

Ce fichier consolide toutes les décisions prises. Claude Code doit le lire en entier avant de commencer.

---

## Prompt à coller dans Claude Code (premier message)

> Lis le fichier `brief-complet-claude-code.md` à la racine du projet — il contient toutes les instructions et le contenu pour la refonte du site. Les fichiers `fiches-marbella-toledo.md` et `iecho-processus-de-creation.svg` sont dans le même dossier et sont référencés dedans.
>
> Avant toute modification :
> 1. Crée une branche git `refonte-navigation` à partir de l'état actuel.
> 2. Commit l'état actuel tel quel — rien ne doit être perdu, on doit pouvoir revenir en arrière à tout moment.
> 3. Garde le même système technique (Astro, i18n fr/en/es, gabarit visuel sombre). C'est une refonte de navigation et de contenu, pas une reconstruction technique.
>
> Applique ensuite les sections 1 à 5 de ce brief, dans l'ordre. Ne touche à rien d'autre (grille Explorations existante, formulaire, logos) sauf indication contraire.
>
> Une fois terminé, pousse la branche et donne-moi l'URL de prévisualisation Cloudflare Pages pour que je révise avant de fusionner vers production.

---

## 1. Navigation

- Renommer "Produits" → "Explorations"
- Renommer "Mission" → "Processus de création"
- Ajouter "Bio" — en page distincte ou en section dans "À propos" (proposer la meilleure option selon la structure actuelle du menu)

## 2. Page/section : Bio

> Jean-Pierre Parra est professeur, spécialisé en gestion de projet et de produit au niveau universitaire. Il développe actuellement un cours de maîtrise sur la conception de produits d'affaires, avec une forte composante de littératie en IA. Membre du conseil d'administration de Quatre-Chemins.org, il s'intéresse au dialogue authentique et à la transformation à travers différentes communautés professionnelles. iecho est né de son besoin d'expérimenter et d'apprendre en construisant.

À intégrer en fr, puis traduire en en/es dans le même ton.

## 3. Page/section : Processus de création

**Intro**

iecho n'est pas une agence traditionnelle. C'est une démarche de co-conception numérique : transformer un problème réel en prototype concret, grâce à une méthodologie de développement rapide (RAD) fondée sur l'expérimentation et l'apprentissage terrain.

**Les 4 étapes**

1. **Diagnostic stratégique** — cibler la vraie problématique avant de construire quoi que ce soit.
2. **Prototypage sur mesure** — fait maison, sans sur-ingénierie.
3. **Expérimentation terrain** — tester la valeur ajoutée avec de vraies personnes, pas dans le vide.
4. **Rétroaction en cycles courts** — ajuster rapidement selon ce qu'on apprend.

**Clôture**

Expérimenter, apprendre, faire résonner des idées en produits numériques.

**Illustration** : intégrer `iecho-processus-de-creation.svg` (fourni dans le même dossier) comme visuel principal de cette page — c'est une infographie complète des 4 étapes, déjà dans l'identité visuelle du site (fond sombre, accent violet). L'insérer en pleine largeur, avec le texte ci-dessus en complément (pas en double — le SVG peut porter l'essentiel visuellement, le texte sert de version accessible/lisible par les moteurs de recherche).

## 4. Page "Explorations" : fiches Marbella et Toledo

Le fichier `fiches-marbella-toledo.md` (même dossier) contient les fiches complètes pour ces deux explorations, suivant un gabarit en 5 blocs (Le déclencheur / La question posée / Le choix de conception / Ce que ça a révélé / Essayer). Intégrer ce contenu sur les pages correspondantes dans la nouvelle grille "Explorations", en remplaçant les vignettes actuelles (image + nom seulement) pour ces deux entrées. Les 7 autres explorations restent en l'état pour l'instant — même gabarit à venir plus tard.

## 5. Déploiement (à faire une fois le contenu validé)

Le site est hébergé sur Cloudflare Pages, connecté au dépôt Git.

1. Pousser la branche `refonte-navigation` sur GitHub → Cloudflare génère automatiquement une URL de prévisualisation séparée du site public.
2. Réviser sur cette URL de prévisualisation.
3. Une fois approuvé : fusionner `refonte-navigation` vers la branche de production (main/master) → Cloudflare redéploie automatiquement iecho.ca.
4. En cas de besoin de retour arrière : tableau de bord Cloudflare → Workers & Pages → le projet → Deployments → "Rollback to this deployment" sur un déploiement antérieur. Instantané, aucune perte de code.

Claude Code ne doit **pas** fusionner vers production lui-même sans confirmation explicite — s'arrêter à l'étape "branche poussée + URL de prévisualisation" et attendre le feu vert.
