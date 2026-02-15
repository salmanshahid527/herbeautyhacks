"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWp } from "@/lib/wp/client";
import type { WpCategory } from "@/lib/wp/types";

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  order?: number;
}

function mapWpCategoryToCategory(wp: WpCategory): Category {
  return {
    _id: String(wp.id),
    title: wp.name,
    slug: wp.slug,
    description: wp.description || undefined,
  };
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await fetchWp<WpCategory[]>(`/categories`, {
      per_page: 100,
      orderby: "name",
      order: "asc",
    });
    return (Array.isArray(data) ? data : []).map(mapWpCategoryToCategory);
  } catch {
    return [];
  }
}

async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await fetchWp<WpCategory[]>(`/categories`, { slug });
    const wp = Array.isArray(data) ? data[0] : null;
    return wp ? mapWpCategoryToCategory(wp) : null;
  } catch {
    return null;
  }
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useCategory(slug: string | null) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => fetchCategoryBySlug(slug!),
    enabled: !!slug,
  });
}
