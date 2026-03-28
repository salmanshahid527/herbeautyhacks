"use client";

import { useQuery } from "@tanstack/react-query";

export interface NavLink {
  label?: string;
  href?: string;
}

export interface AsSeenOnItem {
  name?: string;
  url?: string;
  logo?: { asset?: { _ref: string }; _type: string };
}

export interface SiteSettings {
  _id: string;
  title?: string;
  heroTagline?: string;
  heroIntro?: string;
  heroCtaText?: string;
  searchPlaceholder?: string;
  navLinks?: NavLink[];
  footerGoToLinks?: NavLink[];
  footerLegalLinks?: NavLink[];
  asSeenOn?: AsSeenOnItem[];
}

const defaultSettings: SiteSettings = {
  _id: "default",
  title: "Her Beauty Hacks",
  heroTagline: "No One Is You…",
  heroIntro:
    "Your go-to spot for beauty, fashion, skincare, and lifestyle tips. Pick a topic and explore.",
  heroCtaText: "Pick Your Topic",
  searchPlaceholder: "Search…",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  footerGoToLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  return defaultSettings;
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: fetchSiteSettings,
  });
}
