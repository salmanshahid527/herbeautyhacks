import { cache } from "react";
import { fetchWp } from "@/lib/wp/client";
import { mapWpPostToPostDetail } from "@/lib/wp/map";
import type { WpPost } from "@/lib/wp/types";

export type { MappedPostDetail } from "@/lib/wp/map";

/** Fetch a single post by slug (for server-side pre-render / SEO). Cached per request for generateMetadata + page. */
export const getPostBySlug = cache(async function getPostBySlug(slug: string) {
  try {
    const data = await fetchWp<WpPost[]>("/posts", { slug, per_page: 1, _embed: 1 });
    const wp = Array.isArray(data) ? data[0] : null;
    return wp ? mapWpPostToPostDetail(wp) : null;
  } catch {
    return null;
  }
});
