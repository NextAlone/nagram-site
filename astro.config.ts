import { defineConfig } from 'astro/config';
import pagesRedirects from './integrations/pages-redirects';

export default defineConfig({
  site: 'https://nagram.app',
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: { prefixDefaultLocale: false },
  },
  // The whole stylesheet of a page is a few kilobytes compressed; inlining it
  // saves the render-blocking round trip on first visits.
  build: { inlineStylesheets: 'always' },
  integrations: [pagesRedirects()],
  vite: {
    build: {
      // Keeps prefixes such as -webkit-backdrop-filter, which Safari before 18
      // needs; the default target lets the minifier drop them.
      cssTarget: ['chrome111', 'edge111', 'firefox115', 'safari15.4', 'ios15.4'],
    },
  },
});
