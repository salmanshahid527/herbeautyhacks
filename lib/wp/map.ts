import { decodeHtmlEntities, rewriteWpUrlsToSiteUrl } from "@/lib/html";
import type { WpPost } from "@/lib/wp/types";

export interface MappedPostCategory {
  id: number;
  title: string;
  slug: string;
}

export interface MappedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: MappedPostCategory;
  featuredImage?: string;
  featured?: boolean;
  order?: number;
  publishedAt?: string;
  author?: { name: string; image?: string };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function mapWpPostToPost(wp: WpPost): MappedPost {
  const category = wp._embedded?.["wp:term"]?.[0]?.[0];
  const featuredMedia = wp._embedded?.["wp:featuredmedia"]?.[0];
  const author = wp._embedded?.author?.[0];
  const title = rewriteWpUrlsToSiteUrl(decodeHtmlEntities(stripHtml(wp.title?.rendered ?? "")));
  const excerpt = rewriteWpUrlsToSiteUrl(decodeHtmlEntities(stripHtml(wp.excerpt?.rendered ?? "")));
  return {
    _id: String(wp.id),
    title,
    slug: wp.slug,
    excerpt,
    category: category
      ? {
          id: category.id,
          title: decodeHtmlEntities(stripHtml(category.name ?? "")),
          slug: category.slug,
        }
      : undefined,
    featuredImage: featuredMedia?.source_url,
    featured: !!wp.sticky,
    publishedAt: wp.date,
    author: author
      ? { name: author.name, image: author.avatar_urls?.[96] }
      : undefined,
  };
}

export interface MappedPostDetail extends MappedPost {
  body?: string;
  modifiedAt?: string;
  /** UTC ISO 8601 (with Z) for structured data; WP `date`/`modified` carry no timezone offset. */
  publishedAtIso?: string;
  modifiedAtIso?: string;
}

function gmtToIso(gmt?: string): string | undefined {
  return gmt && /^\d{4}-\d{2}-\d{2}T[\d:]+$/.test(gmt) && !gmt.startsWith("0000") ? `${gmt}Z` : undefined;
}

export function mapWpPostToPostDetail(wp: WpPost): MappedPostDetail {
  const post = mapWpPostToPost(wp);
  const author = wp._embedded?.author?.[0];
  const rawBody = wp.content?.rendered ?? "";
  return {
    ...post,
    body: rawBody ? rewriteWpUrlsToSiteUrl(rawBody) : undefined,
    author: author
      ? { name: author.name, image: author.avatar_urls?.[96] }
      : undefined,
    modifiedAt: wp.modified ?? wp.date,
    publishedAtIso: gmtToIso(wp.date_gmt),
    modifiedAtIso: gmtToIso(wp.modified_gmt) ?? gmtToIso(wp.date_gmt),
  };
}
