import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { PostCard } from "@/components/blog/PostCard";
import { decodeHtmlEntities } from "@/lib/html";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getCategories, getCategoryBySlug } from "@/lib/wp/categories";
import { getPostsForCategoryBySlug } from "@/lib/wp/post";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/category/${slug}`;
  const title = category?.title ?? "Category";
  const description =
    (category?.description && decodeHtmlEntities(category.description.replace(/<[^>]*>/g, " ").trim())) ||
    `Posts in ${category?.title ?? "this category"}.`;
  const posts = category ? await getPostsForCategoryBySlug(slug) : [];
  const firstImage = posts[0]?.featuredImage;
  const imageUrl =
    firstImage?.startsWith("http") === true
      ? firstImage
      : firstImage
        ? `${siteUrl}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`
        : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: category?.title ?? "Category",
      description,
      url,
      type: "website",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: category?.title ?? "Category" }]
        : [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: category?.title ?? "Category",
      description,
    },
    ...(firstImage && {
      links: [{ rel: "preload", as: "image", href: firstImage }],
    }),
  };
}

function formatCategoryDescription(html: string | undefined): string {
  if (!html?.trim()) return "";
  const stripped = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return decodeHtmlEntities(stripped);
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsForCategoryBySlug(slug),
  ]);

  if (!category) notFound();

  return (
    <div className="container container-wide px-3 sm:px-4 md:px-6 py-8 sm:py-10 mx-auto w-full min-h-[50vh] bg-muted/10">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/blog" className="inline-flex items-center gap-1">
          <ChevronLeft className="size-4" />
          Back to Blog
        </Link>
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{category.title}</h1>
      {category.description && (
        <p className="text-muted-foreground mb-8">
          {formatCategoryDescription(category.description)}
        </p>
      )}
      {posts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} priority={index < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
