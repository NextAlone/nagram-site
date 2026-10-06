import {
  PRODUCTS,
  appStoreUrl,
  releasesPageUrl,
  type Product,
  type ProductId,
  type ReleaseSource,
  type ReleaseInfo,
  type ReleasesResponse,
} from '../src/data/products';

interface Env {
  // Optional secret. Without it GitHub allows 60 requests per hour per IP,
  // which Workers share with other tenants.
  GITHUB_TOKEN?: string;
}

const OK_TTL = 600;
// Failures are cached briefly so a rate-limited upstream is not hammered;
// they are still reported as errors, never replaced with older data.
const ERROR_TTL = 60;

const UPSTREAM_HEADERS = { 'User-Agent': 'nagram-site (+https://nagram.app)' };

interface GithubRelease {
  tag_name: string;
  name: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  html_url: string;
  assets: { name: string; browser_download_url: string; size: number }[];
}

function githubHeaders(env: Env): Record<string, string> {
  const headers: Record<string, string> = {
    ...UPSTREAM_HEADERS,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  return headers;
}

function githubError(res: Response): string {
  const limited = res.headers.get('x-ratelimit-remaining') === '0';
  return `GitHub API responded ${res.status}${limited ? ' (rate limit exceeded)' : ''}`;
}

async function fetchGithub(product: Product, repo: string, env: Env): Promise<ReleaseInfo> {
  const pageUrl = releasesPageUrl(product);
  const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=20`, {
    headers: githubHeaders(env),
  });
  if (!res.ok) return { status: 'error', error: githubError(res), pageUrl };
  const releases = (await res.json()) as GithubRelease[];
  const latest = releases.find((r) => !r.draft && !r.prerelease);
  if (!latest) return { status: 'no_release', pageUrl };

  const downloads: Extract<ReleaseInfo, { status: 'ok' }>['downloads'] = {};
  for (const target of product.downloads) {
    if (!target.asset) {
      downloads[target.platform] = { name: latest.tag_name, url: latest.html_url, size: null };
      continue;
    }
    const pattern = target.asset;
    const asset = latest.assets.find((a) => pattern.test(a.name));
    if (asset) {
      downloads[target.platform] = { name: asset.name, url: asset.browser_download_url, size: asset.size };
    }
  }
  // Some repositories put the version in the release name, others only in the tag.
  const version = latest.name && /^v?\d/.test(latest.name) ? latest.name : latest.tag_name;
  return {
    status: 'ok',
    version: version.replace(/^v/i, ''),
    publishedAt: latest.published_at,
    pageUrl: latest.html_url,
    downloads,
  };
}

async function fetchAppStore(product: Product, appId: string): Promise<ReleaseInfo> {
  const pageUrl = appStoreUrl(appId);
  // The storefront-scoped path is required: from Workers the plain /lookup
  // endpoint answers 403, while /cn/lookup returns the listing.
  const res = await fetch(`https://itunes.apple.com/cn/lookup?id=${appId}`, { headers: UPSTREAM_HEADERS });
  if (!res.ok) return { status: 'error', error: `App Store lookup responded ${res.status}`, pageUrl };
  const data = (await res.json()) as {
    results: { version: string; currentVersionReleaseDate?: string; trackViewUrl: string }[];
  };
  const app = data.results[0];
  if (!app) return { status: 'no_release', pageUrl };
  return {
    status: 'ok',
    version: app.version,
    publishedAt: app.currentVersionReleaseDate ?? null,
    pageUrl,
    downloads: Object.fromEntries(
      product.downloads.map((t) => [t.platform, { name: 'App Store', url: pageUrl, size: null }]),
    ),
  };
}

type FetchedSource = Exclude<ReleaseSource, { type: 'channel' }>;

function fetchRelease(product: Product, source: FetchedSource, env: Env): Promise<ReleaseInfo> {
  switch (source.type) {
    case 'github':
      return fetchGithub(product, source.repo, env);
    case 'appstore':
      return fetchAppStore(product, source.appId);
  }
}

async function loadRelease(product: Product, env: Env, ctx: ExecutionContext): Promise<ReleaseInfo> {
  const { source } = product;
  if (source.type === 'channel') return { status: 'external', pageUrl: source.url };
  const cache = caches.default;
  // The source type is part of the key so an entry cached before a product
  // switched sources is not served after the switch.
  const cacheKey = new Request(`https://nagram.app/__cache/release/${product.id}/${source.type}`);
  const cached = await cache.match(cacheKey);
  if (cached) return cached.json<ReleaseInfo>();

  let info: ReleaseInfo;
  try {
    info = await fetchRelease(product, source, env);
  } catch (e) {
    info = {
      status: 'error',
      error: `Upstream request failed: ${e instanceof Error ? e.message : String(e)}`,
      pageUrl: releasesPageUrl(product),
    };
  }
  const ttl = info.status === 'error' ? ERROR_TTL : OK_TTL;
  ctx.waitUntil(
    cache.put(cacheKey, Response.json(info, { headers: { 'Cache-Control': `public, max-age=${ttl}` } })),
  );
  return info;
}

async function handleReleases(env: Env, ctx: ExecutionContext): Promise<Response> {
  const infos = await Promise.all(PRODUCTS.map((p) => loadRelease(p, env, ctx)));
  const products = Object.fromEntries(PRODUCTS.map((p, i) => [p.id, infos[i]])) as Record<ProductId, ReleaseInfo>;
  const failed = infos.filter((i) => i.status === 'error').length;
  const body: ReleasesResponse = { products };
  return Response.json(body, {
    // Each product carries its own status; 502 only when nothing could be fetched.
    status: failed === infos.length ? 502 : 200,
    headers: {
      'Cache-Control': failed ? 'no-store' : 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function handleDownload(platform: string, env: Env, ctx: ExecutionContext): Promise<Response> {
  const product = PRODUCTS.find((p) => p.downloads.some((d) => d.platform === platform));
  if (!product) {
    const known = PRODUCTS.flatMap((p) => p.downloads.map((d) => d.platform));
    return Response.json({ error: `Unknown platform "${platform}"`, platforms: known }, { status: 404 });
  }
  const info = await loadRelease(product, env, ctx);
  const asset = info.status === 'ok' ? info.downloads[platform] : undefined;
  // Without a direct target the visitor is sent to the releases page, and the
  // reason is stated in a header rather than hidden behind a normal redirect.
  const reason = asset || info.status === 'external' ? null : info.status === 'ok' ? 'no_asset' : info.status;
  const headers = new Headers({ Location: asset?.url ?? info.pageUrl, 'Cache-Control': 'no-store' });
  if (reason) headers.set('X-Nagram-Fallback', reason);
  return new Response(null, { status: 302, headers });
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    if (pathname === '/api/releases') return handleReleases(env, ctx);
    const download = pathname.match(/^\/download\/([\w-]+)\/?$/);
    if (download) return handleDownload(download[1], env, ctx);
    return Response.json({ error: 'Not Found' }, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
