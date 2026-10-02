// Release data is fetched once per build and baked into the pages, the static
// /api/releases.json and the /download/* rules in _redirects. A product whose
// upstream fails is reported as `error`; it is never filled in with older data.

import {
  PRODUCTS,
  appStoreUrl,
  releasesPageUrl,
  type Product,
  type ProductId,
  type ReleaseInfo,
  type ReleaseSource,
  type ReleasesResponse,
} from '../data/products';

const TIMEOUT_MS = 15_000;
const RETRIES = 2;
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

interface WorkflowRuns {
  workflow_runs: { html_url: string; created_at: string }[];
}

type Downloads = Extract<ReleaseInfo, { status: 'ok' }>['downloads'];

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    ...UPSTREAM_HEADERS,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  // Without a token GitHub allows 60 requests per hour per IP; CI passes its own.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

// A build bakes in whatever it gets, so network errors and 5xx answers are
// retried before they become an `error` state; 4xx answers are final.
async function get(url: string, headers: Record<string, string>): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (res.status < 500 || attempt === RETRIES) return res;
    } catch (e) {
      if (attempt === RETRIES) throw e;
    }
    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
  }
}

function githubError(res: Response): string {
  const limited = res.headers.get('x-ratelimit-remaining') === '0';
  return `GitHub API responded ${res.status}${limited ? ' (rate limit exceeded)' : ''}`;
}

async function fetchGithub(product: Product, repo: string): Promise<ReleaseInfo> {
  const pageUrl = releasesPageUrl(product);
  const res = await get(`https://api.github.com/repos/${repo}/releases?per_page=20`, githubHeaders());
  if (!res.ok) return { status: 'error', error: githubError(res), pageUrl };
  const releases = (await res.json()) as GithubRelease[];
  const latest = releases.find((r) => !r.draft && !r.prerelease);
  if (!latest) return { status: 'no_release', pageUrl };

  const downloads: Downloads = {};
  for (const target of product.downloads) {
    const asset = latest.assets.find((a) => target.asset?.test(a.name));
    if (asset) downloads[target.platform] = { name: asset.name, url: asset.browser_download_url, size: asset.size };
  }
  return {
    status: 'ok',
    version: (latest.name || latest.tag_name).replace(/^v/i, ''),
    publishedAt: latest.published_at,
    pageUrl: latest.html_url,
    downloads,
  };
}

async function fetchActions(product: Product, repo: string): Promise<ReleaseInfo> {
  const pageUrl = releasesPageUrl(product);
  const targets = product.downloads.filter((t) => t.workflow);
  const responses = await Promise.all(
    targets.map((t) =>
      get(
        `https://api.github.com/repos/${repo}/actions/workflows/${t.workflow}/runs?status=success&per_page=1`,
        githubHeaders(),
      ),
    ),
  );
  const failed = responses.find((r) => !r.ok);
  if (failed) return { status: 'error', error: githubError(failed), pageUrl };

  const downloads: Downloads = {};
  let latest: string | null = null;
  for (const [i, res] of responses.entries()) {
    const run = ((await res.json()) as WorkflowRuns).workflow_runs[0];
    if (!run) continue;
    downloads[targets[i].platform] = { name: targets[i].workflow!, url: run.html_url, size: null };
    if (!latest || run.created_at > latest) latest = run.created_at;
  }
  if (!latest) return { status: 'no_release', pageUrl };
  // CI builds carry no version number, so the date of the newest run stands in for it.
  return { status: 'ok', version: `CI ${latest.slice(0, 10)}`, publishedAt: latest, pageUrl, downloads };
}

async function fetchAppStore(product: Product, appId: string): Promise<ReleaseInfo> {
  const pageUrl = appStoreUrl(appId);
  // The storefront-scoped path is required: the plain /lookup endpoint answers
  // 403 from some networks, while /cn/lookup returns the listing.
  const res = await get(`https://itunes.apple.com/cn/lookup?id=${appId}`, UPSTREAM_HEADERS);
  if (!res.ok) return { status: 'error', error: `App Store lookup responded ${res.status}`, pageUrl };
  const data = (await res.json()) as {
    results: { version: string; currentVersionReleaseDate?: string }[];
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

function fetchRelease(product: Product, source: FetchedSource): Promise<ReleaseInfo> {
  switch (source.type) {
    case 'github':
      return fetchGithub(product, source.repo);
    case 'actions':
      return fetchActions(product, source.repo);
    case 'appstore':
      return fetchAppStore(product, source.appId);
  }
}

async function loadRelease(product: Product): Promise<ReleaseInfo> {
  const { source } = product;
  if (source.type === 'channel') return { status: 'external', pageUrl: source.url };
  try {
    return await fetchRelease(product, source);
  } catch (e) {
    return {
      status: 'error',
      error: `Upstream request failed: ${e instanceof Error ? e.message : String(e)}`,
      pageUrl: releasesPageUrl(product),
    };
  }
}

let pending: Promise<ReleasesResponse> | undefined;

// Every page of a build shares one fetch.
export function getReleases(): Promise<ReleasesResponse> {
  pending ??= Promise.all(PRODUCTS.map(loadRelease)).then((infos) => {
    for (const [i, info] of infos.entries()) {
      if (info.status === 'error') console.warn(`[releases] ${PRODUCTS[i].id}: ${info.error}`);
    }
    return {
      products: Object.fromEntries(PRODUCTS.map((p, i) => [p.id, infos[i]])) as Record<ProductId, ReleaseInfo>,
    };
  });
  return pending;
}
