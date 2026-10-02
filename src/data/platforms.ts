import type { ProductId } from './products';

export type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'linux';

export type PlatformMarkName = 'android' | 'apple' | 'mac' | 'windows' | 'linux';

// One download per operating system, offered in the hero for the visitor's system.
export const DOWNLOAD_PLATFORMS: { platform: Platform; label: string; product: ProductId }[] = [
  { platform: 'android', label: 'Android', product: 'nagram-android' },
  { platform: 'ios', label: 'iOS', product: 'nagram-ios' },
  { platform: 'windows', label: 'Windows', product: 'nagram-desktop' },
  { platform: 'macos', label: 'macOS', product: 'nagram-desktop' },
  { platform: 'linux', label: 'Linux', product: 'nagram-desktop' },
];

// Clients shown first for a visitor's system; Android visitors see both Android clients.
export const PRODUCTS_FOR_PLATFORM: Record<Platform, ProductId[]> = {
  android: ['nagram-android', 'nnngram'],
  ios: ['nagram-ios'],
  windows: ['nagram-desktop'],
  macos: ['nagram-desktop'],
  linux: ['nagram-desktop'],
};
