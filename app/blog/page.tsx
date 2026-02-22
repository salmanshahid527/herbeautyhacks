import { Suspense } from "react";
import { PostList } from "@/components/blog/PostList";
import { PostCardSkeleton } from "@/components/skeletons/PostCardSkeleton";
import { getSiteUrl } from "@/lib/seo";
import { getPostsForBlog } from "@/lib/wp/post";
import { getCategories } from "@/lib/wp/categories";
import type { Metadata } from "next";

const blogUrl = `${getSiteUrl()}/blog`;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPostsForBlog();
  const firstImage = posts[0]?.featuredImage;
  return {
    title: "Blog | Her Beauty Hacks",
    description: "Beauty, fashion, skincare, and lifestyle articles.",
    alternates: { canonical: blogUrl },
    openGraph: {
      title: "Blog | Her Beauty Hacks",
      description: "Beauty, fashion, skincare, and lifestyle articles.",
      url: blogUrl,
      type: "website",
    },
    ...(firstImage && {
      links: [{ rel: "preload", as: "image", href: firstImage }],
    }),
  };
}

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

function PostListFallback() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function BlogPage() {
  const [initialPosts, initialCategories] = await Promise.all([
    getPostsForBlog(),
    getCategories(),
  ]);
  return (
    <div className="container container-narrow px-4 py-12 md:py-16 mx-auto w-full min-h-[50vh] bg-muted/10">
      <h1 className="section-title text-3xl md:text-4xl font-bold mb-12 text-foreground">Blog</h1>
      <Suspense fallback={<PostListFallback />}>
        <PostList initialPosts={initialPosts} initialCategories={initialCategories} />
      </Suspense>
    </div>
  );
}
