import { getWpJsonV2Base } from "@/lib/wp/env";

/** ISR for sitemap fetches (seconds). */
const REVALIDATE = 3600;

/** WordPress REST typical max per_page. */
const WP_PER_PAGE = 100;

export type WpPostSitemapStub = { slug: string; modified?: string; date?: string };
export type WpCategorySitemapStub = { slug: string; id?: number };
export type WpPageSitemapStub = { slug: string; date?: string; modified?: string };

function buildUrl(path: string, params: Record<string, string | number | undefined>): string {
  const base = getWpJsonV2Base(process.env.NEXT_PUBLIC_WP_URL);
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") search.set(k, String(v));
  }
  const q = search.toString();
  return `${base}${path.startsWith("/") ? path : `/${path}`}${q ? `?${q}` : ""}`;
}

async function wpFetch(path: string, params: Record<string, string | number | undefined>) {
  const url = buildUrl(path, params);
  return fetch(url, {
    next: { revalidate: REVALIDATE },
    headers: { Accept: "application/json" },
  });
}

/** Total published posts (for chunk count). */
export async function getPublishedPostCount(): Promise<number> {
  const res = await wpFetch("/posts", {
    per_page: 1,
    page: 1,
    status: "publish",
    _fields: "id",
  });
  if (!res.ok) return 0;
  const total = res.headers.get("x-wp-total");
  return total ? parseInt(total, 10) : 0;
}

/** Fetch up to `max` posts starting at `offset` (stable ordering: date desc). */
export async function fetchPostsSitemapSlice(
  offset: number,
  max: number
): Promise<WpPostSitemapStub[]> {
  const out: WpPostSitemapStub[] = [];
  let currentOffset = offset;

  while (out.length < max) {
    const perPage = Math.min(WP_PER_PAGE, max - out.length);
    const res = await wpFetch("/posts", {
      per_page: perPage,
      offset: currentOffset,
      status: "publish",
      orderby: "date",
      order: "desc",
      _fields: "slug,modified,date",
    });
    if (!res.ok) break;
    const batch = (await res.json()) as WpPostSitemapStub[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const row of batch) {
      if (row?.slug) out.push(row);
    }
    if (batch.length < perPage) break;
    currentOffset += batch.length;
  }

  return out;
}

/** All category term slugs (paginated). Uncategorized kept — matches live archives. */
export async function fetchAllCategoriesForSitemap(): Promise<WpCategorySitemapStub[]> {
  const out: WpCategorySitemapStub[] = [];
  let page = 1;

  while (true) {
    const res = await wpFetch("/categories", {
      per_page: WP_PER_PAGE,
      page,
      _fields: "slug,id",
    });
    if (!res.ok) break;
    const batch = (await res.json()) as WpCategorySitemapStub[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const row of batch) {
      if (row?.slug) out.push(row);
    }
    if (batch.length < WP_PER_PAGE) break;
    page++;
    if (page > 500) break;
  }

  return out;
}

/** Published pages whose slugs exist as routes in this Next app (about, contact, privacy, etc.). */
export async function fetchMappedWpPagesForSitemap(
  slugToPath: Record<string, string>
): Promise<WpPageSitemapStub[]> {
  const allowed = new Set(Object.keys(slugToPath));
  const out: WpPageSitemapStub[] = [];
  let page = 1;

  while (true) {
    const res = await wpFetch("/pages", {
      per_page: WP_PER_PAGE,
      page,
      status: "publish",
      _fields: "slug,date,modified",
    });
    if (!res.ok) break;
    const batch = (await res.json()) as WpPageSitemapStub[];
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const row of batch) {
      if (row?.slug && allowed.has(row.slug)) out.push(row);
    }
    if (batch.length < WP_PER_PAGE) break;
    page++;
    if (page > 100) break;
  }

  return out;
}
