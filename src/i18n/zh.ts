import type { Dict } from './index';

export const zh: Dict = {
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',
  meta: {
    title: 'Nagram：覆盖 Android、iOS 与桌面的第三方 Telegram 客户端',
    description:
      'Nagram 是一组开源的第三方 Telegram 客户端，覆盖 Android、iOS、Windows、macOS 与 Linux，提供多引擎与大模型翻译、消息过滤、复读、盘古之白等增强功能。',
  },
  nav: { products: '产品', features: '特性', screenshots: '截图', switchLabel: 'English' },
  hero: {
    eyebrow: '开源的第三方 Telegram 客户端',
    title: ['同一套增强，', '带到每一块屏幕'],
    lead: 'Nagram 系列在 Telegram 官方客户端的基础上加入翻译、消息过滤、复读等增强功能，覆盖 Android、iOS 与桌面。',
    downloadsLabel: '下载',
    detected: '已根据你的系统高亮对应平台',
  },
  products: {
    title: '产品矩阵',
    lead: '四个客户端，各自跟随对应平台的 Telegram 上游源码。',
    source: '源码',
    version: '最新版本',
    items: {
      'nagram-android': {
        platform: 'Android 5.0 及以上',
        tagline: '基于 NekoX 的 Android 客户端，功能最全的一端。',
        features: [
          '不限数量的登录账号',
          '代理工具：订阅导入、测速排序、自动切换，内置经 Cloudflare CDN 中继的 WebSocket 公共代理',
          '合并消息、反向回复、长按菜单快速回复',
          '输入框撤销与重做、可编辑的文字样式',
          '贴纸包列表的备份、恢复与分享',
          'OpenKeychain 集成：签名、验证、解密、导入',
          '可选的无 Google 服务通知方案',
        ],
      },
      'nagram-ios': {
        platform: 'iOS 15.0 及以上',
        tagline: '基于 Telegram-iOS 官方源码，通过 App Store 与 TestFlight 分发。',
        features: [
          '自定义语音转文字接口（OpenAI 兼容），支持语音与圆形视频消息',
          '消息菜单管理：逐项开关并调整顺序',
          '底栏布局与 Liquid Glass 色调强度调节',
          '会话备份：导出与导入 session，可存入 iCloud 钥匙串',
          '双击消息动作：回应、回复、复读、翻译或编辑',
          '上传与下载的网络加速档位',
          'Nagram 设置的 iCloud 同步',
        ],
      },
      'nagram-desktop': {
        platform: 'Windows · macOS · Linux',
        tagline: '基于 Telegram Desktop 的 Qt 客户端。尚未发布正式版本，下载按钮指向各平台最新一次成功的 CI 构建，下载构建产物需登录 GitHub。',
        features: [
          '用大模型总结消息，或翻译整个对话',
          '语音转写，可批量处理选中的语音消息',
          '消息截图，可套用云端主题',
          '链接规则与本地 inline bot 规则',
          '演示模式与本地显示名称',
          '超出服务端上限的本地置顶',
          '应用图标选择，内置简体与繁体中文文案',
        ],
      },
      nnngram: {
        platform: 'Android 8.1 及以上 · arm64-v8a',
        tagline: '基于 Nullgram 的精简版本，功能与 Nagram 大体相近，仅支持 Android。安装包发布在 Telegram 频道。',
        features: [
          '按账号设置密码，可隐藏账号并设置紧急代码',
          '动态隐身模式，可保持离线状态',
          '快速切换匿名发言',
          '过滤 Zalgo 符号',
          '频道别名',
          '数据中心状态查看',
        ],
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
        title: '复制受保护的内容',
        body: '在开启了内容保护的对话中仍可复制消息文本。',
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
  screenshots: {
    title: '截图',
    lead: '提供明暗两版的截图会随系统主题切换。',
    pending: '截图待补充',
    slots: {
      'nagram-android': ['聊天列表', '聊天界面', 'Nagram 设置'],
      'nagram-ios': ['Nagram', '聊天列表', '通用设置', '消息设置', '外观与应用图标', '聊天界面'],
      'nagram-desktop': ['主窗口', '消息菜单', 'Nagram 设置'],
      nnngram: ['聊天界面', 'Nnngram 设置'],
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
    licenseBody:
      'Nagram Android 与 Nagram Desktop 以 GPL-3.0 发布，Nnngram 以 GPL-2.0 发布。Nagram iOS 中的上游与第三方组件继续适用各自的许可。Nagram 名称与项目标识归 NextAlone 所有，应用图标版权归 MaitungTM 所有，不随源码许可授权。',
    disclaimer:
      'Nagram 是独立的第三方客户端，与 Telegram 官方（Telegram FZ-LLC 及其关联方）没有隶属、赞助或背书关系。Telegram 是其各自权利人的商标。',
  },
  notFound: { title: '页面不存在', body: '这个地址没有内容。', home: '返回首页' },
};
