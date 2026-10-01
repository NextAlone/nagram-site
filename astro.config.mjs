import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nagram.app',
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: { prefixDefaultLocale: false },
  },
});
