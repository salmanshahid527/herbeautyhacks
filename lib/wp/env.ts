/**
 * Normalize NEXT_PUBLIC_WP_URL for API + asset rewrites.
 *
 * Accepts either:
 * - Site root: https://api.example.com  (recommended)
 * - REST root: https://api.example.com/wp-json  (common mistake; we fix it)
 *
 * Always returns the WordPress site root (no trailing slash, no /wp-json).
 */
export function normalizeWpSiteRoot(env: string | undefined): string {
  const fallback = "https://your-site.com";
  let raw = (env?.trim() || fallback).replace(/\/$/, "");
  if (raw.endsWith("/wp-json")) {
    raw = raw.slice(0, -"/wp-json".length).replace(/\/$/, "");
  }
  return raw || fallback;
}

/** Base URL for wp-json REST: .../wp-json/wp/v2 */
export function getWpJsonV2Base(env: string | undefined): string {
  const root = normalizeWpSiteRoot(env);
  return `${root}/wp-json/wp/v2`;
}
