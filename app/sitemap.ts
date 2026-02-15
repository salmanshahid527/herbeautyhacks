import type { MetadataRoute } from "next";
import { fetchWp } from "@/lib/wp/client";
import { getSiteUrl } from "@/lib/seo";

type WpPostStub = { slug: string; date: string };
type WpCategoryStub = { slug: string };
type WpPageStub = { slug: string; date: string };

export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  let posts: MetadataRoute.Sitemap = [];
  let categories: MetadataRoute.Sitemap = [];
  let pages: MetadataRoute.Sitemap = [];

  try {
    const [postsData, categoriesData, pagesData] = await Promise.all([
      fetchWp<WpPostStub[]>(`/posts`, { per_page: 500 }).catch(() => []),
      fetchWp<WpCategoryStub[]>(`/categories`, { per_page: 100 }).catch(() => []),
      fetchWp<WpPageStub[]>(`/pages`, { per_page: 50 }).catch(() => []),
    ]);

    const postList = Array.isArray(postsData) ? postsData : [];
    const categoryList = Array.isArray(categoriesData) ? categoriesData : [];
    const pageList = Array.isArray(pagesData) ? pagesData : [];

    posts = postList.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    categories = categoryList.map((c) => ({
      url: `${base}/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    pages = pageList
      .filter((p) => ["about", "contact", "shop"].includes(p.slug))
      .map((p) => ({
        url: `${base}/${p.slug}`,
        lastModified: p.date ? new Date(p.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    // If WP is down, return static routes only
  }

  return [...staticRoutes, ...posts, ...categories, ...pages];
}
