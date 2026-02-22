import { cache } from "react";
import {
  forceHttpsForImgSrc,
  rewriteWpUrlsToSiteUrl,
  sanitizeHtmlForProse,
} from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import { mapWpPostToPostDetail } from "@/lib/wp/map";
import type { WpPost } from "@/lib/wp/types";

export type { MappedPostDetail } from "@/lib/wp/map";

/** Process post body: sanitize, fix URLs to site domain, and force HTTPS for images. */
function processPostBody(html: string | undefined): string | undefined {
  if (!html?.trim()) return html;
  const sanitized = sanitizeHtmlForProse(html);
  const withSiteUrls = rewriteWpUrlsToSiteUrl(sanitized);
  return forceHttpsForImgSrc(withSiteUrls);
}

/** Fetch a single post by slug (for server-side pre-render / SEO). Cached per request for generateMetadata + page. */
export const getPostBySlug = cache(async function getPostBySlug(slug: string) {
  try {
    const data = await fetchWp<WpPost[]>("/posts", { slug, per_page: 1, _embed: 1 });
    const wp = Array.isArray(data) ? data[0] : null;
    if (!wp) return null;
    const post = mapWpPostToPostDetail(wp);
    post.body = processPostBody(post.body);
    return post;
  } catch {
    return null;
  }
});
