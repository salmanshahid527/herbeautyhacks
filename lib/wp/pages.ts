import { decodeHtmlEntities } from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import type { WpPage } from "@/lib/wp/types";

export interface Page {
  _id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const data = await fetchWp<WpPage[]>(`/pages`, { slug, per_page: 1 });
    const wp = Array.isArray(data) ? data[0] : null;
    if (!wp) return null;
    const strip = (html: string) => html.replace(/<[^>]*>/g, "").trim();
    return {
      _id: String(wp.id),
      slug: wp.slug,
      title: decodeHtmlEntities(strip(wp.title?.rendered ?? "")),
      content: wp.content?.rendered ?? "",
      excerpt: decodeHtmlEntities(strip(wp.excerpt?.rendered ?? "")),
    };
  } catch {
    return null;
  }
}
