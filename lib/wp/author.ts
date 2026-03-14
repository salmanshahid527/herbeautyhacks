import { cache } from "react";
import { rewriteWpUrlsToSiteUrl } from "@/lib/html";
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

/** Fetch site author (first user, server-only). Cached per request. */
export const getAuthor = cache(async function getAuthor(): Promise<Author | null> {
  try {
    const data = await fetchWp<WpUser[]>(`/users`, { per_page: 1 });
    const user = Array.isArray(data) ? data[0] : null;
    if (!user) return null;
    const bio = user.description
      ? rewriteWpUrlsToSiteUrl(user.description)
      : undefined;
    return {
      _id: String(user.id),
      name: user.name,
      bio,
      image: user.avatar_urls?.[96],
    };
  } catch {
    return null;
  }
});
