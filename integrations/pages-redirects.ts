import { readFile, writeFile } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';
import type { ReleasesResponse } from '../src/data/products';
import { renderRedirects } from '../src/lib/redirects';

// _redirects depends on release data, so it is written after the build from
// the same /api/releases.json the pages were rendered with.
export default function pagesRedirects(): AstroIntegration {
  return {
    name: 'nagram:pages-redirects',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const data = JSON.parse(await readFile(new URL('api/releases.json', dir), 'utf8')) as ReleasesResponse;
        await writeFile(new URL('_redirects', dir), renderRedirects(data));
        const states = Object.entries(data.products).map(([id, info]) => `${id}=${info.status}`);
        logger.info(`_redirects written (${states.join(', ')})`);
      },
    },
  };
}
