"use client";

import { useQuery } from "@tanstack/react-query";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Page } from "@/lib/wp/pages";
import { isHeadlessExcludedWpPageSlug } from "@/lib/wp/excludedPublicWpPages";

export type { Page } from "@/lib/wp/pages";

export function usePage(slug: string, initialPage?: Page | null) {
  const hasServerData = !!initialPage;
  return useQuery({
    queryKey: ["page", slug],
    queryFn: () => getPageBySlug(slug),
    enabled: !!slug && !isHeadlessExcludedWpPageSlug(slug),
    initialData: initialPage ?? undefined,
    initialDataUpdatedAt: hasServerData ? Date.now() : undefined,
    staleTime: hasServerData ? Infinity : 0,
  });
}
