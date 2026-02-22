import { CategoryArchive } from "@/components/blog/CategoryArchive";
import { decodeHtmlEntities } from "@/lib/html";
import { getSiteUrl } from "@/lib/seo";
import { getCategories, getCategoryBySlug } from "@/lib/wp/categories";
import { getPostsForCategoryBySlug } from "@/lib/wp/post";
import type { Metadata } from "next";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/category/${slug}`;
  const title = category
    ? `${category.title} | Her Beauty Hacks`
    : "Category | Her Beauty Hacks";
  const description =
    (category?.description && decodeHtmlEntities(category.description.replace(/<[^>]*>/g, " ").trim())) ||
    `Posts in ${category?.title ?? "this category"}.`;
  const posts = category ? await getPostsForCategoryBySlug(slug) : [];
  const firstImage = posts[0]?.featuredImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: category?.title ?? "Category",
      description,
      url,
      type: "website",
    },
    ...(firstImage && {
      links: [{ rel: "preload", as: "image", href: firstImage }],
    }),
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, initialPosts, initialCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsForCategoryBySlug(slug),
    getCategories(),
  ]);
  return (
    <CategoryArchive
      slug={slug}
      initialCategory={category}
      initialPosts={initialPosts}
      initialCategories={initialCategories}
    />
  );
}
