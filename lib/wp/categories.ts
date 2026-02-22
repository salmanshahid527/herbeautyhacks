import { cache } from "react";
import { rewriteWpUrlsToSiteUrl } from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import type { WpCategory } from "@/lib/wp/types";

export interface Category {
  _id: string;
  id: number;
  title: string;
  slug: string;
  description?: string;
  order?: number;
}

function mapWpCategoryToCategory(wp: WpCategory): Category {
  const description = wp.description
    ? rewriteWpUrlsToSiteUrl(wp.description)
    : undefined;
  return {
    _id: String(wp.id),
    id: wp.id,
    title: wp.name,
    slug: wp.slug,
    description,
  };
}

/** Fetch categories for blog (server-only). Cached per request. */
export const getCategories = cache(async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchWp<WpCategory[]>("/categories", {
      per_page: 100,
      orderby: "name",
      order: "asc",
    });
    return (Array.isArray(data) ? data : []).map(mapWpCategoryToCategory);
  } catch {
    return [];
  }
});

/** Fetch a single category by slug (server-only). Cached per request. */
export const getCategoryBySlug = cache(async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    const data = await fetchWp<WpCategory[]>("/categories", { slug });
    const wp = Array.isArray(data) ? data[0] : null;
    return wp ? mapWpCategoryToCategory(wp) : null;
  } catch {
    return null;
  }
});
