"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { usePostsByCategory } from "@/hooks/usePosts";
import { decodeHtmlEntities } from "@/lib/html";
import { PostCard } from "./PostCard";
import { CategoryArchiveSkeleton } from "@/components/skeletons/CategoryArchiveSkeleton";
import { PostCardSkeleton } from "@/components/skeletons/PostCardSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import type { Category } from "@/hooks/useCategories";
import type { Post } from "@/hooks/usePosts";

function formatCategoryDescription(html: string | undefined): string {
  if (!html?.trim()) return "";
  const stripped = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return decodeHtmlEntities(stripped);
}

interface CategoryArchiveProps {
  slug: string;
  initialCategory?: Category | null;
  initialPosts?: Post[];
  initialCategories?: Category[];
}

export function CategoryArchive({
  slug,
  initialCategory,
  initialPosts,
  initialCategories,
}: CategoryArchiveProps) {
  const { data: categories = [] } = useCategories(initialCategories);
  const category = initialCategory ?? categories.find((c) => c.slug === slug) ?? null;
  const { data: posts = [], isLoading: postsLoading } = usePostsByCategory(
    category?.id ?? null,
    50,
    initialPosts
  );

  if (!category) {
    if (initialCategory === null) notFound();
    if (categories.length > 0) notFound();
    return <CategoryArchiveSkeleton />;
  }

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
      {postsLoading ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
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
