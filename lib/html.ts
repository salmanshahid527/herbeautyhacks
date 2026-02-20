/** Match ampersand: normal & or fullwidth ＆ (U+FF06) */
const AMP = "[&\uFF06]";

/**
 * Decode HTML entities so WP content displays correctly (e.g. &#8217; → ', &#8230; → …).
 * Uses browser parser when available; else regex on server.
 */
export function decodeHtmlEntities(text: string): string {
  if (!text || typeof text !== "string") return text;

  if (typeof document !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = text;
    return div.innerHTML;
  }

  let out = text;
  out = out.replace(/&amp;#(\d+);?/g, (_, n) => `&#${n};`);
  out = out.replace(/&amp;#x([0-9a-f]+);?/gi, (_, n) => `&#x${n};`);
  out = out.replace(/&amp;lt;/g, "<").replace(/&amp;gt;/g, ">");
  out = out.replace(/&amp;quot;/g, '"').replace(/&amp;apos;/g, "'").replace(/&amp;amp;/g, "&");

  const numRe = new RegExp(AMP + "#(\\d+);?", "g");
  out = out.replace(numRe, (_, n) => {
    const code = parseInt(n, 10);
    return Number.isNaN(code) ? "&#" + n + ";" : (code <= 0xffff ? String.fromCharCode(code) : String.fromCodePoint(code));
  });
  const hexRe = new RegExp(AMP + "#x([0-9a-f]+);?", "gi");
  out = out.replace(hexRe, (_, hex) => {
    const code = parseInt(hex, 16);
    return Number.isNaN(code) ? "&#x" + hex + ";" : (code <= 0xffff ? String.fromCharCode(code) : String.fromCodePoint(code));
  });

  out = out.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ");
  out = out.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  return out;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Rewrite img src that point at WordPress wp-content to our origin path.
 * Next.js rewrites /wp-content/* to the WordPress server, so the browser requests
 * our domain and we proxy — avoids mixed content (HTTP on HTTPS) and CORS on live.
 */
export function rewriteWpContentImgSrc(html: string): string {
  if (!html || typeof html !== "string") return html;
  const wpUrl =
    typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WP_URL
      ? process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, "")
      : "";
  if (!wpUrl) return html;
  try {
    const origin = new URL(wpUrl).origin;
    const prefix = escapeRegex(origin + "/wp-content/");
    return html.replace(new RegExp(prefix, "gi"), "/wp-content/");
  } catch {
    return html;
  }
}

/**
 * Force HTTPS for img src so images load on HTTPS pages (avoids mixed-content blocking).
 * WordPress often returns http:// URLs for media; browsers block them when the page is HTTPS.
 */
export function forceHttpsForImgSrc(html: string): string {
  if (!html || typeof html !== "string") return html;
  return html
    .replace(/src="http:\/\//gi, 'src="https://')
    .replace(/src='http:\/\//gi, "src='https://");
}

/**
 * Minimal HTML sanitizer for prose content (no ESM deps, works in SSR).
 * Strips script, iframe, object, embed, form, and event-handler attributes.
 */
export function sanitizeHtmlForProse(html: string): string {
  if (!html || typeof html !== "string") return html;
  let out = html;
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "");
  out = out.replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, "");
  out = out.replace(/<embed\b[^>]*\s*\/?>/gi, "");
  out = out.replace(/<form\b[^>]*>[\s\S]*?<\/form>/gi, "");
  out = out.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, "");
  out = out.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, "");
  return out;
}
