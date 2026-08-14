# Fiches "exploration" — Marbella & Toledo

Gabarit en 5 blocs, texte prêt à intégrer. Les passages entre [crochets] sont des hypothèses à confirmer ou ajuster selon la réalité exacte de l'outil.

---

## Marbella

**Le déclencheur**

Plusieurs amis traversaient chacun un changement important dans leur vie — [type de transition, ex. fin de carrière, réorientation] — et se posaient la même question : *« De combien j'ai besoin pour prendre ma retraite ? »* Pas une réponse de planificateur financier avec vingt hypothèses, juste un chiffre pour commencer à réfléchir.

**La question posée**

Comment donner un ordre de grandeur fiable, en quelques minutes, sans jargon financier et sans obliger la personne à consulter quelqu'un avant même de savoir si le sujet vaut la peine d'être approfondi ?

**Le choix de conception**

Marbella reste volontairement simple : [X variables d'entrée — âge, épargne actuelle, dépenses visées, etc.], un calcul transparent, et un seul résultat clair — le montant cible. Pas de tableau de bord, pas de simulation à quinze scénarios. L'objectif n'était pas de remplacer un conseiller, mais de donner un point de départ honnête pour une conversation qui, souvent, ne se fait pas faute d'un premier chiffre.

**Ce que ça a révélé**

[Ex. : à quel point un calcul « suffisamment bon » bat un calcul parfait que personne n'utilise ; ou ce que tu as appris sur la manière de vulgariser une logique financière pour un non-spécialiste.]

**Essayer**

→ Utiliser Marbella

---

## Toledo

**Le déclencheur**

Comme enseignant, je traduis régulièrement mes propres documents. Les outils en ligne habituels posaient une question simple mais non négociable : où va cette information une fois envoyée à un service externe ?

**La question posée**

Peut-on traduire et résumer un document correctement, à coût nul, **sans faire sortir le contenu de la machine** — et est-ce que la même logique peut servir à autre chose qu'à la traduction ?

**Le choix de conception**

Toledo tourne sur Ollama pour le prototype — un LLM local plutôt qu'une API infonuagique — mais l'architecture est pensée pour permettre d'y brancher un autre modèle plus tard : rien n'est envoyé à l'extérieur. Une fois cette base en place, la même mécanique a permis d'ajouter deux fonctions pédagogiques que je voulais tester avec mes étudiants — un résumé de document et un générateur de quiz. Le choix du « local » n'était pas juste une question de coût : c'était la contrainte de confidentialité qui a dicté toute l'architecture.

**Ce que ça a révélé**

[Ex. : les limites concrètes d'un LLM local par rapport à un modèle infonuagique — vitesse, qualité — et où la contrainte de confidentialité vaut vraiment le compromis ; ce que le passage traduction → résumé → quiz t'a appris sur la réutilisation d'une même brique technique.]

**Essayer**

→ Utiliser Toledo

---

## Notes d'intégration

- Les deux fiches suivent exactement le même gabarit en 5 blocs — à réutiliser tel quel pour madrid, valencia, barcelona, castellana, bilbao, porto, essen au fil du temps, plutôt que de tout refaire d'un coup.
- Le bloc « Ce que ça a révélé » est le plus important pour ton positionnement (rigueur PM + pédagogie) : c'est lui qui distingue une fiche produit d'un journal de bord d'expérimentation. Vaut la peine de le remplir en premier, avant même le reste.
- Suggestion de fil rouge visuel : garder les 5 titres de blocs identiques d'une fiche à l'autre (« Le déclencheur », « La question posée », etc.) pour que la structure elle-même devienne reconnaissable — un visiteur qui a lu Marbella sait déjà comment lire Toledo.
