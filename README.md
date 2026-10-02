# nagram-site

Nagram 系列（Nagram Android、Nagram iOS、Nagram Desktop、Nnngram）的宣传站。Astro 纯静态站，部署为不含 Functions 的 Cloudflare Pages 项目；中文在 `/`，英文在 `/en/`，另有 `features/`、`screenshots/` 与 `privacy/` 三个子页面。

## 结构

页面按“设计 tokens → 原子组件 → 区块 → 视图 → 路由”分层，文案与数据和界面分开存放。

- `src/styles/`：`tokens.css` 定义颜色（明暗两套，外加首页舞台用的常暗配色 `.theme-stage`）、字号与字距、间距、圆角、材质与动效；组件只读这些变量。`base.css` 是元素默认样式，`utilities.css` 是少量工具类，`motion.css` 是跨页过渡、入场与滚动渐显。
- `src/components/ui/`：与产品无关的原子组件，如 `Icon`、`Button`、`TextLink`、`Badge`、`IconTile`、`Section`、`Stage`（常暗的舞台区块）、`Headline`、`Marquee`（自动循环的横向列表）、`Reel`（可翻页的横向列表）、`SegmentedControl`、`Disclosure`。
- `src/components/brand/`：应用图标（`AppIcon`，构建时由 `src/assets/brand/nagram.png` 生成 AVIF/WebP 的 1x–3x 版本）、首页主视觉 `IconShowcase` 与平台标识（`PlatformMark`）。
- `src/components/layout/`：顶栏（移动端菜单用原生 Popover API）与页脚。
- `src/components/sections/`：各页面的区块，`home/`、`features/` 与多个页面共用的 `shared/`。
- `src/views/`：每个页面的组合；`src/pages/` 下的路由文件只传入语言。
- `src/icons/`：按用途命名的图标表。线性图标来自 Lucide，品牌标识来自 Simple Icons；换图标只改这里。
- `src/data/products.ts`：四个产品的仓库、发布来源、下载平台与资源名匹配规则。
- `src/data/features.ts`：`/features/` 的功能对照表。每一项都对照过对应仓库的设置页源码；绕过内容保护、隐身与隐藏在线状态一类的功能有意不列出。
- `src/data/glyphs.ts`：文案条目对应的图标与色块，按 `src/i18n/` 与 `features.ts` 里的 id 对应。
- `src/data/platforms.ts`：首页下载选择器的平台列表，以及各系统优先展示的客户端。
- `src/i18n/`：中英文文案。特性条目取自各仓库的 README 与设置页源码，增删时请回到源码核对。
- `src/lib/releases.ts`：构建时读取各产品的版本信息；`src/lib/redirects.ts` 据此生成 `/download/*` 规则。
- `integrations/pages-redirects.ts`：构建结束后把下载规则写进 `dist/_redirects`。

客户端脚本只有几段：`<head>` 里内联的平台检测（`src/scripts/detect-platform.js`）只给 `<html>` 加 `data-platform`，推荐平台的高亮与截图页的默认分组都由 CSS 完成，首屏不会跳动；另外是跑马灯的暂停/播放与离屏暂停、截图页横向列表的翻页按钮和分组切换。

首页的“跨端共有特性”和截图以跑马灯自动循环，移动由 CSS 动画完成，鼠标悬停时停下，右下角按钮可暂停；系统开启“减少动态效果”时改为可手动滑动的静态列表。

## 版本信息与下载地址

站点没有运行时代码。构建时 `src/lib/releases.ts` 读取各产品的版本：Nagram Android 读 GitHub Releases API，Nagram iOS 读 App Store lookup API，Nagram Desktop 读三个 CI workflow（`nagram-win.yml`、`nagram-mac.yml`、`nagram-linux.yml`）最近一次成功运行，版本号以最新运行日期 `CI YYYY-MM-DD` 代替。Nnngram 只在 Telegram 频道发布，状态固定为 `external`，不查询上游。网络错误与 5xx 响应会重试两次；仍然失败的产品状态为 `error`，页面显示“无法获取版本信息”，按钮改为指向其发布页，不会填入旧数据。

构建结果写进三处：

- 页面上的版本号与下载按钮。
- `/api/releases.json`，结构与原来的 `/api/releases` 相同；`/api/releases` 由 `_redirects` 指向它。
- `dist/_redirects` 里的 `GET /download/<platform>`：302 到对应资源。`android`、`android-armv7` 到 Release 里的 APK，`ios` 到 App Store，`windows`、`macos`、`linux` 到对应 workflow 最近一次成功的 Actions 运行页面，`nnngram` 到 Telegram 频道；没有直链时跳到发布页。

GitHub 未认证请求按 IP 限制为每小时 60 次。CI 构建使用 workflow 自带的 `GITHUB_TOKEN`；本地构建可以用 `GITHUB_TOKEN=$(gh auth token) pnpm build`。

## 开发

```bash
pnpm install
pnpm dev        # Astro 开发服务器；下载按钮直接指向目标地址
pnpm preview    # 构建后用 wrangler pages dev 运行，含 _redirects 与 _headers
pnpm check      # astro check，检查 .astro 与 .ts 的类型
```

## 截图

截图放在 `src/assets/screenshots/`，构建时生成 AVIF/WebP 的响应式版本。命名为 `<产品 id>-<序号>-<light|dark>.webp`，同一序号的明暗两张都存在时页面才显示图片，否则显示占位；只有单一版本的图片可以不带主题后缀，命名为 `<产品 id>-<序号>.webp`。

Nagram iOS 使用 App Store 上架页的 6 张宣传图（单一版本），首页的截图区块也展示这一组。其余仍缺失：

| 产品 id | 序号与内容 | 比例 |
| --- | --- | --- |
| `nagram-android` | 1 聊天列表，2 聊天界面，3 Nagram 设置 | 竖屏 9:19.5 |
| `nagram-desktop` | 1 主窗口，2 消息菜单，3 Nagram 设置 | 横屏 16:10 |
| `nnngram` | 1 聊天界面，2 Nnngram 设置 | 竖屏 9:19.5 |

另缺一张 1200×630 的 Open Graph 分享图，目前 `og:image` 使用 `public/icons/nagram.png`。

## 部署

`.github/workflows/deploy.yml` 在推送到 `main` 或手动触发时构建并执行 `wrangler pages deploy`，部署到 Pages 项目 `nagram-site` 的 `main` 分支（生产环境）。它还每小时运行一次：重新构建后把 `dist/api/releases.json` 与线上版本比较，只有版本数据变化时才部署；如果有产品读取失败，这一次不部署，线上保持上一次成功的数据。需要仓库 secrets `CLOUDFLARE_API_TOKEN`（含 Cloudflare Pages 编辑权限）与 `CLOUDFLARE_ACCOUNT_ID`。公开仓库连续 60 天没有活动时 GitHub 会停用定时任务，需要在 Actions 页面重新启用。

`nagram.dev`、`www.nagram.app`、`www.nagram.dev` 由另一个 Pages 项目 `nagram-redirect` 301 跳转到 `nagram.app`，保留路径与查询参数。它只有 `redirect/public/_redirects` 一个文件，不在自动部署里，改动后用 `pnpm deploy:redirect` 手动部署。

### 从 Worker 切换

原来的 `nagram-site` 与 `nagram-dev-redirect` 两个 Worker 已从仓库删除，线上切换需要在 Cloudflare 上做一次：

1. 创建 Pages 项目：`pnpm exec wrangler pages project create nagram-site --production-branch main` 与 `pnpm exec wrangler pages project create nagram-redirect --production-branch main`。
2. 部署：`pnpm deploy`（或手动触发 Deploy workflow）与 `pnpm deploy:redirect`，在 `*.pages.dev` 上确认无误。
3. 在 Workers 的 `nagram-site` 设置中删除 `nagram.app/*` 路由，并删除 `nagram.app` 当前的代理 apex 记录；然后在 Pages 项目 `nagram-site` 的 Custom domains 中添加 `nagram.app`，Cloudflare 会创建指向 `nagram-site.pages.dev` 的记录。证书签发前的几分钟里站点不可访问。
4. 删除 Worker `nagram-dev-redirect` 的 `nagram.dev/*` 路由和两个 www 自定义域名，删掉 `nagram.dev` 当前的代理 apex 记录，再在 Pages 项目 `nagram-redirect` 中添加 `nagram.dev`、`www.nagram.app`、`www.nagram.dev`。
5. 确认 Cloudflare Web Analytics 仍在统计（隐私政策中有说明；Pages 项目设置里也可以直接开启），然后删除两个 Worker。

## 品牌

Nagram 名称与项目标识归 NextAlone 所有，`public/icons/` 与 `src/assets/brand/` 中的应用图标版权归 MaitungTM 所有，不随本仓库代码授权。
