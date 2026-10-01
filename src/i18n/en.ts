import type { Dict } from './index';

export const en: Dict = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  meta: {
    title: 'Nagram: third-party Telegram clients for Android, iOS and desktop',
    description:
      'Nagram is a family of open-source third-party Telegram clients for Android, iOS, Windows, macOS and Linux, adding multi-provider and LLM translation, message filters, repeat, CJK spacing and more.',
  },
  nav: { products: 'Products', features: 'Features', screenshots: 'Screenshots', switchLabel: '中文' },
  hero: {
    eyebrow: 'Open-source third-party Telegram clients',
    title: ['The same enhancements', 'on every screen'],
    lead: 'The Nagram family builds on the official Telegram clients and adds translation, message filters, repeat and more, on Android, iOS and desktop.',
    downloadsLabel: 'Download',
    detected: 'The platform matching your system is highlighted',
  },
  products: {
    title: 'Products',
    lead: 'Four clients, each tracking the upstream Telegram source for its platform. See the feature list for what each one adds.',
    source: 'Source',
    version: 'Latest version',
    items: {
      'nagram-android': {
        platform: 'Android 5.0 or later',
        tagline: 'The most complete client of the family, based on the official Telegram Android source. Stable builds are on GitHub, betas in the Telegram channel.',
      },
      'nagram-ios': {
        platform: 'iOS 15.0 or later',
        tagline: 'Based on the official Telegram-iOS source. Releases are on the App Store, betas on TestFlight.',
      },
      'nagram-desktop': {
        platform: 'Windows · macOS · Linux',
        tagline: 'Based on Telegram Desktop. CI builds are available for each platform; downloading them requires a GitHub login.',
      },
      nnngram: {
        platform: 'Android 8.1 or later · arm64-v8a',
        tagline: 'A leaner build based on Nullgram with a largely similar feature set. Builds are posted to the Telegram channel.',
      },
    },
  },
  features: {
    title: 'Shared across platforms',
    lead: 'These features are implemented in Nagram for Android, iOS and desktop. Entry points and details vary slightly by platform.',
    items: [
      {
        title: 'Multi-provider translation',
        body: 'Choose Google, Microsoft, Yandex and other services, or connect your own LLM endpoint with a custom prompt.',
      },
      {
        title: 'Message filters',
        body: 'Match messages by keyword or regular expression, then mask, collapse or hide them.',
      },
      {
        title: 'Repeat and forward without quote',
        body: 'Repeat a message in one step, or forward it without the source.',
      },
      {
        title: 'Pangu spacing',
        body: 'Insert spaces between CJK and Latin text or digits when sending, editing or reading.',
      },
      {
        title: 'Hide sponsored messages',
        body: 'Sponsored messages in channels are no longer shown.',
      },
      {
        title: 'Settings backup and sync',
        body: 'Export or sync your settings so a new device needs no reconfiguration.',
      },
    ],
  },
  featureList: {
    title: 'Feature list',
    description: 'A comparison of the enhancements in Nagram Android, Nagram iOS, Nagram Desktop and Nnngram, grouped by translation, messages, chat list, media, interface, network and accounts.',
    lead: 'Enhancements each client adds on top of the official Telegram apps. A check mark means the client implements it; entry points and details vary by platform.',
    feature: 'Feature',
    supported: 'Supported',
    unsupported: 'Not supported',
    footnote: 'Compiled from the settings code of each repository. Only enhancements are listed, not features the official Telegram apps already have. The clients keep changing, so the apps themselves are the reference.',
  },
  screenshots: {
    title: 'Screenshots',
    description: 'Screenshots of Nagram Android, Nagram iOS, Nagram Desktop and Nnngram.',
    lead: 'Screenshots with light and dark versions follow your system theme.',
    pending: 'Screenshot coming soon',
    slots: {
      'nagram-android': ['Chat list', 'Chat', 'Nagram settings'],
      'nagram-ios': ['Nagram', 'Chat list', 'General settings', 'Message settings', 'Appearance and app icons', 'Chat'],
      'nagram-desktop': ['Main window', 'Message menu', 'Nagram settings'],
      nnngram: ['Chat', 'Nnngram settings'],
    },
  },
  release: {
    loading: 'Fetching version info…',
    unavailable: 'Version info unavailable',
    noRelease: 'No release yet',
    releasesPage: 'Releases page',
    download: 'Download',
    stable: 'Stable',
    external: 'See the Telegram channel',
    links: { testflight: 'Download · TestFlight', beta: 'Beta · Telegram channel' },
  },
  footer: {
    community: 'Community',
    channel: 'Nagram channel',
    group: 'Nagram group',
    nnngramChannel: 'Nnngram channel',
    code: 'Source',
    license: 'License',
    licenseBody:
      'Nagram Android and Nagram Desktop are released under GPL-3.0, Nnngram under GPL-2.0. Upstream and third-party components in Nagram iOS remain under their own licenses. The Nagram name and project identity belong to NextAlone and the app icon artwork is copyright MaitungTM; neither is licensed with the source code.',
    disclaimer:
      'Nagram is an independent third-party client. It is not affiliated with, sponsored by or endorsed by Telegram (Telegram FZ-LLC and its affiliates). Telegram is a trademark of its respective owner.',
  },
  notFound: { title: 'Page not found', body: 'There is nothing at this address.', home: 'Back to home' },
};
