"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWp } from "@/lib/wp/client";
import type { WpUser } from "@/lib/wp/types";

export interface Author {
  _id: string;
  name: string;
  bio?: string;
  image?: string;
  pinterest?: string;
  instagram?: string;
  facebook?: string;
}

async function fetchAuthor(): Promise<Author | null> {
  try {
    const data = await fetchWp<WpUser[]>(`/users`, { per_page: 1 });
    const user = Array.isArray(data) ? data[0] : null;
    if (!user) return null;
    return {
      _id: String(user.id),
      name: user.name,
      bio: user.description || undefined,
      image: user.avatar_urls?.[96],
    };
  } catch {
    return null;
  }
}

export function useAuthor() {
  return useQuery({
    queryKey: ["author"],
    queryFn: fetchAuthor,
  });
}
