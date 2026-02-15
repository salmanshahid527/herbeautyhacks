# Performance Review & Optimizations

## API usage overview

### Shared data (no duplication)

React Query deduplicates by `queryKey`. These are used in multiple components but result in **one request each**:

| Data            | Query key        | Used in                                                                 |
|-----------------|------------------|-------------------------------------------------------------------------|
| Categories      | `["categories"]` | Header, CategoriesBar, HomeSections, CategoriesAndSections, PostList, Footer |
| Author          | `["author"]`     | TopBar, MeetAuthor, AboutContent, Footer                              |
| Site settings   | `["siteSettings"]` | TopBar, Header, Footer                                               |
| Featured posts  | `["featuredPosts"]` | HomeSections, FeaturedPosts                                          |

### Per-page / per-entity (expected)

| Data              | When                    | Notes                    |
|-------------------|-------------------------|--------------------------|
| Posts (blog list) | Blog page               | `["posts", categorySlug]`|
| Single post       | Blog post page          | `["post", slug]`         |
| Category + posts  | Category archive page   | `["category", slug]` + `["posts", "category", slug, 50]` |
| Page (WP)         | About / Contact / Shop  | `["page", slug]`         |
| Search            | When user types (debounced) | `["search", query]`  |

### Optimizations applied

1. **Category ID instead of slug for posts**
   - **Before:** `usePostsByCategory(category.slug, limit)` triggered an extra `/categories?slug=X` request to resolve ID, then `/posts?categories=id`. So for TopicCards (6 tiles) + CategorySection (N sections) we did **6 + N extra category lookups**.
   - **After:** When we already have the category list, we use `category.id` and call `usePostsByCategory(category.id, limit)`, which hits only `/posts?categories=id&per_page=limit`. No duplicate category lookups on the home page.

2. **Featured posts payload**
   - **Before:** `per_page: 12` while the UI shows 6.
   - **After:** `per_page: 6` to match the UI and reduce response size.

3. **React Query defaults**
   - `staleTime: 2 * 60 * 1000` (2 min) so refetch on window focus or remount is skipped while data is still fresh.
   - `gcTime: 10 * 60 * 1000` (10 min) so cached data is kept for back navigation and reuse.

4. **ISR**
   - `revalidate = 60` on relevant pages and `next: { revalidate: 60 }` in `fetchWp` for server-side caching where applicable.

## Remaining request counts (typical)

- **Home:** 1 (categories) + 1 (featured posts) + 1 (author) + 1 (site settings) + 6 (topic cards: one `/posts` per category) + N (category sections: one `/posts` per category). No duplicate `/categories` calls.
- **Blog:** 1 (posts) + 1 (categories).
- **Category archive:** 1 (category by slug) + 1 (posts by slug; one slug lookup then posts).
- **Single post:** 1 (post by slug).

## Other factors

- **Images:** Placeholder used when missing; `SafeImage` handles errors. Consider `priority` only for above-the-fold hero/logo; rest can lazy load (default).
- **Bundle:** Heavy client trees (e.g. home) are mostly data-driven; consider dynamic import for below-the-fold sections if needed.
- **No N+1 on categories:** Category list is fetched once; posts-by-category use category ID when available.
