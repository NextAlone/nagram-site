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
  privacy: {
    title: 'Nagram Privacy Policy',
    description: 'Privacy policy for the Nagram client applications and this website.',
    updated: 'Last updated: October 1, 2026',
    intro:
      "Nagram is a client application used to access Telegram. Telegram's Privacy Policy applies to Telegram accounts, Telegram services, messages, contacts, cloud storage, and other data processed by Telegram.",
    telegramPolicy: "You can review Telegram's Privacy Policy at",
    sections: [
      {
        title: 'Scope',
        body: [
          "This policy covers the Nagram client applications themselves and this website. When you use Nagram to connect to Telegram, your use of Telegram services is governed by Telegram's own terms and privacy practices.",
        ],
      },
      {
        title: 'Data Collection',
        body: [
          "Nagram does not operate a separate messaging service. It is designed to work as a Telegram client. Any account, message, contact, media, or cloud data handled through Telegram is subject to Telegram's Privacy Policy.",
        ],
      },
      {
        title: 'App Functionality',
        body: [
          'Nagram may store app preferences and local settings on your device to provide normal client functionality. These local settings are used by the app and are not a separate Telegram account database.',
        ],
      },
      {
        title: 'Third-Party Services',
        body: [
          "Because Nagram connects to Telegram, Telegram is the primary third-party service involved in account and messaging functionality. Please review Telegram's policy for details about how Telegram processes data.",
          'Some optional features send content to a service that you choose and configure, and only when you use them: translation providers, large language model endpoints and speech-to-text services receive the text or audio you ask them to process. Settings sync, where available, uses your own iCloud or Telegram cloud storage. These services process data under their own privacy policies.',
        ],
      },
      {
        title: 'This Website',
        body: [
          'This website sets no cookies and loads no analytics or advertising scripts. It is hosted on Cloudflare, which processes technical request data such as IP addresses in order to deliver the site. Download links lead to GitHub, the App Store, TestFlight or Telegram, each of which applies its own privacy policy.',
        ],
      },
      {
        title: 'Changes',
        body: ["This page may be updated if Nagram's privacy practices change or if additional services are introduced."],
      },
    ],
    contact: {
      title: 'Contact',
      body: 'For questions about this policy, contact the Nagram project maintainer through the official project support channel:',
      link: 'Nagram group',
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
    privacy: 'Privacy policy',
    licenseBody:
      'Nagram Android and Nagram Desktop are released under GPL-3.0, Nnngram under GPL-2.0. Upstream and third-party components in Nagram iOS remain under their own licenses. The Nagram name and project identity belong to NextAlone and the app icon artwork is copyright MaitungTM; neither is licensed with the source code. Tux, the Linux penguin, was created by Larry Ewing using The GIMP.',
    disclaimer:
      'Nagram is an independent third-party client. It is not affiliated with, sponsored by or endorsed by Telegram (Telegram FZ-LLC and its affiliates). Telegram is a trademark of its respective owner.',
  },
  notFound: { title: 'Page not found', body: 'There is nothing at this address.', home: 'Back to home' },
};
