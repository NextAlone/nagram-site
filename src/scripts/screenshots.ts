import { detectPlatform, type Platform } from './platform';

// Android visitors see both Android clients.
const PRODUCTS_FOR: Record<Platform, string[]> = {
  android: ['nagram-android', 'nnngram'],
  ios: ['nagram-ios'],
  windows: ['nagram-desktop'],
  macos: ['nagram-desktop'],
  linux: ['nagram-desktop'],
};

const groups = [...document.querySelectorAll<HTMLElement>('.shot-group')];
const tabs = [...document.querySelectorAll<HTMLAnchorElement>('.shot-tabs a')];

function show(products: string[]) {
  for (const group of groups) group.hidden = !products.includes(group.dataset.product!);
  for (const tab of tabs) {
    if (products.includes(tab.dataset.product!)) tab.setAttribute('aria-current', 'true');
    else tab.removeAttribute('aria-current');
  }
}

// Without a recognised platform every group stays visible, as it does without JS.
const platform = detectPlatform();
if (platform) show(PRODUCTS_FOR[platform]);

for (const tab of tabs) {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    show([tab.dataset.product!]);
  });
}
