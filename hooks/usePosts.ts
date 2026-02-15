"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWp } from "@/lib/wp/client";
import type { WpPost } from "@/lib/wp/types";

export interface PostCategory {
  title: string;
  slug: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: PostCategory;
  featuredImage?: string;
  featured?: boolean;
  order?: number;
  publishedAt?: string;
}

export interface PostDetail extends Post {
  body?: string;
  author?: { name: string; image?: string };
}

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
    excerpt: stripHtml(wp.excerpt?.rendered ?? ""),
    category: category ? { title: category.name, slug: category.slug } : undefined,
    featuredImage: featuredMedia?.source_url,
    featured: !!wp.sticky,
    publishedAt: wp.date,
  };
}

function mapWpPostToPostDetail(wp: WpPost): PostDetail {
  const post = mapWpPostToPost(wp);
  const author = wp._embedded?.author?.[0];
  return {
    ...post,
    body: wp.content?.rendered,
    author: author
      ? {
          name: author.name,
          image: author.avatar_urls?.[96],
        }
      : undefined,
  };
}

async function fetchPosts(categorySlug?: string): Promise<Post[]> {
  try {
    const params: Record<string, string | number> = {
      _embed: 1,
      per_page: 50,
      orderby: "date",
      order: "desc",
    };
    if (categorySlug) {
      const categories = await fetchWp<{ id: number }[]>(`/categories`, {
        slug: categorySlug,
      });
      const catId = categories[0]?.id;
      if (catId) params.categories = catId;
    }
    const data = await fetchWp<WpPost[]>(`/posts`, params);
    return (Array.isArray(data) ? data : []).map(mapWpPostToPost);
  } catch {
    return [];
  }
}

async function fetchPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const data = await fetchWp<WpPost[]>(`/posts`, {
      slug,
      _embed: 1,
    });
    const wp = Array.isArray(data) ? data[0] : null;
    return wp ? mapWpPostToPostDetail(wp) : null;
  } catch {
    return null;
  }
}

async function fetchPostsByCategoryLimit(
  categorySlug: string,
  limit: number
): Promise<Post[]> {
  try {
    const categories = await fetchWp<{ id: number }[]>(`/categories`, {
      slug: categorySlug,
    });
    const catId = categories[0]?.id;
    const params: Record<string, string | number> = {
      _embed: 1,
      per_page: limit,
      orderby: "date",
      order: "desc",
    };
    if (catId) params.categories = catId;
    const data = await fetchWp<WpPost[]>(`/posts`, params);
    return (Array.isArray(data) ? data : []).map(mapWpPostToPost);
  } catch {
    return [];
  }
}

export function usePosts(options?: { categorySlug?: string }) {
  const categorySlug = options?.categorySlug;
  return useQuery({
    queryKey: ["posts", categorySlug ?? "all"],
    queryFn: () => fetchPosts(categorySlug),
  });
}

export function usePost(slug: string | null) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });
}

export function usePostsByCategory(categorySlug: string | null, limit = 6) {
  return useQuery({
    queryKey: ["posts", "category", categorySlug, limit],
    queryFn: () => fetchPostsByCategoryLimit(categorySlug!, limit),
    enabled: !!categorySlug,
  });
}
