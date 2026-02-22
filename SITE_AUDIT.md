# Her Beauty Hacks – Site & Pages Audit

**Audit date:** February 2026  
**Stack:** Next.js 15, React Query (TanStack Query), Tailwind CSS 4, headless WordPress (REST API)

---

## 1. Site structure & routes

| Route | Type | Data source | Notes |
|-------|------|-------------|--------|
| `/` | Static + WP | Categories, featured posts, author | Home with Hero, TopicCards, FeaturedPosts, CategoriesAndSections, MeetAuthor |
| `/blog` | Static + WP | Posts (all or by category filter) | List with filters; `revalidate = 60` |
| `/blog/[slug]` | Dynamic | `getPostBySlug(slug)` | Post detail; server data + no client refetch when `initialPost` provided |
| `/category/[slug]` | Dynamic | Categories + posts by category | Archive; `notFound()` if category missing |
| `/about` | Static + WP | Page slug `about` + author | WpPageContent + AboutContent (author card) |
| `/contact` | Static + WP | Page slug `contact` | WpPageContent only |
| `/shop` | Static + WP | Page slug `shop` | WpPageContent; empty state “Coming soon” |
| `/privacy` | Static + WP | Page slug `privacy-policy` | WpPageContent only |
| **404** | Static | — | Custom `app/not-found.tsx` (Back to Home) |

- **Layout:** Single root `app/layout.tsx` (fonts, metadata, GA, TopBar, Header, CategoriesBar, main, Footer).
- **No `generateStaticParams`:** All dynamic routes use ISR (`revalidate = 60`); generation is on-demand.

---

## 2. Page-by-page summary

### 2.1 Home (`/`)
- **Metadata:** Canonical + OG url only (title/description from layout default).
- **Content:** HomeSections (Hero, TopicCards, FeaturedPosts, CategoriesAndSections, MeetAuthor). Empty state if no categories/posts/author with “View Blog” CTA.
- **Data:** useCategories, useFeaturedPosts, usePostsForMultipleCategories, useAuthor. All client hooks; no server pre-fetch for home sections.

### 2.2 Blog listing (`/blog`)
- **Metadata:** Title “Blog | Her Beauty Hacks”, description, canonical, OG.
- **Content:** H1 “Blog”, PostList (category filter buttons + PostCard grid). Suspense with PostListFallback (skeletons).
- **Data:** usePosts (optional category from searchParams). Client-only.

### 2.3 Blog post (`/blog/[slug]`)
- **Metadata:** generateMetadata from getPostBySlug; title, description, canonical, OG article + image.
- **SEO:** ArticleJsonLd (title, description, slug, dates, author, image).
- **Content:** BlogPostView (breadcrumb, title, byline, excerpt/lead, featured image, PostContent body, author/category, ShareButtons). Featured image = plain `<img>` (no Next Image). Body via RichText (sanitize, force HTTPS for img src/srcset, decode entities).
- **Data:** Server: getPostBySlug (body processed: sanitize + forceHttps). Client: usePost(slug, initialPost) with staleTime Infinity when initialPost set → no refetch.

### 2.4 Category archive (`/category/[slug]`)
- **Metadata:** generateMetadata from getCategoryBySlug; title, description (strip + decode), canonical, OG.
- **Content:** CategoryArchive: “Back to Blog”, H1 (category title), description (strip + decode), PostCard grid or “No posts” / skeletons.
- **Data:** useCategories (resolve category by slug), usePostsByCategory(category.id). notFound() if category not found.

### 2.5 About (`/about`)
- **Metadata:** generateMetadata from getPageBySlug("about"); title, description, canonical, OG.
- **Content:** WpPageContent(slug="about") + AboutContent (author card from useAuthor). Empty state: H1 + “Meet the author below”.

### 2.6 Contact (`/contact`)
- **Metadata:** generateMetadata from getPageBySlug("contact"); title, description, canonical, OG.
- **Content:** WpPageContent(slug="contact"). Empty state: message about adding Contact page in WP.

### 2.7 Shop (`/shop`)
- **Metadata:** generateMetadata from getPageBySlug("shop"); title, description, canonical, OG.
- **Content:** WpPageContent(slug="shop"). Empty state: “Shop is coming soon” + “Explore Blog” button.

### 2.8 Privacy (`/privacy`)
- **Metadata:** generateMetadata from getPageBySlug("privacy-policy"); title, description, canonical, OG.
- **Content:** WpPageContent(slug="privacy-policy"). Empty state: H1 + message to add policy in WP.

### 2.9 404
- **Content:** app/not-found.tsx – “404”, short message, “Back to Home” button.

---

## 3. WordPress mapping & content handling

- **Posts:** lib/wp/map.ts – title and excerpt decoded + stripped; body from API, processed in getPostBySlug (sanitize + forceHttpsForImgSrc) then in RichText (decode, sanitize, forceHttps).
- **Pages:** lib/wp/pages.ts – title and excerpt strip + decodeHtmlEntities; content raw HTML → WpPageContent → RichText.
- **Nav:** lib/wp/nav.ts – labels strip + decodeHtmlEntities so “&amp;” etc. display correctly.
- **Categories:** useCategories – description raw; category archive metadata and CategoryArchive description use strip + decode for safe text.

---

## 4. SEO & technical

- **Canonical & OG:** Every page has canonical and Open Graph (title, description, url; article + image for blog post).
- **Robots:** app/robots.ts – allow “/”, disallow “/api/”, sitemap URL from getSiteUrl().
- **Sitemap:** app/sitemap.ts – static routes (home, blog, about, contact, shop, privacy) + WP posts (500), categories (100), selected pages (about, contact, shop, privacy-policy). Deduped by URL. Revalidate 3600.
- **JSON-LD:** OrganizationWebSiteJsonLd in layout; ArticleJsonLd on blog post page.
- **GA:** Google tag (gtag) in layout; measurement ID from env or default G-YZLH5CBG9E. Custom events: share, open_lightbox, click_category.

---

## 5. Consistency & UX

- **Containers:** container-narrow (blog, post) vs container-wide (home sections, category, about, contact, shop, privacy).
- **Backgrounds:** bg-muted/10 or bg-muted/20 on main content areas.
- **Loading:** Skeletons for PostList, CategoryArchive, WpPageContent, BlogPostView, AboutContent, home sections.
- **Errors / empty:** notFound for missing post/category; WpPageContent and About show emptyMessage when no WP data.
- **Navigation:** Header (desktop + MobileNav) and Footer use nav links (WP or default). CategoriesBar from useCategories. All key links present (Home, Blog, About, Shop, Contact, Privacy).

---

## 6. Fixes applied during audit

1. **Nav link labels** – Decode HTML entities in lib/wp/nav.ts so labels like “Privacy &amp; Policy” render as “Privacy & Policy”.
2. **Category description** – Decode + strip in category page generateMetadata and in CategoryArchive display so entities and tags don’t show raw.
3. **404 page** – Added app/not-found.tsx with 404 message and “Back to Home” link.

---

## 7. Recommendations (optional)

- **generateStaticParams:** Add for `/blog/[slug]` and `/category/[slug]` (e.g. from WP) if you want pre-built paths at build time; current ISR is fine for on-demand.
- **Home data:** Consider server-fetching categories or featured posts for home for faster first paint and SEO.
- **WpPageContent:** All WP pages (about, contact, shop, privacy) are client-fetched via usePage. Optionally pass server-fetched page as initialData to avoid client fetch when possible.
- **Category description HTML:** Currently shown as plain text (strip + decode). If you need links or formatting, render with RichText and keep sanitization.

---

## 8. File reference

| Area | Files |
|------|--------|
| Routes | app/page.tsx, app/blog/page.tsx, app/blog/[slug]/page.tsx, app/category/[slug]/page.tsx, app/about/page.tsx, app/contact/page.tsx, app/shop/page.tsx, app/privacy/page.tsx, app/not-found.tsx |
| Layout | app/layout.tsx |
| SEO / config | app/sitemap.ts, app/robots.ts, next.config.ts |
| WP data | lib/wp/client.ts, lib/wp/post.ts, lib/wp/pages.ts, lib/wp/map.ts, lib/wp/nav.ts, lib/wp/types.ts |
| Content / HTML | lib/html.ts (decode, sanitize, forceHttps, rewriteWpContent*) |
| Key components | components/blog/BlogPostView.tsx, PostContent, RichText, PostList, PostCard, CategoryArchive; components/pages/WpPageContent, AboutContent; components/home/HomeSections, Hero, TopicCards, FeaturedPosts, CategoriesAndSections, MeetAuthor; components/layout/Header, Footer, CategoriesBar, TopBar, MobileNav |

This audit reflects the codebase after the applied fixes (nav, category description, 404).
