/** Base URL for the site (no trailing slash). Used in sitemap, canonical, OG. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://herbeautyhacks.com";
}

/** Default OG image when no page-specific image exists. Per ogp.me, og:image is required. */
export const DEFAULT_OG_IMAGE = {
  url: "/logo-her-beauty-hacks.png",
  width: 512,
  height: 512,
  alt: "Her Beauty Hacks",
} as const;
