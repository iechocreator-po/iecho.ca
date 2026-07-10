import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://iecho.ca',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'es'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
