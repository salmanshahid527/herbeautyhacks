"use client";

import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { trackCategoryClick } from "@/lib/analytics";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "@/components/skeletons/PostCardSkeleton";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export function PostList() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? undefined;
  const { data: posts = [], isLoading, isError } = usePosts({ categorySlug });
  const { data: categories = [] } = useCategories();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Something went wrong loading posts.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button variant={!categorySlug ? "default" : "outline"} size="sm" asChild>
            <Link href="/blog" prefetch>All</Link>
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat._id}
              variant={categorySlug === cat.slug ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link
                href={`/blog?category=${cat.slug}`}
                prefetch
                onClick={() => trackCategoryClick(cat.slug, cat.title)}
              >
                {cat.title}
              </Link>
            </Button>
          ))}
        </div>
      )}
      {posts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
