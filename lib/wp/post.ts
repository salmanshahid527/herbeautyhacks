import { cache } from "react";
import {
  demoteBodyH1ToH2,
  forceHttpsForImgSrc,
  rewriteWpUrlsToSiteUrl,
  sanitizeHtmlForProse,
} from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import { getCategoryBySlug } from "@/lib/wp/categories";
import { mapWpPostToPost, mapWpPostToPostDetail } from "@/lib/wp/map";
import type { WpPost } from "@/lib/wp/types";

export type { MappedPostDetail } from "@/lib/wp/map";
export type { MappedPost } from "@/lib/wp/map";

/** Process post body: sanitize, fix URLs to site domain, and force HTTPS for images. */
function processPostBody(html: string | undefined): string | undefined {
  if (!html?.trim()) return html;
  const sanitized = sanitizeHtmlForProse(html);
  const withSiteUrls = rewriteWpUrlsToSiteUrl(sanitized);
  return demoteBodyH1ToH2(forceHttpsForImgSrc(withSiteUrls));
}

/** Fetch a single post by slug (for server-side pre-render / SEO). Cached per request for generateMetadata + page. */
export const getPostBySlug = cache(async function getPostBySlug(slug: string) {
  const data = await fetchWp<WpPost[]>("/posts", { slug, per_page: 1, _embed: 1 });
  const wp = Array.isArray(data) ? data[0] : null;
  if (!wp) return null;
  const post = mapWpPostToPostDetail(wp);
  post.body = processPostBody(post.body);
  return post;
});

/** Fetch posts for blog listing (server-only). Cached per request. */
export const getPostsForBlog = cache(async function getPostsForBlog() {
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    per_page: 50,
    orderby: "date",
    order: "desc",
  });
  return (Array.isArray(data) ? data : []).map((wp) => mapWpPostToPost(wp));
});

/** Fetch posts for a category by slug (server-only). Cached per request. */
export const getPostsForCategoryBySlug = cache(async function getPostsForCategoryBySlug(
  categorySlug: string
) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    categories: category.id,
    per_page: 50,
    orderby: "date",
    order: "desc",
  });
  return (Array.isArray(data) ? data : []).map((wp) => mapWpPostToPost(wp));
});

/** Fetch featured/recent posts for home (server-only). Cached per request. */
export const getFeaturedPosts = cache(async function getFeaturedPosts() {
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    per_page: 6,
    orderby: "date",
    order: "desc",
  });
  return (Array.isArray(data) ? data : []).map((wp) => mapWpPostToPost(wp));
});

/** Fetch posts grouped by category in one request (server-only). For home page. */
export const getPostsForMultipleCategories = cache(async function getPostsForMultipleCategories(
  categoryIds: number[],
  limitPerCategory: number
): Promise<Record<number, ReturnType<typeof mapWpPostToPost>[]>> {
  if (categoryIds.length === 0) return {};
  const idSet = new Set(categoryIds);
  const maxPosts = Math.min(categoryIds.length * limitPerCategory * 3, 100);
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    per_page: maxPosts,
    orderby: "date",
    order: "desc",
  });
  const allPosts = Array.isArray(data) ? data : [];
  const countByCategory: Record<number, number> = Object.fromEntries(
    categoryIds.map((id) => [id, 0])
  );
  const byCategory: Record<number, ReturnType<typeof mapWpPostToPost>[]> = Object.fromEntries(
    categoryIds.map((id) => [id, []])
  );
  for (const wp of allPosts) {
    const cids = wp.categories ?? [];
    for (const cid of cids) {
      if (!idSet.has(cid) || countByCategory[cid] >= limitPerCategory) continue;
      byCategory[cid].push(mapWpPostToPost(wp));
      countByCategory[cid]++;
    }
  }
  return byCategory;
});

/** Get related posts by category ID (excluding the current post) */
export const getRelatedPostsByCategory = cache(async function getRelatedPostsByCategory(
  categoryId: number,
  currentPostSlug: string,
  limit: number = 4
) {
  const data = await fetchWp<WpPost[]>("/posts", {
    _embed: 1,
    categories: categoryId,
    per_page: limit + 5,
    orderby: "date",
    order: "desc",
  });
  
  const posts = Array.isArray(data) ? data : [];
  return posts
    .filter((wp) => wp.slug !== currentPostSlug)
    .slice(0, limit)
    .map(mapWpPostToPost);
});
