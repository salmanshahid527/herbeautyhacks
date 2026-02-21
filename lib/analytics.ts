/**
 * GA4 custom events. Safe to call on server (no-op); gtag is only available in the browser.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event",
      name: string,
      params?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** User clicked a share button (X, Facebook, LinkedIn, WhatsApp) or copy link. */
export function trackShare(method: string): void {
  trackEvent("share", { method });
}

/** User opened the image lightbox (featured or in-article image). */
export function trackOpenLightbox(context?: "featured" | "article"): void {
  trackEvent("open_lightbox", context ? { context } : undefined);
}

/** User clicked a category link. */
export function trackCategoryClick(slug: string, title?: string): void {
  trackEvent("click_category", { category_slug: slug, ...(title && { category_title: title }) });
}
