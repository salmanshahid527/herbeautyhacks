import { cache } from "react";
import { rewriteWpUrlsToSiteUrl } from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import type { WpUser } from "@/lib/wp/types";
import { knownAuthorProfile } from "@/lib/authors";

export interface Author {
  _id: string;
  name: string;
  bio?: string;
  image?: string;
  pinterest?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

/** Fetch site author (first user, server-only). Cached per request. */
export const getAuthor = cache(async function getAuthor(): Promise<Author | null> {
  try {
    // /wp/v2/users is blocked at Cloudflare (user-enumeration rule), so read the
    // author embedded in the latest post. Embeds are resolved inside WordPress.
    const posts = await fetchWp<{ _embedded?: { author?: WpUser[] } }[]>(`/posts`, {
      per_page: 1,
      _embed: "author",
      _fields: "id,_links,_embedded",
    });
    const user = Array.isArray(posts) ? posts[0]?._embedded?.author?.[0] : null;
    // Only real, listed authors get a card; retired personas are never shown.
    const profile = knownAuthorProfile(user?.name);
    if (!user?.name || !profile) return null;
    const bio = user.description
      ? rewriteWpUrlsToSiteUrl(user.description)
      : undefined;
    return {
      _id: String(user.id),
      name: user.name,
      bio,
      image: user.avatar_urls?.[96],
      ...profile,
    };
  } catch {
    return null;
  }
});
