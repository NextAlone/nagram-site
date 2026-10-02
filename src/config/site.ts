import type { IconName } from '../icons';
import type { Dict } from '../i18n';

export const LINKS = {
  channel: 'https://t.me/nagram_channel',
  group: 'https://t.me/nagram_group',
  nnngramChannel: 'https://t.me/Nnngram',
  telegramPrivacy: 'https://telegram.org/privacy',
} as const;

export interface NavItem {
  // Path below the locale root.
  page: string;
  label: keyof Pick<Dict['nav'], 'products' | 'features' | 'screenshots'>;
  icon: IconName;
}

export const NAV: NavItem[] = [
  { page: '', label: 'products', icon: 'products' },
  { page: 'features/', label: 'features', icon: 'features' },
  { page: 'screenshots/', label: 'screenshots', icon: 'screenshots' },
];

// Where the header's download button leads: the product lineup on the home page.
export const DOWNLOAD_ANCHOR = 'products';
