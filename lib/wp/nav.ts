import { decodeHtmlEntities } from "@/lib/html";
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
  shop: "/shop",
  "privacy-policy": "/privacy",
  privacy: "/privacy",
};

const NAV_PAGE_SLUGS = ["about", "shop", "contact", "privacy-policy", "privacy"];

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

const DEFAULT_FALLBACK: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

/** Fetch nav links from WordPress (for server-side initial render). */
export async function getNavLinks(): Promise<NavLink[]> {
  const staticPrefix: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  try {
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
        label: decodeHtmlEntities(stripHtml(p.title?.rendered ?? p.slug)),
        href: path,
      });
    }

    return [...staticPrefix, ...ordered];
  } catch {
    return DEFAULT_FALLBACK;
  }
}
