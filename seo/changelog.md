# Change log: herbeautyhacks.com

`| date | url | change | finding | baseline clicks/impr/ctr/pos (28d) | review on | result |`

Baseline for site-wide code changes = whole site, GSC 2026-08-30–2026-09-26 (27 days): 2 / 2,511 / 0.08% / 53.9. None of these changes touch page copy, titles or dates, so effects are technical (reliability, crawl signals). Reviews use the sitemap-URL and 404 checks plus GSC totals, and no result is judged while the Sept 2026 spam update is rolling out.

| date | url | change | finding | baseline clicks/impr/ctr/pos (28d) | review on | result |
|---|---|---|---|---|---|---|
| 2026-09-29 | site-wide (lib/wp/*, app/sitemap.ts) | WordPress client retries 5xx with backoff and throws after retries instead of returning null/[]; sitemap no longer publishes a truncated copy on a WP outage | herbeautyhacks-technical-1, herbeautyhacks-technical-10 | 2/2511/0.08%/53.9 | 2026-10-27 | pending |
| 2026-09-29 | 11 posts + /contact | Body `<h1>` demoted to `<h2>` (no text or visual change) | herbeautyhacks-onpage-3 | 2/2511/0.08%/53.9 | 2026-10-27 | pending |
| 2026-09-29 | /sitemap.xml | Removed fake `lastmod` on static and category routes; listed /disclaimer and /terms-conditions | herbeautyhacks-technical-9 | 2/2511/0.08%/53.9 | 2026-10-27 | pending |
| 2026-09-29 | all posts (Article JSON-LD) | datePublished/dateModified now carry a UTC `Z` offset (same instants; no dateModified bump) | herbeautyhacks-schema-8 | 2/2511/0.08%/53.9 | 2026-10-27 | pending |
| 2026-09-29 | /contact, /privacy, /about (page meta) | Meta description truncated to about 155 chars at a word boundary | herbeautyhacks-onpage-7 | 2/2511/0.08%/53.9 | 2026-10-27 | pending |
