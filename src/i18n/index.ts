import type { LinkKind, ProductId } from '../data/products';
import { en } from './en';
import { zh } from './zh';

export type Locale = 'zh' | 'en';

export type HighlightId = 'translate' | 'filter' | 'repeat' | 'pangu' | 'sponsored' | 'backup';
export type PrivacySectionId = 'scope' | 'data' | 'app' | 'services' | 'website' | 'changes';

export interface Dict {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string };
  nav: { products: string; features: string; screenshots: string; switchLabel: string };
  hero: { eyebrow: string; title: [string, string]; lead: string; downloadsLabel: string; detected: string };
  products: {
    title: string;
    lead: string;
    source: string;
    version: string;
    items: Record<ProductId, { platform: string; tagline: string }>;
  };
  features: { title: string; lead: string; items: { id: HighlightId; title: string; body: string }[] };
  featureList: {
    title: string;
    description: string;
    lead: string;
    feature: string;
    supported: string;
    unsupported: string;
    footnote: string;
  };
  screenshots: { title: string; description: string; lead: string; others: string; pending: string; slots: Record<ProductId, string[]> };
  privacy: {
    title: string;
    description: string;
    updated: string;
    intro: string;
    telegramPolicy: string;
    sections: { id: PrivacySectionId; title: string; body: string[] }[];
    contact: { title: string; body: string; link: string };
  };
  release: {
    unavailable: string;
    noRelease: string;
    releasesPage: string;
    download: string;
    stable: string;
    external: string;
    links: Record<LinkKind, string>;
  };
  footer: {
    community: string;
    channel: string;
    group: string;
    nnngramChannel: string;
    code: string;
    license: string;
    privacy: string;
    licenseBody: string;
    disclaimer: string;
  };
  notFound: { title: string; body: string; home: string };
  // Interface labels that are not part of the page copy.
  ui: {
    skipToContent: string;
    mainNav: string;
    menu: string;
    otherPlatforms: string;
    seeAllFeatures: string;
    seeAllScreenshots: string;
    pause: string;
    play: string;
    previous: string;
    next: string;
    onThisPage: string;
    breadcrumb: string;
  };
}

export const dicts: Record<Locale, Dict> = { zh, en };

export const localePath = (locale: Locale, page = '') => (locale === 'zh' ? '/' : '/en/') + page;
