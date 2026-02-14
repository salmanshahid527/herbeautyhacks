# HerBeautyHacks Editorial Site

A standalone, modern editorial website for **HerBeautyHacks** (`herbeautyhacks.com`) built with:

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4**
- **TanStack React Query v5**

This project replicates the **feature set and information architecture** style of a contemporary beauty editorial destination while using only original branding/copy and placeholder-safe media.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local development server
- `npm run lint` - run ESLint
- `npm run build` - production build
- `npm run start` - run production server

## Route map

- `/` - Homepage (hero, topics, trending, editorial sections, author block, newsletter CTA)
- `/blogs` - Blog listing with search/filter/sort/pagination
- `/about` - About page
- `/contact` - Contact page with contact mutation form + newsletter form
- `/shop` - Product curation grid with search/filter/sort/pagination
- `/web-stories` - Web stories grid with search/filter/sort/pagination
- `/privacy-policy`
- `/affiliate-disclosure`
- `/disclosure-policy`
- `/cookie-policy`
- `/news` -> redirects to `/blogs`
- `/[...slug]` - Dynamic resolver for category hubs and article pages
- `not-found` - Global not-found UI

### Dynamic resolver behavior (`/[...slug]`)

- `/{categorySlug}` -> category hub page
- `/{categorySlug}/{postSlug}` -> article page
- `/{postSlug}` -> article page fallback (if unique slug match exists)

## Architecture

### 1) Centralized data layer

- `src/lib/types/content.ts` - typed domain interfaces
- `src/lib/data/content.ts` - seed/mock content
- `src/lib/api/content.ts` - typed API-like functions (pagination/search/filter/sort + mutations)

### 2) Generic query abstraction

- `src/lib/hooks/useApiQuery.ts` - generic query/mutation wrappers
- `src/lib/hooks/useContent.ts` - feature hooks:
  - `useHomePageData`
  - `usePosts`
  - `useResolvedPath`
  - `useShopItems`
  - `useWebStories`
  - `useContactMutation`
  - `useNewsletterMutation`
  - plus supporting hooks (`usePost`, `useRelatedPosts`, `useCategory`, `useCategories`, `useSiteConfig`)

### 3) Reusable site components

`src/components/site/*` contains reusable shell/layout primitives, cards, content sections, pagination, and forms:

- Site chrome: announcement bar, sticky header with topic dropdowns, footer, shell
- Content display: hero, post cards, topic cards, shop cards, web story cards, author block
- Interaction: contact form + newsletter form via React Query mutations
- Page clients: home/blogs/shop/web stories/contact/category/article/dynamic resolver

## Design and performance notes

- Mobile-first responsive layout
- `next/font` for typography and `next/image` for optimized media delivery
- Semantic headings, clear focus states, and accessible form labels
- React Query defaults configured centrally for caching/refetch behavior
- Client components limited to interactive areas; static/legal content remains lightweight
