import type { LinkKind, ProductId } from '../data/products';
import { en } from './en';
import { zh } from './zh';

export type Locale = 'zh' | 'en';

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
  features: { title: string; lead: string; items: { title: string; body: string }[] };
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
    sections: { title: string; body: string[] }[];
    contact: { title: string; body: string; link: string };
  };
  release: {
    loading: string;
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
}

export const dicts: Record<Locale, Dict> = { zh, en };

export const localePath = (locale: Locale, page = '') => (locale === 'zh' ? '/' : '/en/') + page;
