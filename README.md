# nagram-site

Nagram 系列（Nagram Android、Nagram iOS、Nagram Desktop、Nnngram）的宣传站。Astro 静态站，部署到 Cloudflare Workers static assets；中文在 `/`，英文在 `/en/`，另有 `features/` 与 `screenshots/` 两个子页面。

## 结构

- `src/data/products.ts`：四个产品的仓库、发布来源、下载平台与资源名匹配规则，页面和 Worker 共用。
- `src/i18n/`：中英文文案。特性条目取自各仓库的 README 与设置页源码，增删时请回到源码核对。
- `src/layouts/Page.astro`：各页面共用的页头导航与页脚。
- `src/components/Home.astro`：首页（Hero 与产品矩阵）；`src/scripts/home.ts` 负责平台高亮与版本信息。
- `src/components/Features.astro` 与 `src/data/features.ts`：`/features/` 功能列表页及其对照表数据。每一项都对照过对应仓库的设置页源码；绕过内容保护、隐身与隐藏在线状态一类的功能有意不列出。
- `src/components/Screenshots.astro`：`/screenshots/` 截图页。
- `worker/index.ts`：Worker，只处理 `/api/*` 与 `/download/*`，其余路径由静态资源直接响应。

## Worker 路由

- `GET /api/releases`：返回每个产品的 `status`（`ok`、`no_release`、`error`）、版本号与资源直链。Nagram Android 读取 GitHub Releases API，Nagram iOS 读取 App Store lookup API，Nagram Desktop 读取三个 CI workflow（`nagram-win.yml`、`nagram-mac.yml`、`nagram-linux.yml`）最近一次成功运行，版本号以最新运行日期 `CI YYYY-MM-DD` 代替。Nnngram 只在 Telegram 频道发布，状态固定为 `external`，不查询上游。成功结果在边缘缓存 10 分钟，失败结果缓存 1 分钟且始终以 `error` 返回，不回退到旧数据；全部失败时状态码为 502。
- `GET /download/<platform>`：302 到对应资源：`android`、`android-armv7` 到 Release 里的 APK，`ios` 到 App Store，`windows`、`macos`、`linux` 到对应 workflow 最近一次成功的 Actions 运行页面，`nnngram` 到 Telegram 频道。平台：`android`、`android-armv7`、`ios`、`windows`、`macos`、`linux`、`nnngram`。没有直链时跳到 Releases 页面，并用 `X-Nagram-Fallback` 响应头说明原因（`no_release`、`no_asset`、`error`）。

GitHub 未认证请求按出口 IP 限制为每小时 60 次，Workers 的出口 IP 与其他租户共用，生产环境建议配置只读的 `GITHUB_TOKEN` secret。

## 开发

```bash
pnpm install
pnpm dev        # Astro 开发服务器，不含 Worker 路由
pnpm preview    # 构建后用 wrangler dev 运行，含 Worker 路由
pnpm check      # 生成 Worker 类型并做类型检查
```

## 截图

把截图放到 `public/screenshots/`，命名为 `<产品 id>-<序号>-<light|dark>.webp`。同一序号的明暗两张都存在时页面才显示图片，否则显示占位。只有单一版本的图片可以不带主题后缀，命名为 `<产品 id>-<序号>.webp`。

Nagram iOS 使用 App Store 上架页的 6 张宣传图（单一版本）。其余仍缺失：

| 产品 id | 序号与内容 | 比例 |
| --- | --- | --- |
| `nagram-android` | 1 聊天列表，2 聊天界面，3 Nagram 设置 | 竖屏 9:19.5 |
| `nagram-desktop` | 1 主窗口，2 消息菜单，3 Nagram 设置 | 横屏 16:10 |
| `nnngram` | 1 聊天界面，2 Nnngram 设置 | 竖屏 9:19.5 |

另缺一张 1200×630 的 Open Graph 分享图，目前 `og:image` 使用应用图标。

## 部署

`.github/workflows/deploy.yml` 在推送到 `main` 时构建并执行 `wrangler deploy`，需要仓库 secrets `CLOUDFLARE_API_TOKEN` 与 `CLOUDFLARE_ACCOUNT_ID`。

`nagram.dev`、`www.nagram.app`、`www.nagram.dev` 由 `redirect/` 下的另一个小 Worker 301 跳转到 `nagram.app`（保留路径和查询参数）。它不在自动部署里，改动后用 `pnpm deploy:redirect` 手动部署。

## 品牌

Nagram 名称与项目标识归 NextAlone 所有，`public/icons/` 中的应用图标版权归 MaitungTM 所有，不随本仓库代码授权。
