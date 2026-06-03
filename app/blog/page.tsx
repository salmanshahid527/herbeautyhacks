import { BlogPostList } from "@/components/blog/BlogPostList";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getPostsForBlog, getPostsForCategoryBySlug } from "@/lib/wp/post";
import { getCategories } from "@/lib/wp/categories";
import type { Metadata } from "next";

const blogUrl = `${getSiteUrl()}/blog`;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPostsForBlog();
  const firstImage = posts[0]?.featuredImage;
  const siteUrl = getSiteUrl();
  const imageUrl =
    firstImage?.startsWith("http") === true
      ? firstImage
      : firstImage
        ? `${siteUrl}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`
        : undefined;
  return {
    title: "Blog",
    description: "Beauty, fashion, skincare, and lifestyle articles.",
    alternates: { canonical: blogUrl },
    openGraph: {
      title: "Blog",
      description: "Beauty, fashion, skincare, and lifestyle articles.",
      url: blogUrl,
      type: "website",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: "Her Beauty Hacks Blog" }]
        : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog",
      description: "Beauty, fashion, skincare, and lifestyle articles.",
    },
    ...(firstImage && {
      links: [{ rel: "preload", as: "image", href: firstImage }],
    }),
  };
}

export const revalidate = 3600;

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams;
  const categorySlug = sp.category?.trim() || undefined;
  const [initialCategories, posts] = await Promise.all([
    getCategories(),
    categorySlug ? getPostsForCategoryBySlug(categorySlug) : getPostsForBlog(),
  ]);

  return (
    <div className="container container-narrow px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 mx-auto w-full min-h-[50vh] bg-muted/10">
      <h1 className="section-title text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-foreground">
        Blog
      </h1>
      <BlogPostList posts={posts} categories={initialCategories} categorySlug={categorySlug} />
    </div>
  );
}
