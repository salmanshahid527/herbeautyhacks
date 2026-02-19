"use client";

import { useQuery } from "@tanstack/react-query";
import { getNavLinks } from "@/lib/wp/nav";

export type { NavLink } from "@/lib/wp/nav";

/** Optional server-fetched nav so first paint matches (no flash when WP data loads). */
export function useNavLinks(initialData?: import("@/lib/wp/nav").NavLink[] | null) {
  return useQuery({
    queryKey: ["navLinks"],
    queryFn: getNavLinks,
    initialData: initialData ?? undefined,
    staleTime: 2 * 60 * 1000, // 2 min: avoid refetch on mount and prevent nav flash
  });
}
