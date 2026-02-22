import { decodeHtmlEntities, rewriteWpUrlsToSiteUrl } from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import type { WpPage } from "@/lib/wp/types";

export interface Page {
  _id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
}

/** Slug aliases: try these if the primary slug returns no page (e.g. WP uses "contact-us" for Contact). */
const SLUG_FALLBACKS: Record<string, string[]> = {
  contact: ["contact-us"],
};

async function fetchPageBySlug(slug: string): Promise<Page | null> {
  try {
    const data = await fetchWp<WpPage[]>(`/pages`, { slug, per_page: 1 });
    const wp = Array.isArray(data) ? data[0] : null;
    if (!wp) return null;
    const strip = (html: string) => html.replace(/<[^>]*>/g, "").trim();
    const title = rewriteWpUrlsToSiteUrl(decodeHtmlEntities(strip(wp.title?.rendered ?? "")));
    const content = rewriteWpUrlsToSiteUrl(wp.content?.rendered ?? "");
    const excerpt = rewriteWpUrlsToSiteUrl(decodeHtmlEntities(strip(wp.excerpt?.rendered ?? "")));
    return {
      _id: String(wp.id),
      slug: wp.slug,
      title,
      content,
      excerpt,
    };
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const page = await fetchPageBySlug(slug);
  if (page) return page;
  const fallbacks = SLUG_FALLBACKS[slug];
  if (!fallbacks?.length) return null;
  for (const fallback of fallbacks) {
    const p = await fetchPageBySlug(fallback);
    if (p) return p;
  }
  return null;
}
