"use client";

import { useQuery } from "@tanstack/react-query";
import { getPageBySlug } from "@/lib/wp/pages";

export type { Page } from "@/lib/wp/pages";

export function usePage(slug: string) {
  return useQuery({
    queryKey: ["page", slug],
    queryFn: () => getPageBySlug(slug),
    enabled: !!slug,
  });
}
