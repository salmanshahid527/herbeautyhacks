import { Suspense } from "react";
import { PostList } from "@/components/blog/PostList";
import { PostCardSkeleton } from "@/components/skeletons/PostCardSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Her Beauty Hacks",
  description: "Beauty, fashion, skincare, and lifestyle articles.",
};

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

export default function BlogPage() {
  return (
    <div className="container container-narrow px-4 py-12 md:py-16 mx-auto w-full min-h-[50vh] bg-muted/10">
      <h1 className="section-title text-3xl md:text-4xl font-bold mb-12 text-foreground">Blog</h1>
      <Suspense fallback={<PostListFallback />}>
        <PostList />
      </Suspense>
    </div>
  );
}
