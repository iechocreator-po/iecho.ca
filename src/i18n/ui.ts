export const langues = ['fr', 'en', 'es'] as const;
export type Langue = (typeof langues)[number];

export const langueDefaut: Langue = 'fr';

export const nomsLangues: Record<Langue, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
};

// Slugs localisés de chaque page, pour le routing et le sélecteur de langue.
export const routes = {
  produits: { fr: '', en: '', es: '' },
  mission: { fr: 'mission', en: 'mission', es: 'mision' },
  apropos: { fr: 'a-propos', en: 'about', es: 'acerca-de' },
} as const;

export type PageKey = keyof typeof routes;

export function cheminPage(page: PageKey, lang: Langue): string {
  const slug = routes[page][lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

export const ui = {
  fr: {
    'site.tagline': 'Expérimenter, apprendre, faire résonner des idées en produits numériques.',
    'site.description':
      "iecho — un atelier de produits numériques : des outils locaux et personnels, construits pour apprendre.",
    'nav.produits': 'Produits',
    'nav.mission': 'Mission',
    'nav.apropos': 'À propos',
    'produits.titre': 'Produits',
    'produits.intro':
      "Des outils construits d'abord pour un besoin réel, partagés ensuite. Chaque produit est une exploration.",
    'produit.besoin': 'Le besoin',
    'produit.essayer': 'Essayer',
    'produit.technique': 'Sous le capot',
    'produit.captures': "Captures d'écran",
    'produit.captures.bientot': 'Captures à venir — le produit évolue encore.',
    'produit.roadmap': 'Fonctionnalités & feuille de route',
    'statut.proposee': 'proposée',
    'statut.encours': 'en cours',
    'statut.livree': 'livrée',
    'mission.titre': 'Mission',
    'mission.intro.1': "Un echo symbolise l'impact, l'expression, le reflet, la résonance.",
    'mission.intro.2':
      "L'intention derrière iecho : expérimenter, apprendre et partager ce qui en sort.",
    'mission.logos.titre': 'Logos en gestation',
    'mission.logos.intro':
      'Le logo iecho se cherche encore. Dites-nous lequel vous inspire via le bouton « Partager une idée ».',
    'apropos.titre': 'À propos',
    'apropos.bio.1':
      'Consultant en développement de produits numériques et spécialiste en gestion de projet.',
    'apropos.bio.2': 'Membre du conseil d’administration de Quatre-Chemins.org.',
    'apropos.bio.3':
      "Animé par un intérêt profond pour l'humain, le dialogue authentique et la transformation au sein des communautés professionnelles.",
    'apropos.bio.4':
      'Enseignant universitaire en gestion de projets, en développement rapide de produits numériques et en amélioration continue.',
    'apropos.bio.5':
      "iecho est né de son besoin constant d'expérimenter et d'apprendre par l'action.",
    'apropos.collabs': 'Collaborations',
    'apropos.collabs.brouillon': 'Section en préparation.',
    'apropos.perso': 'Plus léger',
    'apropos.perso.brouillon': 'Section en préparation.',
    'feedback.bouton': 'Partager une idée',
    'feedback.titre': 'Partager une idée',
    'feedback.intro':
      'Une suggestion, un bogue, un logo préféré ? Rien n’est publié : seul Jean-Pierre lit ces messages.',
    'feedback.placeholder': 'Votre idée, en toute liberté…',
    'feedback.produit': 'Produit concerné',
    'feedback.produit.aucun': 'Général / aucun en particulier',
    'feedback.envoyer': 'Envoyer',
    'feedback.envoi': 'Envoi…',
    'feedback.merci': 'Merci ! Votre idée est bien partie.',
    'feedback.erreur': "Oups, l'envoi a échoué. Réessayez dans un instant.",
    'feedback.email': 'Courriel (facultatif, si vous souhaitez une réponse)',
    'feedback.fermer': 'Fermer',
    'pied.note': 'construit à la main, hébergé sobrement.',
  },
  en: {
    'site.tagline': 'Experiment, learn, make ideas echo into digital products.',
    'site.description':
      'iecho — a digital product workshop: local, personal tools built to learn.',
    'nav.produits': 'Products',
    'nav.mission': 'Mission',
    'nav.apropos': 'About',
    'produits.titre': 'Products',
    'produits.intro':
      'Tools built first for a real need, then shared. Each product is an exploration.',
    'produit.besoin': 'The need',
    'produit.essayer': 'Try it',
    'produit.technique': 'Under the hood',
    'produit.captures': 'Screenshots',
    'produit.captures.bientot': 'Screenshots coming soon — the product is still evolving.',
    'produit.roadmap': 'Features & roadmap',
    'statut.proposee': 'proposed',
    'statut.encours': 'in progress',
    'statut.livree': 'shipped',
    'mission.titre': 'Mission',
    'mission.intro.1': 'An echo symbolizes impact, expression, reflection, resonance.',
    'mission.intro.2':
      'The intention behind iecho: experiment, learn, and share what comes out of it.',
    'mission.logos.titre': 'Logos in gestation',
    'mission.logos.intro':
      'The iecho logo is still finding itself. Tell us which one inspires you via the “Share an idea” button.',
    'apropos.titre': 'About',
    'apropos.bio.1':
      'Consultant in digital product development and project management specialist.',
    'apropos.bio.2': 'Board member of Quatre-Chemins.org.',
    'apropos.bio.3':
      'Driven by a deep interest in people, authentic dialogue, and transformation within professional communities.',
    'apropos.bio.4':
      'University lecturer in project management, rapid digital product development, and continuous improvement.',
    'apropos.bio.5': 'iecho was born from his constant need to experiment and learn by doing.',
    'apropos.collabs': 'Collaborations',
    'apropos.collabs.brouillon': 'Section in preparation.',
    'apropos.perso': 'Lighter things',
    'apropos.perso.brouillon': 'Section in preparation.',
    'feedback.bouton': 'Share an idea',
    'feedback.titre': 'Share an idea',
    'feedback.intro':
      'A suggestion, a bug, a favourite logo? Nothing is published: only Jean-Pierre reads these messages.',
    'feedback.placeholder': 'Your idea, freely…',
    'feedback.produit': 'Related product',
    'feedback.produit.aucun': 'General / none in particular',
    'feedback.envoyer': 'Send',
    'feedback.envoi': 'Sending…',
    'feedback.merci': 'Thank you! Your idea is on its way.',
    'feedback.erreur': 'Oops, sending failed. Try again in a moment.',
    'feedback.email': 'Email (optional, if you would like a reply)',
    'feedback.fermer': 'Close',
    'pied.note': 'handmade, soberly hosted.',
  },
  es: {
    'site.tagline': 'Experimentar, aprender, hacer resonar las ideas en productos digitales.',
    'site.description':
      'iecho — un taller de productos digitales: herramientas locales y personales, construidas para aprender.',
    'nav.produits': 'Productos',
    'nav.mission': 'Misión',
    'nav.apropos': 'Acerca de',
    'produits.titre': 'Productos',
    'produits.intro':
      'Herramientas construidas primero para una necesidad real, compartidas después. Cada producto es una exploración.',
    'produit.besoin': 'La necesidad',
    'produit.essayer': 'Probarlo',
    'produit.technique': 'Bajo el capó',
    'produit.captures': 'Capturas de pantalla',
    'produit.captures.bientot': 'Capturas próximamente — el producto sigue evolucionando.',
    'produit.roadmap': 'Funcionalidades y hoja de ruta',
    'statut.proposee': 'propuesta',
    'statut.encours': 'en curso',
    'statut.livree': 'entregada',
    'mission.titre': 'Misión',
    'mission.intro.1': 'Un eco simboliza el impacto, la expresión, el reflejo, la resonancia.',
    'mission.intro.2':
      'La intención detrás de iecho: experimentar, aprender y compartir lo que surja.',
    'mission.logos.titre': 'Logos en gestación',
    'mission.logos.intro':
      'El logo de iecho aún se está buscando. Cuéntanos cuál te inspira con el botón «Compartir una idea».',
    'apropos.titre': 'Acerca de',
    'apropos.bio.1':
      'Consultor en desarrollo de productos digitales y especialista en gestión de proyectos.',
    'apropos.bio.2': 'Miembro del consejo de administración de Quatre-Chemins.org.',
    'apropos.bio.3':
      'Motivado por un profundo interés en las personas, el diálogo auténtico y la transformación dentro de las comunidades profesionales.',
    'apropos.bio.4':
      'Profesor universitario en gestión de proyectos, desarrollo rápido de productos digitales y mejora continua.',
    'apropos.bio.5':
      'iecho nació de su necesidad constante de experimentar y aprender mediante la acción.',
    'apropos.collabs': 'Colaboraciones',
    'apropos.collabs.brouillon': 'Sección en preparación.',
    'apropos.perso': 'Cosas más ligeras',
    'apropos.perso.brouillon': 'Sección en preparación.',
    'feedback.bouton': 'Compartir una idea',
    'feedback.titre': 'Compartir una idea',
    'feedback.intro':
      'Una sugerencia, un error, un logo favorito? Nada se publica: solo Jean-Pierre lee estos mensajes.',
    'feedback.placeholder': 'Tu idea, con toda libertad…',
    'feedback.produit': 'Producto relacionado',
    'feedback.produit.aucun': 'General / ninguno en particular',
    'feedback.envoyer': 'Enviar',
    'feedback.envoi': 'Enviando…',
    'feedback.merci': '¡Gracias! Tu idea va en camino.',
    'feedback.erreur': 'Ups, el envío falló. Inténtalo de nuevo en un momento.',
    'feedback.email': 'Correo (opcional, si quieres una respuesta)',
    'feedback.fermer': 'Cerrar',
    'pied.note': 'hecho a mano, alojado con sobriedad.',
  },
} as const;

export type CleUI = keyof (typeof ui)['fr'];

export function t(lang: Langue) {
  return (cle: CleUI): string => ui[lang][cle] ?? ui[langueDefaut][cle];
}
