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
    return {
      _id: String(wp.id),
      slug: wp.slug,
      title: wp.title?.rendered?.replace(/<[^>]*>/g, "").trim() ?? "",
      content: wp.content?.rendered ?? "",
      excerpt: wp.excerpt?.rendered?.replace(/<[^>]*>/g, "").trim() ?? "",
    };
  } catch {
    return null;
  }
}
