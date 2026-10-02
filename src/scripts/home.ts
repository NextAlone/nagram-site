import type { ReleaseInfo, ReleasesResponse } from '../data/products';
import { detectPlatform } from './platform';

function highlightPlatform() {
  const platform = detectPlatform();
  const button = platform && document.querySelector(`.hero-downloads [data-dl="${platform}"]`);
  if (!button) return;
  button.classList.add('is-detected');
  document.getElementById('detected-note')!.hidden = false;
}

function applyRelease(root: HTMLElement, productId: string, info: ReleaseInfo | null) {
  const version = root.querySelector<HTMLElement>(`[data-version="${productId}"]`);
  if (version) {
    version.dataset.status = info?.status ?? 'error';
    version.textContent =
      info?.status === 'ok'
        ? info.version
        : info?.status === 'no_release'
          ? root.dataset.noRelease!
          : info?.status === 'external'
            ? root.dataset.external!
            : root.dataset.unavailable!;
  }
  for (const link of root.querySelectorAll<HTMLAnchorElement>(`a[data-product="${productId}"]`)) {
    const direct = info?.status === 'ok' && info.downloads[link.dataset.dl!];
    if (direct || info?.status === 'external') continue;
    // No direct asset: point at the releases page and mark the link as such.
    link.href = info?.pageUrl ?? link.dataset.fallback!;
    link.classList.add('is-fallback');
    link.title = version?.textContent ?? '';
  }
}

async function loadReleases() {
  const root = document.getElementById('releases-root')!;
  const productIds = [...root.querySelectorAll<HTMLElement>('[data-version]')].map((el) => el.dataset.version!);
  for (const el of root.querySelectorAll<HTMLElement>('[data-version]')) el.textContent = root.dataset.loading!;
  let products: Partial<ReleasesResponse['products']> = {};
  try {
    const res = await fetch('/api/releases');
    // A 502 still carries per-product errors; anything unparsable counts as unavailable.
    products = ((await res.json()) as ReleasesResponse).products ?? {};
  } catch {
    products = {};
  }
  for (const id of productIds) {
    applyRelease(root, id, products[id as keyof typeof products] ?? null);
  }
}

highlightPlatform();
loadReleases();
