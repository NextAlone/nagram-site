import type { Dict } from './index';

export const zh: Dict = {
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',
  meta: {
    title: 'Nagram：覆盖 Android、iOS 与桌面的第三方 Telegram 客户端',
    description:
      'Nagram 是一组开源的第三方 Telegram 客户端，覆盖 Android、iOS、Windows、macOS 与 Linux，提供多引擎与大模型翻译、消息过滤、复读、盘古之白等增强功能。',
  },
  nav: { products: '产品', features: '功能', screenshots: '截图', switchLabel: 'English' },
  hero: {
    eyebrow: '开源的第三方 Telegram 客户端',
    title: ['同一套增强，', '带到每一块屏幕'],
    lead: 'Nagram 系列在 Telegram 官方客户端的基础上加入翻译、消息过滤、复读等增强功能，覆盖 Android、iOS 与桌面。',
    downloadsLabel: '下载',
    detected: '已根据你的系统高亮对应平台',
  },
  products: {
    title: '产品矩阵',
    lead: '四个客户端，各自跟随对应平台的 Telegram 上游源码。各端的功能见功能列表。',
    source: '源码',
    version: '最新版本',
    items: {
      'nagram-android': {
        platform: 'Android 5.0 及以上',
        tagline: '功能最完整的一端，基于 Telegram Android 官方源码。稳定版发布在 GitHub，测试版发布在 Telegram 频道。',
      },
      'nagram-ios': {
        platform: 'iOS 15.0 及以上',
        tagline: '基于 Telegram-iOS 官方源码。正式版在 App Store，测试版通过 TestFlight 分发。',
      },
      'nagram-desktop': {
        platform: 'Windows · macOS · Linux',
        tagline: '基于 Telegram Desktop。目前提供各平台的 CI 构建，下载构建产物需登录 GitHub。',
      },
      nnngram: {
        platform: 'Android 8.1 及以上 · arm64-v8a',
        tagline: '基于 Nullgram 的精简版本，功能与 Nagram 大体相近。安装包发布在 Telegram 频道。',
      },
    },
  },
  features: {
    title: '跨端共有特性',
    lead: '以下功能在 Nagram 的 Android、iOS 与桌面端均已实现，入口和细节随平台略有不同。',
    items: [
      {
        title: '多引擎翻译',
        body: '可选 Google、Microsoft、Yandex 等翻译服务，也可以接入自己的大模型接口并自定义提示词。',
      },
      {
        title: '消息过滤',
        body: '用关键词或正则表达式匹配消息，将其遮盖、折叠或隐藏。',
      },
      {
        title: '复读与无引用转发',
        body: '一步复读消息，或在转发时不带来源。',
      },
      {
        title: '盘古之白',
        body: '在发送、编辑或阅读时，自动为中文与英文、数字之间补上空格。',
      },
      {
        title: '隐藏赞助消息',
        body: '不再显示频道中的赞助消息。',
      },
      {
        title: '设置备份与同步',
        body: '导出或同步增强设置，换设备时不必重新配置。',
      },
    ],
  },
  featureList: {
    title: '功能列表',
    description: 'Nagram Android、Nagram iOS、Nagram Desktop 与 Nnngram 的增强功能对照表，按翻译、消息、聊天列表、媒体、界面、网络与账号分类。',
    lead: '各端在 Telegram 官方客户端之外加入的增强功能。勾选表示该端已实现，入口与细节随平台有所不同。',
    feature: '功能',
    supported: '支持',
    unsupported: '不支持',
    footnote: '本表依据各仓库的设置页源码整理，只列出增强功能，Telegram 官方已有的功能不在其中。各端持续更新，实际以应用内为准。',
  },
  screenshots: {
    title: '截图',
    description: 'Nagram Android、Nagram iOS、Nagram Desktop 与 Nnngram 的界面截图。',
    lead: '提供明暗两版的截图会随系统主题切换。',
    pending: '截图待补充',
    slots: {
      'nagram-android': ['聊天列表', '聊天界面', 'Nagram 设置'],
      'nagram-ios': ['Nagram', '聊天列表', '通用设置', '消息设置', '外观与应用图标', '聊天界面'],
      'nagram-desktop': ['主窗口', '消息菜单', 'Nagram 设置'],
      nnngram: ['聊天界面', 'Nnngram 设置'],
    },
  },
  privacy: {
    title: 'Nagram 隐私政策',
    description: 'Nagram 客户端与本网站的隐私政策。',
    updated: '最后更新：2026 年 10 月 1 日',
    intro:
      'Nagram 是用于访问 Telegram 的客户端应用。Telegram 账号、Telegram 服务、消息、联系人、云端存储以及其他由 Telegram 处理的数据，适用 Telegram 的隐私政策。',
    telegramPolicy: 'Telegram 的隐私政策见',
    sections: [
      {
        title: '适用范围',
        body: [
          '本政策适用于 Nagram 客户端应用本身以及本网站。当你使用 Nagram 连接 Telegram 时，你对 Telegram 服务的使用受 Telegram 自身的条款与隐私做法约束。',
        ],
      },
      {
        title: '数据收集',
        body: [
          'Nagram 不运营独立的消息服务，它只是一个 Telegram 客户端。经由 Telegram 处理的账号、消息、联系人、媒体或云端数据，均适用 Telegram 的隐私政策。',
        ],
      },
      {
        title: '应用功能',
        body: [
          '为提供正常的客户端功能，Nagram 可能在你的设备上保存应用偏好和本地设置。这些本地设置仅供应用使用，并不是另一份 Telegram 账号数据库。',
        ],
      },
      {
        title: '第三方服务',
        body: [
          '由于 Nagram 连接的是 Telegram，账号与消息功能涉及的主要第三方服务就是 Telegram。Telegram 如何处理数据，请查阅其隐私政策。',
          '部分可选功能会把内容发送给由你选择并配置的服务，且仅在你使用这些功能时发生：翻译服务、大模型接口和语音转文字服务会收到你要求处理的文本或音频。设置同步（如有）使用你自己的 iCloud 或 Telegram 云端存储。这些服务按各自的隐私政策处理数据。',
        ],
      },
      {
        title: '本网站',
        body: [
          '本网站不设置 Cookie，也不加载统计或广告脚本。网站托管在 Cloudflare，为了提供访问，Cloudflare 会处理 IP 地址等技术性请求数据。下载链接指向 GitHub、App Store、TestFlight 或 Telegram，它们各自适用自己的隐私政策。',
        ],
      },
      {
        title: '政策变更',
        body: ['如果 Nagram 的隐私做法发生变化，或引入了新的服务，本页面可能会更新。'],
      },
    ],
    contact: {
      title: '联系方式',
      body: '如对本政策有疑问，请通过官方支持渠道联系 Nagram 项目维护者：',
      link: 'Nagram 群组',
    },
  },
  release: {
    loading: '正在获取版本信息…',
    unavailable: '无法获取版本信息',
    noRelease: '暂无发布版本',
    releasesPage: 'Releases 页面',
    download: '下载',
    stable: '稳定版',
    external: '见 Telegram 频道',
    links: { testflight: '下载 · TestFlight', beta: '测试版 · Telegram 频道' },
  },
  footer: {
    community: '社区',
    channel: 'Nagram 频道',
    group: 'Nagram 群组',
    nnngramChannel: 'Nnngram 频道',
    code: '源码',
    license: '许可',
    privacy: '隐私政策',
    licenseBody:
      'Nagram Android 与 Nagram Desktop 以 GPL-3.0 发布，Nnngram 以 GPL-2.0 发布。Nagram iOS 中的上游与第三方组件继续适用各自的许可。Nagram 名称与项目标识归 NextAlone 所有，应用图标版权归 MaitungTM 所有，不随源码许可授权。Linux 企鹅 Tux 由 Larry Ewing 使用 The GIMP 创作。',
    disclaimer:
      'Nagram 是独立的第三方客户端，与 Telegram 官方（Telegram FZ-LLC 及其关联方）没有隶属、赞助或背书关系。Telegram 是其各自权利人的商标。',
  },
  notFound: { title: '页面不存在', body: '这个地址没有内容。', home: '返回首页' },
};
