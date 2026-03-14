"use client";

import { useQuery } from "@tanstack/react-query";
import { decodeHtmlEntities } from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import type { WpPost } from "@/lib/wp/types";
import type { Post } from "./usePosts";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function mapWpPostToPost(wp: WpPost): Post {
  const category = wp._embedded?.["wp:term"]?.[0]?.[0];
  const featuredMedia = wp._embedded?.["wp:featuredmedia"]?.[0];
  return {
    _id: String(wp.id),
    title: wp.title?.rendered ?? "",
    slug: wp.slug,
    excerpt: decodeHtmlEntities(stripHtml(wp.excerpt?.rendered ?? "")),
    category: category ? { title: category.name, slug: category.slug } : undefined,
    featuredImage: featuredMedia?.source_url,
    featured: !!wp.sticky,
    publishedAt: wp.date,
  };
}

async function fetchFeaturedPosts(): Promise<Post[]> {
  try {
    const data = await fetchWp<WpPost[]>(`/posts`, {
      _embed: 1,
      per_page: 6,
      orderby: "date",
      order: "desc",
    });
    return (Array.isArray(data) ? data : []).map(mapWpPostToPost);
  } catch {
    return [];
  }
}

export function useFeaturedPosts(initialData?: Post[] | null) {
  const hasInitial = initialData !== undefined && initialData !== null;
  return useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchFeaturedPosts,
    initialData: hasInitial ? initialData : undefined,
    initialDataUpdatedAt: hasInitial ? Date.now() : undefined,
    staleTime: hasInitial ? Infinity : 0,
  });
}
