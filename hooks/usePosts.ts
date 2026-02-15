"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWp } from "@/lib/wp/client";
import { mapWpPostToPost as mapWpToPost } from "@/lib/wp/map";
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

function mapWpPostToPostDetail(wp: WpPost): PostDetail {
  const post = mapWpToPost(wp) as Post;
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
    return (Array.isArray(data) ? data : []).map((wp) => mapWpToPost(wp) as Post);
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

async function fetchPostsByCategoryId(
  categoryId: number,
  limit: number
): Promise<Post[]> {
  try {
    const data = await fetchWp<WpPost[]>(`/posts`, {
      _embed: 1,
      categories: categoryId,
      per_page: limit,
      orderby: "date",
      order: "desc",
    });
    return (Array.isArray(data) ? data : []).map((wp) => mapWpToPost(wp) as Post);
  } catch {
    return [];
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
    if (!catId) return [];
    return fetchPostsByCategoryId(catId, limit);
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

export function usePostsByCategory(
  categorySlugOrId: string | number | null,
  limit = 6
) {
  const byId = typeof categorySlugOrId === "number";
  return useQuery({
    queryKey: ["posts", "category", categorySlugOrId, limit],
    queryFn: () =>
      byId
        ? fetchPostsByCategoryId(categorySlugOrId as number, limit)
        : fetchPostsByCategoryLimit(categorySlugOrId as string, limit),
    enabled: categorySlugOrId !== null && categorySlugOrId !== undefined,
  });
}

/** One WordPress request: fetch recent posts (each has categories[]), then group by category. No N+1, no proxy. */
async function fetchPostsForMultipleCategories(
  categoryIds: number[],
  limitPerCategory: number
): Promise<Record<number, Post[]>> {
  if (categoryIds.length === 0) return {};
  const idSet = new Set(categoryIds);
  const maxPosts = Math.min(categoryIds.length * limitPerCategory * 3, 100);
  const data = await fetchWp<WpPost[]>(`/posts`, {
    _embed: 1,
    per_page: maxPosts,
    orderby: "date",
    order: "desc",
  });
  const allPosts = Array.isArray(data) ? data : [];
  const countByCategory = Object.fromEntries(categoryIds.map((id) => [id, 0]));
  const byCategory: Record<number, Post[]> = Object.fromEntries(
    categoryIds.map((id) => [id, []])
  );
  for (const wp of allPosts) {
    const cids = wp.categories ?? [];
    for (const cid of cids) {
      if (!idSet.has(cid) || countByCategory[cid] >= limitPerCategory) continue;
      byCategory[cid].push(mapWpToPost(wp) as Post);
      countByCategory[cid]++;
    }
  }
  return byCategory;
}

/** Fetches posts for many categories in one WordPress request; groups by category in the hook. */
export function usePostsForMultipleCategories(
  categoryIds: number[],
  limitPerCategory: number
) {
  const stableIds = categoryIds.length > 0 ? [...categoryIds].sort((a, b) => a - b) : [];
  return useQuery({
    queryKey: ["posts", "categories-batch", stableIds, limitPerCategory],
    queryFn: () => fetchPostsForMultipleCategories(stableIds, limitPerCategory),
    enabled: stableIds.length > 0,
  });
}
