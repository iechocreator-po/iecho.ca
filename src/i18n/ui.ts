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
    'site.tagline': 'petits produits, grandes explorations',
    'site.description':
      "iecho — un atelier de produits numériques : des outils locaux et personnels, construits pour apprendre.",
    'nav.produits': 'Produits',
    'nav.mission': 'Mission',
    'nav.apropos': 'À propos',
    'produits.titre': 'Produits',
    'produits.intro':
      "Des outils construits d'abord pour un besoin réel, partagés ensuite. Chaque produit est une exploration.",
    'produit.besoin': 'Le besoin',
    'produit.technique': 'Sous le capot',
    'produit.captures': "Captures d'écran",
    'produit.captures.bientot': 'Captures à venir — le produit évolue encore.',
    'produit.roadmap': 'Fonctionnalités & feuille de route',
    'statut.proposee': 'proposée',
    'statut.encours': 'en cours',
    'statut.livree': 'livrée',
    'mission.titre': 'Mission',
    'mission.brouillon':
      "Ce texte est en cours d'écriture. L'intention derrière iecho : expérimenter, apprendre — et partager ce qui en sort.",
    'mission.logos.titre': 'Logos en gestation',
    'mission.logos.intro':
      'Le logo iecho se cherche encore. Dites-nous lequel vous inspire via le bouton « Partager une idée ».',
    'apropos.titre': 'À propos',
    'apropos.brouillon': 'Bio en préparation.',
    'apropos.collabs': 'Collaborations',
    'apropos.collabs.brouillon': 'Section en préparation.',
    'apropos.perso': 'Plus léger',
    'apropos.perso.brouillon': 'Section en préparation.',
    'feedback.bouton': 'Partager une idée',
    'feedback.titre': 'Partager une idée',
    'feedback.intro':
      'Une suggestion, un bogue, un logo préféré ? Rien n’est publié : seul Jean-Pierre lit ces messages.',
    'feedback.placeholder': 'Votre idée, en toute liberté…',
    'feedback.envoyer': 'Envoyer',
    'feedback.envoi': 'Envoi…',
    'feedback.merci': 'Merci ! Votre idée est bien partie.',
    'feedback.erreur': "Oups, l'envoi a échoué. Réessayez dans un instant.",
    'feedback.email': 'Courriel (facultatif, si vous souhaitez une réponse)',
    'feedback.fermer': 'Fermer',
    'pied.note': 'construit à la main, hébergé sobrement.',
  },
  en: {
    'site.tagline': 'small products, wide explorations',
    'site.description':
      'iecho — a digital product workshop: local, personal tools built to learn.',
    'nav.produits': 'Products',
    'nav.mission': 'Mission',
    'nav.apropos': 'About',
    'produits.titre': 'Products',
    'produits.intro':
      'Tools built first for a real need, then shared. Each product is an exploration.',
    'produit.besoin': 'The need',
    'produit.technique': 'Under the hood',
    'produit.captures': 'Screenshots',
    'produit.captures.bientot': 'Screenshots coming soon — the product is still evolving.',
    'produit.roadmap': 'Features & roadmap',
    'statut.proposee': 'proposed',
    'statut.encours': 'in progress',
    'statut.livree': 'shipped',
    'mission.titre': 'Mission',
    'mission.brouillon':
      'This text is being written. The intention behind iecho: experiment, learn — and share what comes out of it.',
    'mission.logos.titre': 'Logos in gestation',
    'mission.logos.intro':
      'The iecho logo is still finding itself. Tell us which one inspires you via the “Share an idea” button.',
    'apropos.titre': 'About',
    'apropos.brouillon': 'Bio in preparation.',
    'apropos.collabs': 'Collaborations',
    'apropos.collabs.brouillon': 'Section in preparation.',
    'apropos.perso': 'Lighter things',
    'apropos.perso.brouillon': 'Section in preparation.',
    'feedback.bouton': 'Share an idea',
    'feedback.titre': 'Share an idea',
    'feedback.intro':
      'A suggestion, a bug, a favourite logo? Nothing is published: only Jean-Pierre reads these messages.',
    'feedback.placeholder': 'Your idea, freely…',
    'feedback.envoyer': 'Send',
    'feedback.envoi': 'Sending…',
    'feedback.merci': 'Thank you! Your idea is on its way.',
    'feedback.erreur': 'Oops, sending failed. Try again in a moment.',
    'feedback.email': 'Email (optional, if you would like a reply)',
    'feedback.fermer': 'Close',
    'pied.note': 'handmade, soberly hosted.',
  },
  es: {
    'site.tagline': 'productos pequeños, exploraciones amplias',
    'site.description':
      'iecho — un taller de productos digitales: herramientas locales y personales, construidas para aprender.',
    'nav.produits': 'Productos',
    'nav.mission': 'Misión',
    'nav.apropos': 'Acerca de',
    'produits.titre': 'Productos',
    'produits.intro':
      'Herramientas construidas primero para una necesidad real, compartidas después. Cada producto es una exploración.',
    'produit.besoin': 'La necesidad',
    'produit.technique': 'Bajo el capó',
    'produit.captures': 'Capturas de pantalla',
    'produit.captures.bientot': 'Capturas próximamente — el producto sigue evolucionando.',
    'produit.roadmap': 'Funcionalidades y hoja de ruta',
    'statut.proposee': 'propuesta',
    'statut.encours': 'en curso',
    'statut.livree': 'entregada',
    'mission.titre': 'Misión',
    'mission.brouillon':
      'Este texto está en redacción. La intención detrás de iecho: experimentar, aprender — y compartir lo que surja.',
    'mission.logos.titre': 'Logos en gestación',
    'mission.logos.intro':
      'El logo de iecho aún se está buscando. Cuéntanos cuál te inspira con el botón «Compartir una idea».',
    'apropos.titre': 'Acerca de',
    'apropos.brouillon': 'Bio en preparación.',
    'apropos.collabs': 'Colaboraciones',
    'apropos.collabs.brouillon': 'Sección en preparación.',
    'apropos.perso': 'Cosas más ligeras',
    'apropos.perso.brouillon': 'Sección en preparación.',
    'feedback.bouton': 'Compartir una idea',
    'feedback.titre': 'Compartir una idea',
    'feedback.intro':
      'Una sugerencia, un error, un logo favorito? Nada se publica: solo Jean-Pierre lee estos mensajes.',
    'feedback.placeholder': 'Tu idea, con toda libertad…',
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
