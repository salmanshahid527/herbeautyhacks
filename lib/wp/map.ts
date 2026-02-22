import { decodeHtmlEntities, rewriteWpUrlsToSiteUrl } from "@/lib/html";
import type { WpPost } from "@/lib/wp/types";

export interface MappedPostCategory {
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
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function mapWpPostToPost(wp: WpPost): MappedPost {
  const category = wp._embedded?.["wp:term"]?.[0]?.[0];
  const featuredMedia = wp._embedded?.["wp:featuredmedia"]?.[0];
  const title = rewriteWpUrlsToSiteUrl(decodeHtmlEntities(stripHtml(wp.title?.rendered ?? "")));
  const excerpt = rewriteWpUrlsToSiteUrl(decodeHtmlEntities(stripHtml(wp.excerpt?.rendered ?? "")));
  return {
    _id: String(wp.id),
    title,
    slug: wp.slug,
    excerpt,
    category: category ? { title: category.name, slug: category.slug } : undefined,
    featuredImage: featuredMedia?.source_url,
    featured: !!wp.sticky,
    publishedAt: wp.date,
  };
}

export interface MappedPostDetail extends MappedPost {
  body?: string;
  author?: { name: string; image?: string };
  modifiedAt?: string;
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
  };
}
