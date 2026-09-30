import { decodeHtmlEntities, rewriteWpUrlsToSiteUrl } from "@/lib/html";
import { fetchWp } from "@/lib/wp/client";
import type { WpPage } from "@/lib/wp/types";

export interface NavLink {
  label: string;
  href: string;
}

/** WP page slug -> app path. */
const SLUG_TO_PATH: Record<string, string> = {
  about: "/about",
  contact: "/contact",
  "privacy-policy": "/privacy",
  privacy: "/privacy",
  disclaimer: "/disclaimer",
  "terms-conditions": "/terms-conditions",
};

const NAV_PAGE_SLUGS = ["about", "contact", "privacy-policy", "privacy","disclaimer", "terms-conditions"];

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Fetch nav links from WordPress (for server-side initial render). */
export async function getNavLinks(): Promise<NavLink[]> {
  const staticPrefix: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  const data = await fetchWp<WpPage[]>("/pages", {
    per_page: 100,
    orderby: "menu_order",
    order: "asc",
  });
  const pages = Array.isArray(data) ? data : [];
  const slugSet = new Set(NAV_PAGE_SLUGS);
  const seenPath = new Set<string>();
  const ordered: NavLink[] = [];

  for (const p of pages) {
    if (!slugSet.has(p.slug)) continue;
    const path = SLUG_TO_PATH[p.slug] ?? `/${p.slug}`;
    if (seenPath.has(path)) continue;
    seenPath.add(path);
    ordered.push({
      label: rewriteWpUrlsToSiteUrl(decodeHtmlEntities(stripHtml(p.title?.rendered ?? p.slug))),
      href: path,
    });
  }

  return [...staticPrefix, ...ordered];
}
