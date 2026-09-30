/** Match ampersand: normal & or fullwidth ＆ (U+FF06) */
const AMP = "[&\uFF06]";

/**
 * Decode HTML entities (e.g. &#8217; → ', &amp; → &) while preserving HTML tags.
 * Use this for HTML content (blog body, page content).
 */
function decodeHtmlEntitiesRegex(text: string): string {
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

/**
 * True if the string looks like HTML or entity-encoded HTML (e.g. after server→client serialization).
 * When true we use regex decode so tags are preserved; when false we may use DOM+textContent for plain text (titles).
 */
function looksLikeHtml(text: string): boolean {
  return (
    text.includes("<") ||
    text.includes("&lt;") ||
    text.includes("&gt;") ||
    /&(amp|quot|#\d+);/i.test(text)
  );
}

/**
 * Decode HTML entities so WP content displays correctly (e.g. &#8217; → ', &#8230; → …).
 * - For HTML (or entity-encoded HTML): decodes entities but keeps tags (for RichText / page content).
 * - For plain text only (e.g. titles): on client uses DOM + textContent so entities decode correctly after hydration.
 */
export function decodeHtmlEntities(text: string): string {
  if (!text || typeof text !== "string") return text;

  if (typeof document !== "undefined" && !looksLikeHtml(text)) {
    const div = document.createElement("div");
    div.innerHTML = text;
    return div.textContent ?? div.innerText ?? "";
  }

  return decodeHtmlEntitiesRegex(text);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getWpContentOrigin(): string | null {
  try {
    const wpUrl =
      typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WP_URL
        ? process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, "")
        : "";
    if (!wpUrl) return null;
    return new URL(wpUrl).origin;
  } catch {
    return null;
  }
}

/** Site URL (frontend) without trailing slash. */
function getSiteOrigin(): string {
  const url =
    typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
      : "https://herbeautyhacks.com";
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

/** Known WordPress backend hostnames to always rewrite to the site (fallback if env differs). */
const KNOWN_WP_HOSTS = ["lightskyblue-armadillo-384014.hostingersite.com"];

/** Site hostname only (e.g. herbeautyhacks.com) for replacing bare hostname in text. */
function getSiteHostname(): string {
  try {
    return new URL(getSiteOrigin()).hostname;
  } catch {
    return "herbeautyhacks.com";
  }
}

/**
 * Replace WordPress backend URL with the frontend site URL in content.
 * Fixes links and plain-text hostnames (e.g. "At lightskyblue-... we believe" → "At herbeautyhacks.com we believe").
 * Replaces: full origins (https/http), protocol-relative (//host), and bare hostname in text.
 */
export function rewriteWpUrlsToSiteUrl(html: string): string {
  if (!html || typeof html !== "string") return html;
  const siteOrigin = getSiteOrigin();
  const siteHostname = getSiteHostname();
  const hostsToReplace = new Set<string>(KNOWN_WP_HOSTS);
  try {
    const wpOrigin = getWpContentOrigin();
    if (wpOrigin && wpOrigin !== siteOrigin) {
      const hostname = new URL(wpOrigin).hostname;
      hostsToReplace.add(hostname);
    }
    let out = html;
    for (const host of hostsToReplace) {
      out = out.replace(new RegExp(escapeRegex(`https://${host}`), "gi"), siteOrigin);
      out = out.replace(new RegExp(escapeRegex(`http://${host}`), "gi"), siteOrigin);
      out = out.replace(new RegExp(escapeRegex(`//${host}`), "gi"), `//${siteHostname}`);
    }
    for (const host of hostsToReplace) {
      out = out.replace(new RegExp(escapeRegex(host), "gi"), siteHostname);
    }
    return out;
  } catch {
    return html;
  }
}

/**
 * Rewrite a single URL: if it points at WordPress wp-content, return same-origin path
 * so the Next.js rewrite can proxy it. Otherwise return the URL unchanged.
 */
export function rewriteWpContentUrl(url: string | null | undefined): string | undefined {
  if (!url || typeof url !== "string") return undefined;
  const origin = getWpContentOrigin();
  if (!origin) return url;
  const prefix = origin + "/wp-content/";
  if (url.startsWith(prefix)) return "/wp-content/" + url.slice(prefix.length);
  if (url.startsWith(origin) && url.includes("/wp-content/")) {
    const idx = url.indexOf("/wp-content/");
    return url.slice(idx);
  }
  return url;
}

/**
 * Rewrite img src that point at WordPress wp-content to our origin path.
 * Next.js rewrites /wp-content/* to the WordPress server, so the browser requests
 * our domain and we proxy — avoids mixed content (HTTP on HTTPS) and CORS on live.
 */
export function rewriteWpContentImgSrc(html: string): string {
  if (!html || typeof html !== "string") return html;
  const origin = getWpContentOrigin();
  if (!origin) return html;
  try {
    const prefix = escapeRegex(origin + "/wp-content/");
    return html.replace(new RegExp(prefix, "gi"), "/wp-content/");
  } catch {
    return html;
  }
}

/**
 * Force HTTPS for img src and srcset so images load on HTTPS pages (avoids mixed-content blocking).
 * WordPress often returns http:// URLs for media; browsers block them when the page is HTTPS.
 * srcset can contain multiple URLs (e.g. "http://... 164w, http://... 768w") and all must be HTTPS.
 */
export function forceHttpsForImgSrc(html: string): string {
  if (!html || typeof html !== "string") return html;
  let out = html
    .replace(/src="http:\/\//gi, 'src="https://')
    .replace(/src='http:\/\//gi, "src='https://");
  out = out.replace(
    /srcset=(["'])([^"']*)\1/gi,
    (_, quote: string, value: string) =>
      `srcset=${quote}${value.replace(/http:\/\//gi, "https://")}${quote}`
  );
  return out;
}

/**
 * Add loading="lazy" to img tags that don't have a loading attribute.
 * Defers off-screen prose images so only the LCP image loads eagerly.
 */
export function addLazyLoadingToProseImages(html: string): string {
  if (!html || typeof html !== "string") return html;
  return html.replace(
    /<img(?=\s)(?![^>]*\sloading=)([^>]*)>/gi,
    (_, rest) => `<img loading="lazy"${rest}>`
  );
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

/**
 * Demote any `<h1>` inside WP body HTML to `<h2>` (the page template already renders the only H1).
 * Tagged with `data-was-h1` so globals.css keeps the original H1 visual style.
 */
export function demoteBodyH1ToH2(html: string): string {
  if (!html || typeof html !== "string") return html;
  return html
    .replace(/<h1(?=[\s>])/gi, "<h2 data-was-h1")
    .replace(/<\/h1\s*>/gi, "</h2>");
}

/** Strip all HTML tags */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Extract FAQ items from HTML content (expects h3 tags followed by p tags).
 * Returns array of {question, answer} pairs.
 */
export function extractFAQFromHtml(html: string): Array<{ question: string; answer: string }> {
  const faqItems: Array<{ question: string; answer: string }> = [];
  
  // Match patterns like: <h3>Question?</h3><p>Answer text.</p>
  const h3Pattern = /<h3[^>]*>([^<]+)<\/h3>/gi;
  const pPattern = /<p[^>]*>([^<]+)<\/p>/gi;
  
  // Find all h3 and p tags
  const h3Matches = Array.from(html.matchAll(h3Pattern)).map(m => ({
    text: stripHtml(m[1]),
    index: m.index || 0
  }));
  
  const pMatches = Array.from(html.matchAll(pPattern)).map(m => ({
    text: stripHtml(m[1]),
    index: m.index || 0
  }));
  
  // Pair h3 (questions) with following p (answers)
  for (let i = 0; i < h3Matches.length; i++) {
    const question = h3Matches[i];
    // Find the next p tag that comes after this h3
    const nextP = pMatches.find(p => p.index > question.index);
    
    if (nextP && question.text && nextP.text) {
      faqItems.push({
        question: question.text,
        answer: nextP.text
      });
    }
  }
  
  return faqItems;
}

/**
 * Remove featured image from article body HTML.
 * Removes only the FIRST/FEATURED image at the beginning of the content.
 * Preserves all in-content images to maintain article flow.
 */
export function removeFeaturedImageFromBody(html: string, featuredImageUrl?: string): string {
  if (!html) return html;

  // Only remove the featured image at the START of the content
  // Remove figure tag with featured image from the beginning
  if (featuredImageUrl) {
    const escapedUrl = featuredImageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Remove ONLY the first figure containing the featured image URL at the start
    html = html.replace(
      new RegExp(`^\\s*<figure[^>]*>\\s*<img[^>]*src=["']${escapedUrl}["'][^>]*>[^<]*<\\/figure>\\s*`, "i"),
      ""
    );
    
    // If no figure, remove ONLY the first img tag at the start with this URL
    if (html !== removeFirstImageTag(html, escapedUrl)) {
      html = removeFirstImageTag(html, escapedUrl);
    }
  }

  // Also remove any img/figure tags at the very beginning of content (before first real paragraph)
  html = html.replace(/^\s*<figure[^>]*>\s*<img[^>]*>\s*<\/figure>\s*/i, "");
  html = html.replace(/^\s*<img[^>]*(src=["'][^"']*["'])[^>]*>\s*/i, "");
  
  return html;
}

/**
 * Helper: Remove only the FIRST img tag with matching URL.
 */
function removeFirstImageTag(html: string, escapedUrl: string): string {
  return html.replace(
    new RegExp(`^\\s*<img[^>]*src=["']${escapedUrl}["'][^>]*>\\s*`, "i"),
    ""
  );
}
