import type { ReleaseInfo } from '../data/products';
import type { Dict } from '../i18n';

export interface DownloadLink {
  href: string;
  // No direct target: the link leads to the product's releases page instead.
  fallback: boolean;
}

// Where /download/<platform> sends a visitor for the given release state.
export function downloadTarget(platform: string, info: ReleaseInfo): string {
  return (info.status === 'ok' && info.downloads[platform]?.url) || info.pageUrl;
}

export function downloadLink(platform: string, info: ReleaseInfo): DownloadLink {
  const direct = info.status === 'external' || (info.status === 'ok' && platform in info.downloads);
  if (!direct) return { href: info.pageUrl, fallback: true };
  // The dev server does not apply _redirects, so there the link points at the target itself.
  return { href: import.meta.env.DEV ? downloadTarget(platform, info) : `/download/${platform}`, fallback: false };
}

export type ReleaseTone = 'default' | 'muted' | 'warning';

export function releaseLabel(info: ReleaseInfo, t: Dict['release']): { text: string; tone: ReleaseTone } {
  switch (info.status) {
    case 'ok':
      return { text: info.version, tone: 'default' };
    case 'external':
      return { text: t.external, tone: 'muted' };
    case 'no_release':
      return { text: t.noRelease, tone: 'muted' };
    case 'error':
      return { text: t.unavailable, tone: 'warning' };
  }
}
