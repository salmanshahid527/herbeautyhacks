"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "@/components/skeletons/PostCardSkeleton";
import type { Post } from "@/hooks/usePosts";
import type { Category } from "@/hooks/useCategories";

/** Lazy-loaded to reduce initial JS and TBT on mobile; category filter is below the fold. */
const BlogCategoryFilter = dynamic(
  () => import("./BlogCategoryFilter").then((m) => ({ default: m.BlogCategoryFilter })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-wrap gap-2 min-h-8 w-full" aria-hidden>
        <span className="inline-block h-8 w-12 rounded-lg bg-muted animate-pulse" />
        <span className="inline-block h-8 w-20 rounded-lg bg-muted animate-pulse" />
        <span className="inline-block h-8 w-16 rounded-lg bg-muted animate-pulse" />
      </div>
    ),
  }
);

interface PostListProps {
  initialPosts?: Post[];
  initialCategories?: Category[];
}

export function PostList({ initialPosts, initialCategories }: PostListProps = {}) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? undefined;
  const categoryId =
    categorySlug && initialCategories?.length
      ? initialCategories.find((c) => c.slug === categorySlug)?.id
      : undefined;
  const { data: posts = [], isLoading, isError } = usePosts({
    categorySlug: categoryId ? undefined : categorySlug,
    categoryId,
    initialData: categorySlug == null && categoryId == null ? initialPosts : undefined,
  });

  return (
    <div className="space-y-8">
      <BlogCategoryFilter initialCategories={initialCategories} />
      {isLoading ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <p className="py-12 text-center text-muted-foreground">
          Something went wrong loading posts.
        </p>
      ) : posts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts yet.</p>
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
