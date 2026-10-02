// Icons and tile colors for content that is otherwise plain text. Keyed by the
// ids in the dictionaries and the feature data, so copy and glyphs change
// independently.

import type { Tone } from '../design/tones';
import type { IconName } from '../icons';
import type { HighlightId, PrivacySectionId } from '../i18n';
import type { FeatureGroupId } from './features';
import type { LinkKind, ProductId } from './products';

export interface Glyph {
  icon: IconName;
  tone: Tone;
}

export const PRODUCT_PLATFORM_ICONS: Record<ProductId, IconName> = {
  'nagram-android': 'android',
  'nagram-ios': 'apple',
  'nagram-desktop': 'desktop',
  nnngram: 'android',
};

export const LINK_ICONS: Record<LinkKind, IconName> = {
  testflight: 'testflight',
  beta: 'beta',
};

export const HIGHLIGHT_GLYPHS: Record<HighlightId, Glyph> = {
  translate: { icon: 'translate', tone: 'blue' },
  filter: { icon: 'filter', tone: 'indigo' },
  repeat: { icon: 'repeat', tone: 'green' },
  pangu: { icon: 'spacing', tone: 'orange' },
  sponsored: { icon: 'ads-off', tone: 'pink' },
  backup: { icon: 'sync', tone: 'teal' },
};

export const FEATURE_GROUP_GLYPHS: Record<FeatureGroupId, Glyph> = {
  translation: { icon: 'translate', tone: 'blue' },
  text: { icon: 'text', tone: 'orange' },
  messages: { icon: 'messages', tone: 'green' },
  chats: { icon: 'folders', tone: 'indigo' },
  media: { icon: 'sticker', tone: 'pink' },
  interface: { icon: 'palette', tone: 'purple' },
  network: { icon: 'network', tone: 'teal' },
  accounts: { icon: 'backup', tone: 'gray' },
};

export const PRIVACY_GLYPHS: Record<PrivacySectionId | 'contact', Glyph> = {
  scope: { icon: 'scope', tone: 'blue' },
  data: { icon: 'data', tone: 'indigo' },
  app: { icon: 'settings', tone: 'gray' },
  services: { icon: 'services', tone: 'orange' },
  website: { icon: 'globe', tone: 'teal' },
  changes: { icon: 'history', tone: 'purple' },
  contact: { icon: 'chat', tone: 'green' },
};
