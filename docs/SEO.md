# SEO & Google Search Console (GSC) setup

This doc describes what’s in place for crawlability, SEO, and GSC.

## Site URL

Set the canonical base URL in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://herbeautyhacks.com
```

No trailing slash. Used in sitemap, `robots.txt`, canonical URLs, and Open Graph.

---

## Sitemap (`/sitemap.xml`)

- **Revalidate:** 1 hour (`revalidate = 3600`).
- **URLs are deduplicated** so the same path never appears twice (static + WP pages).
- **Static routes:** `/`, `/blog`, `/about`, `/contact`, `/shop`, `/privacy`.
- **From WordPress:**
  - **Posts** → `/blog/{slug}` (up to 500), `lastModified` from post date, `changeFrequency: weekly`, `priority: 0.8`.
  - **Categories** → `/category/{slug}` (up to 100), `changeFrequency: daily`, `priority: 0.7`.
  - **Pages** (about, contact, shop, privacy-policy, privacy) → mapped to app paths (e.g. `privacy-policy` → `/privacy`), `changeFrequency: monthly`, `priority: 0.6`.

All important pages are included; new posts/categories appear in the sitemap after the next revalidate.

---

## All pages – metadata & canonical

| Page | Route | Title | Description | Canonical | Open Graph |
|------|--------|-------|-------------|-----------|------------|
| Home | `/` | From layout | From layout | ✅ `alternates.canonical` | ✅ `url`, `type: website` |
| Blog | `/blog` | Blog \| Her Beauty Hacks | From metadata | ✅ | ✅ `url`, `type: website` |
| Blog post | `/blog/[slug]` | From WP post | From WP excerpt | ✅ | ✅ `url`, `type: article`, `images` (featured) |
| Category | `/category/[slug]` | Category name \| Her Beauty Hacks | From WP category description | ✅ | ✅ `url`, `type: website` |
| About | `/about` | From WP or fallback | From WP excerpt | ✅ | ✅ |
| Contact | `/contact` | From WP or fallback | From WP excerpt | ✅ | ✅ |
| Shop | `/shop` | From WP or fallback | From WP excerpt | ✅ | ✅ |
| Privacy | `/privacy` | From WP or fallback | From WP excerpt | ✅ | ✅ |

- **Blog posts** use the post’s featured image for `openGraph.images` when available (absolute URL from WP or built from `NEXT_PUBLIC_SITE_URL`).

---

## Crawling

- **`/robots.txt`** – Allows `/`, disallows `/api/`, declares `sitemap: <siteUrl>/sitemap.xml`.
- **Root layout** – `robots: { index: true, follow: true }` and same for `googleBot`.

---

## Structured data (JSON-LD)

- **All pages** – Organization + WebSite (with SearchAction for `/blog?q=`) in root layout.
- **Blog post pages** – Article (headline, description, url, datePublished, dateModified, author, image, publisher).

---

## Google Search Console (GSC) checklist

1. **Verify property**  
   Add property (domain or URL prefix) and verify via DNS, HTML file, or meta tag.

2. **Submit sitemap**  
   - **Sitemaps** → Add `https://<your-domain>/sitemap.xml`.  
   - Sitemap is also declared in `robots.txt`, so crawlers can discover it.

3. **Confirm URLs are indexable**  
   - **URL Inspection** – Check a few URLs (home, a post, a category).  
   - Ensure no “Indexing allowed” / “Page fetch” errors.  
   - Canonical and meta robots should allow indexing.

4. **Validate structured data**  
   - Use [Rich Results Test](https://search.google.com/test/rich-results) for the home page (WebSite) and a blog post (Article).  
   - Fix any reported errors.

5. **Monitor**  
   - **Coverage** – Indexed vs excluded.  
   - **Enhancements** – Core Web Vitals, mobile usability, etc.  
   - **Sitemaps** – Discovered vs submitted; fix errors if any.

6. **After content changes**  
   - Sitemap revalidates hourly; new/changed posts and categories appear automatically.  
   - Optionally use **URL Inspection** → “Request indexing” for critical new pages.

---

## Submitting sitemap (recap)

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Select your property.
3. **Sitemaps** → Enter `sitemap.xml` (or full URL) → **Submit**.

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add site and verify.
3. **Sitemaps** → Submit `https://<your-domain>/sitemap.xml`.

---

## Notes

- Every key page has a **canonical** and **Open Graph** URL so GSC and social crawlers see a single preferred URL.
- **Sitemap** includes all public routes; duplicates are removed so each URL is listed once.
- **Blog post** metadata (title, description, featured image) comes from WordPress and is pre-rendered for crawlers.
