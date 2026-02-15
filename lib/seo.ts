/** Base URL for the site (no trailing slash). Used in sitemap, canonical, OG. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://herbeautyhacks.com";
}
