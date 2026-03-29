"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWp } from "@/lib/wp/client";
import { mapWpPostToPost } from "@/lib/wp/map";
import type { WpPost } from "@/lib/wp/types";
import type { Post } from "@/hooks/usePosts";

async function fetchSearchPosts(query: string): Promise<Post[]> {
  const q = query.trim();
  if (!q) return [];
  try {
    const data = await fetchWp<WpPost[]>(`/posts`, {
      search: q,
      _embed: 1,
      per_page: 20,
      status: "publish",
      orderby: "relevance",
    });
    return (Array.isArray(data) ? data : []).map((wp) => mapWpPostToPost(wp) as Post);
  } catch {
    return [];
  }
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchPosts(query),
    enabled: query.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
