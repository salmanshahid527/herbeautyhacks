"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWp } from "@/lib/wp/client";
import { mapWpPostToPost } from "@/lib/wp/map";
import type { WpPost } from "@/lib/wp/types";
import type { Post } from "./usePosts";

async function fetchFeaturedPosts(): Promise<Post[]> {
  try {
    const data = await fetchWp<WpPost[]>(`/posts`, {
      _embed: 1,
      per_page: 6,
      orderby: "date",
      order: "desc",
    });
    return (Array.isArray(data) ? data : []).map((wp) => mapWpPostToPost(wp) as Post);
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
