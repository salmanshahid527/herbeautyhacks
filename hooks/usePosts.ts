"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWp } from "@/lib/wp/client";
import { mapWpPostToPost as mapWpToPost, mapWpPostToPostDetail } from "@/lib/wp/map";
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

async function fetchPostsForBlog(
  categoryId?: number,
  categorySlug?: string
): Promise<Post[]> {
  try {
    const params: Record<string, string | number> = {
      _embed: 1,
      per_page: 50,
      orderby: "date",
      order: "desc",
    };
    if (categoryId) {
      params.categories = categoryId;
    } else if (categorySlug) {
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
    return wp ? (mapWpPostToPostDetail(wp) as PostDetail) : null;
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

export function usePosts(options?: {
  categorySlug?: string;
  categoryId?: number;
  initialData?: Post[];
}) {
  const categorySlug = options?.categorySlug;
  const categoryId = options?.categoryId;
  const initialData = options?.initialData;
  const hasInitial =
    categorySlug == null &&
    categoryId == null &&
    initialData !== undefined &&
    initialData !== null;
  const cacheKey =
    categoryId != null ? `cat:${categoryId}` : categorySlug ?? "all";
  return useQuery({
    queryKey: ["posts", cacheKey],
    queryFn: () => fetchPostsForBlog(categoryId, categoryId ? undefined : categorySlug),
    initialData: hasInitial ? initialData : undefined,
    initialDataUpdatedAt: hasInitial ? Date.now() : undefined,
    staleTime: hasInitial ? Infinity : 0,
  });
}

export function usePost(slug: string | null, initialData?: PostDetail | null) {
  const hasServerData = !!initialData;
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
    initialData: initialData ?? undefined,
    initialDataUpdatedAt: hasServerData ? Date.now() : undefined,
    staleTime: hasServerData ? Infinity : 0,
  });
}

export function usePostsByCategory(
  categorySlugOrId: string | number | null,
  limit = 6,
  initialData?: Post[]
) {
  const byId = typeof categorySlugOrId === "number";
  const hasInitial =
    initialData !== undefined &&
    initialData !== null &&
    categorySlugOrId !== null &&
    categorySlugOrId !== undefined;
  return useQuery({
    queryKey: ["posts", "category", categorySlugOrId, limit],
    queryFn: () =>
      byId
        ? fetchPostsByCategoryId(categorySlugOrId as number, limit)
        : fetchPostsByCategoryLimit(categorySlugOrId as string, limit),
    enabled: categorySlugOrId !== null && categorySlugOrId !== undefined,
    initialData: hasInitial ? initialData : undefined,
    initialDataUpdatedAt: hasInitial ? Date.now() : undefined,
    staleTime: hasInitial ? Infinity : 0,
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
