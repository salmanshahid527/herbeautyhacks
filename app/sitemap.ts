import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import {
  getPublishedPostCount,
  fetchPostsSitemapSlice,
  fetchAllCategoriesForSitemap,
  fetchMappedWpPagesForSitemap,
} from "@/lib/wp/sitemap-data";

/** Regenerate sitemap periodically (ISR). */
export const revalidate = 43200;

/**
 * Google allows at most 50,000 URLs per sitemap file.
 * We reserve slots for static routes, categories, and mapped pages.
 */
const GOOGLE_MAX_URLS = 50_000;
const RESERVED_NON_POST_SLOTS = 500;
const MAX_POST_URLS = GOOGLE_MAX_URLS - RESERVED_NON_POST_SLOTS;

/** WP page slug → Next.js path (only routes that exist in `app/`). */
const PAGE_SLUG_TO_PATH: Record<string, string> = {
  about: "/about",
  contact: "/contact",
  "privacy-policy": "/privacy",
  privacy: "/privacy",
};

function lastMod(iso?: string): Date {
  if (!iso) return new Date();
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

/**
 * Single dynamic sitemap at `/sitemap.xml` (best for Google Search Console).
 * Includes every published post (paginated from WordPress), all categories, mapped pages, and core static URLs.
 * Capped at ~49.5k posts so the file stays within Google’s 50k URL limit.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // WP errors propagate (no try/catch) so ISR keeps the last good sitemap instead of publishing a truncated one.
  const totalPosts = await getPublishedPostCount();
  const postLimit = Math.min(totalPosts, MAX_POST_URLS);

  const [cats, pgs, postStubs] = await Promise.all([
    fetchAllCategoriesForSitemap(),
    fetchMappedWpPagesForSitemap(PAGE_SLUG_TO_PATH),
    postLimit > 0 ? fetchPostsSitemapSlice(0, postLimit) : Promise.resolve([]),
  ]);

  const categories: MetadataRoute.Sitemap = cats.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const pages: MetadataRoute.Sitemap = pgs.map((p) => ({
    url: `${base}${PAGE_SLUG_TO_PATH[p.slug] ?? `/${p.slug}`}`,
    lastModified: lastMod(p.modified ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const posts: MetadataRoute.Sitemap = postStubs.map((p) => ({
    url: `${base}/${p.slug}`,
    lastModified: lastMod(p.modified ?? p.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const merge = [...staticRoutes, ...categories, ...pages, ...posts];
  const seen = new Set<string>();
  const deduped = merge.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });

  if (deduped.length > GOOGLE_MAX_URLS) {
    return deduped.slice(0, GOOGLE_MAX_URLS);
  }

  return deduped;
}
