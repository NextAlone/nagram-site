import type { ImageMetadata } from 'astro';
import type { ProductId } from '../data/products';

// Files in src/assets/screenshots are named <product id>-<slot>.webp for a
// single image, or <product id>-<slot>-light.webp and -dark.webp for a pair.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/screenshots/*.{webp,png,jpg,jpeg,avif}', {
  eager: true,
});

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [path.slice(path.lastIndexOf('/') + 1).replace(/\.\w+$/, ''), mod.default]),
);

export type Shot =
  | { kind: 'single'; caption: string; image: ImageMetadata }
  | { kind: 'themed'; caption: string; light: ImageMetadata; dark: ImageMetadata }
  | { kind: 'pending'; caption: string };

// A slot shows a single image, a light/dark pair when both exist, or a placeholder.
export function screenshotsFor(product: ProductId, captions: string[]): Shot[] {
  return captions.map((caption, i) => {
    const base = `${product}-${i + 1}`;
    const image = byName.get(base);
    if (image) return { kind: 'single', caption, image };
    const light = byName.get(`${base}-light`);
    const dark = byName.get(`${base}-dark`);
    if (light && dark) return { kind: 'themed', caption, light, dark };
    return { kind: 'pending', caption };
  });
}

export const isPortrait = (product: ProductId) => product !== 'nagram-desktop';
