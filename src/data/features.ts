// Detailed feature matrix. Every mark was checked against the settings code of
// the corresponding repository; re-check there before changing a row.
// Features that are deliberately not advertised (bypassing content protection,
// stealth and presence-hiding modes and the like) are left out on purpose.

import type { ProductId } from './products';

type Text = { zh: string; en: string };

export interface FeatureRow extends Text {
  on: ProductId[];
  note?: Text;
}

export type FeatureGroupId =
  | 'translation'
  | 'text'
  | 'messages'
  | 'chats'
  | 'media'
  | 'interface'
  | 'network'
  | 'accounts';

export interface FeatureGroup extends Text {
  id: FeatureGroupId;
  rows: FeatureRow[];
}

export const FEATURE_COLUMNS: { id: ProductId; name: string; short: string }[] = [
  { id: 'nagram-android', name: 'Nagram Android', short: 'Android' },
  { id: 'nagram-ios', name: 'Nagram iOS', short: 'iOS' },
  { id: 'nagram-desktop', name: 'Nagram Desktop', short: 'Desktop' },
  { id: 'nnngram', name: 'Nnngram', short: 'Nnngram' },
];

const CODES: Record<string, ProductId> = {
  A: 'nagram-android',
  I: 'nagram-ios',
  D: 'nagram-desktop',
  N: 'nnngram',
};

// `on` is a string of product codes: A(ndroid), I(OS), D(esktop), N(nngram).
const row = (zh: string, en: string, on: string, note?: Text): FeatureRow => ({
  zh,
  en,
  on: [...on].map((c) => CODES[c]),
  note,
});

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: 'translation',
    zh: '翻译与 AI',
    en: 'Translation and AI',
    rows: [
      row('多种翻译引擎可选', 'Choice of translation providers', 'AIDN', {
        zh: 'Google、Microsoft、Yandex、DeepL、TranSmart 等，各端可选项不同',
        en: 'Google, Microsoft, Yandex, DeepL, TranSmart and others; the set differs by client',
      }),
      row('大模型翻译', 'LLM translation', 'AIDN', {
        zh: '自定义接口地址、模型与提示词',
        en: 'Custom endpoint, model and prompt',
      }),
      row('按对话自动翻译', 'Automatic translation per chat', 'AIDN'),
      row('发送前翻译输入内容', 'Translate your text before sending', 'AIDN'),
      row('自定义语音转文字服务', 'Custom speech-to-text service', 'ID', {
        zh: 'OpenAI 兼容接口',
        en: 'OpenAI-compatible API',
      }),
      row('用大模型总结消息', 'Summarize messages with an LLM', 'D'),
    ],
  },
  {
    id: 'text',
    zh: '文本与输入',
    en: 'Text and input',
    rows: [
      row('盘古之白（中英文之间自动加空格）', 'Pangu spacing between CJK and Latin text', 'AIDN'),
      row('简繁转换', 'Simplified and Traditional Chinese conversion', 'AD'),
      row('格式工具栏与 Markdown 解析开关', 'Formatting toolbar and Markdown parsing switch', 'AIDN', {
        zh: 'iOS 仅有格式工具栏',
        en: 'iOS has the toolbar only',
      }),
      row('代码块语法高亮', 'Syntax highlighting for code blocks', 'AN'),
      row('输入框撤销与重做', 'Undo and redo in the input field', 'AN'),
      row('文本替换', 'Text replacer', 'A'),
    ],
  },
  {
    id: 'messages',
    zh: '消息',
    en: 'Messages',
    rows: [
      row('复读', 'Repeat a message', 'AIDN'),
      row('无引用转发', 'Forward without quote', 'AIDN'),
      row('消息过滤', 'Message filters', 'AIDN', {
        zh: '按关键词或正则表达式遮盖、折叠或隐藏',
        en: 'Mask, collapse or hide by keyword or regular expression',
      }),
      row('隐藏赞助消息', 'Hide sponsored messages', 'AIDN'),
      row('自定义消息菜单项', 'Customize message menu items', 'AIDN'),
      row('时间戳显示秒、转发消息显示原始时间', 'Seconds in timestamps and original time of forwards', 'AIDN'),
      row('自定义双击消息动作', 'Customizable double-tap action', 'AIN'),
      row('显示消息 ID', 'Show message ID', 'ADN'),
      row('消息详情', 'Message details', 'ADN'),
      row('媒体信息', 'Media information', 'ID'),
      row('合并多条消息', 'Combine several messages', 'ADN'),
      row('直接显示剧透内容', 'Reveal spoilers by default', 'ADN'),
      row('过滤 Zalgo 符号', 'Zalgo symbol filter', 'ADN'),
      row('选取两条消息之间的全部消息', 'Select all messages in between', 'AD'),
      row('隐藏消息回应', 'Hide reactions', 'ID'),
      row('快速切换匿名发言', 'Quick toggle for anonymous posting', 'AN'),
      row('删除自己在对话中的全部消息', 'Delete all of your own messages in a chat', 'AN'),
      row('消息截图', 'Message screenshot', 'D'),
    ],
  },
  {
    id: 'chats',
    zh: '聊天列表与文件夹',
    en: 'Chat list and folders',
    rows: [
      row('文件夹标签样式', 'Folder tab display options', 'AIDN', {
        zh: '图标或文字、隐藏“全部对话”等，各端可选项不同',
        en: 'Icons or text, hiding “All chats” and more; options differ by client',
      }),
      row('最近会话快速入口', 'Quick access to recent chats', 'AIDN'),
      row('隐藏动态', 'Hide stories', 'AIDN'),
      row('启动时打开指定文件夹', 'Choose the folder opened on startup', 'ID'),
      row('紧凑聊天列表与预览行数', 'Compact chat list and preview lines', 'ID'),
      row('自定义聊天排序', 'Custom chat sort order', 'AD'),
      row('超出服务端上限的本地置顶', 'Local pins beyond the server limit', 'AD'),
    ],
  },
  {
    id: 'media',
    zh: '媒体与贴纸',
    en: 'Media and stickers',
    rows: [
      row('贴纸大小', 'Sticker size', 'AIDN'),
      row('最近使用贴纸的数量上限', 'Recent sticker limit', 'AIDN'),
      row('贴纸包导出或备份', 'Export or back up sticker sets', 'AD'),
      row('语音降噪与增强', 'Voice noise suppression and enhancement', 'AN'),
      row('自定义表情包与字体', 'Custom emoji packs and fonts', 'A'),
    ],
  },
  {
    id: 'interface',
    zh: '界面与资料',
    en: 'Interface and profiles',
    rows: [
      row('更换应用图标', 'Alternative app icons', 'AIDN'),
      row('自定义主菜单或底栏项目', 'Customize main menu or bottom bar items', 'AIDN', {
        zh: 'iOS 为底栏，其余为主菜单',
        en: 'Bottom bar on iOS, main menu elsewhere',
      }),
      row('资料页显示 ID、数据中心与注册日期', 'ID, data center and registration date on profiles', 'AIDN', {
        zh: '注册日期可能为估算值',
        en: 'Registration date may be an estimate',
      }),
      row('界面中隐藏自己的手机号', 'Hide your phone number in the interface', 'AIDN'),
      row('对话或频道的本地别名', 'Local aliases for chats or channels', 'ADN', {
        zh: 'Android 与 Nnngram 仅支持频道',
        en: 'Channels only on Android and Nnngram',
      }),
      row('头像与气泡形状', 'Avatar and bubble shape', 'AD', {
        zh: 'Android 仅有方形头像',
        en: 'Square avatars only on Android',
      }),
      row('数据中心状态', 'Datacenter status', 'AN'),
      row('Liquid Glass 色调强度', 'Liquid Glass tint strength', 'I'),
    ],
  },
  {
    id: 'network',
    zh: '网络与链接',
    en: 'Network and links',
    rows: [
      row('上传与下载加速', 'Upload and download acceleration', 'AIDN'),
      row('链接规则与 inline bot 链接规则', 'Link rules and inline bot link rules', 'AID'),
      row('自定义 DoH 与 IP 版本策略', 'Custom DoH and IP version strategy', 'AD'),
      row('内置 WebSocket 代理', 'Built-in WebSocket proxy', 'N'),
    ],
  },
  {
    id: 'accounts',
    zh: '账号与备份',
    en: 'Accounts and backup',
    rows: [
      row('增强设置的备份、恢复或同步', 'Back up, restore or sync the enhancement settings', 'AIDN', {
        zh: 'iOS 通过 iCloud 同步，其余为文件或云端备份',
        en: 'iCloud sync on iOS, file or cloud backup elsewhere',
      }),
      row('扫码登录', 'QR code login', 'AIN'),
      row('按账号设置密码', 'Per-account passcode', 'AN'),
      row('会话导出与导入', 'Export and import sessions', 'I'),
      row('推送服务可选', 'Choice of push service', 'A', {
        zh: 'FCM、UnifiedPush、MicroG 或应用内',
        en: 'FCM, UnifiedPush, MicroG or in-app',
      }),
      row('OpenKeychain 集成', 'OpenKeychain integration', 'A'),
    ],
  },
];
