// Where each product is released and how a download platform maps to a release
// asset, CI workflow or page. Read by the pages and by the build-time release
// fetch that also writes the /download/* rules.

export type ProductId = 'nagram-android' | 'nagram-ios' | 'nagram-desktop' | 'nnngram';

export type AppIconId = 'nagram' | 'nnngram';

export type ReleaseSource =
  | { type: 'github'; repo: string }
  | { type: 'appstore'; appId: string }
  // Latest successful run of a CI workflow on the default branch, per platform.
  | { type: 'actions'; repo: string }
  // Builds are only posted to a Telegram channel; there is no version to look up.
  | { type: 'channel'; url: string };

export interface DownloadTarget {
  platform: string;
  label: string;
  // Matched against GitHub release asset names (github sources).
  asset?: RegExp;
  // Workflow file whose latest successful run is linked (actions sources).
  workflow?: string;
}

export type LinkKind = 'testflight' | 'beta';

export interface Product {
  id: ProductId;
  name: string;
  icon: AppIconId;
  repo: string;
  license: string;
  source: ReleaseSource;
  downloads: DownloadTarget[];
  // Extra distribution channels shown next to the download buttons.
  links?: { kind: LinkKind; url: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'nagram-android',
    name: 'Nagram Android',
    icon: 'nagram',
    repo: 'NextAlone/Nagram',
    license: 'GPL-3.0',
    source: { type: 'github', repo: 'NextAlone/Nagram' },
    downloads: [
      { platform: 'android', label: 'arm64-v8a', asset: /arm64-v8a\.apk$/i },
      { platform: 'android-armv7', label: 'armeabi-v7a', asset: /armeabi-v7a\.apk$/i },
    ],
    links: [{ kind: 'beta', url: 'https://t.me/nagram_channel' }],
  },
  {
    id: 'nagram-ios',
    name: 'Nagram iOS',
    icon: 'nagram',
    repo: 'NextAlone/Nagram-iOS',
    license: '',
    source: { type: 'appstore', appId: '6781000861' },
    downloads: [{ platform: 'ios', label: 'App Store' }],
    links: [{ kind: 'testflight', url: 'https://testflight.apple.com/join/ENbpRmva' }],
  },
  {
    id: 'nagram-desktop',
    name: 'Nagram Desktop',
    icon: 'nagram',
    repo: 'NextAlone/Nagram-qt',
    license: 'GPL-3.0',
    source: { type: 'actions', repo: 'NextAlone/Nagram-qt' },
    downloads: [
      { platform: 'windows', label: 'Windows', workflow: 'nagram-win.yml' },
      { platform: 'macos', label: 'macOS', workflow: 'nagram-mac.yml' },
      { platform: 'linux', label: 'Linux', workflow: 'nagram-linux.yml' },
    ],
  },
  {
    id: 'nnngram',
    name: 'Nnngram',
    icon: 'nnngram',
    repo: 'NextAlone/Nnngram',
    license: 'GPL-2.0',
    source: { type: 'channel', url: 'https://t.me/Nnngram' },
    downloads: [{ platform: 'nnngram', label: 'Telegram' }],
  },
];

export const repoUrl = (repo: string) => `https://github.com/${repo}`;

// The cn storefront URL is used for everyone: from a mainland China network the
// region-neutral and other storefront URLs redirect to the App Store front page.
export const appStoreUrl = (appId: string) => `https://apps.apple.com/cn/app/id${appId}`;

// Human-facing page listing a product's releases; every failure path links here.
export const releasesPageUrl = (product: Product) => {
  const { source } = product;
  switch (source.type) {
    case 'appstore':
      return appStoreUrl(source.appId);
    case 'actions':
      return `${repoUrl(source.repo)}/actions`;
    case 'channel':
      return source.url;
    case 'github':
      return `${repoUrl(source.repo)}/releases`;
  }
};

export type ReleaseInfo =
  | {
      status: 'ok';
      version: string;
      publishedAt: string | null;
      pageUrl: string;
      downloads: Record<string, { name: string; url: string; size: number | null }>;
    }
  | { status: 'no_release'; pageUrl: string }
  // Distributed outside any API we can query; pageUrl is the download destination.
  | { status: 'external'; pageUrl: string }
  | { status: 'error'; error: string; pageUrl: string };

export interface ReleasesResponse {
  products: Record<ProductId, ReleaseInfo>;
}
