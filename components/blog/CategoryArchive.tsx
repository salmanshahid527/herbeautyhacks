"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useCategory } from "@/hooks/useCategories";
import { usePostsByCategory } from "@/hooks/usePosts";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface CategoryArchiveProps {
  slug: string;
}

export function CategoryArchive({ slug }: CategoryArchiveProps) {
  const { data: category, isLoading: catLoading } = useCategory(slug);
  const { data: posts = [], isLoading: postsLoading } = usePostsByCategory(slug, 50);

  if (catLoading) {
    return (
      <div className="container container-wide px-4 py-10 mx-auto w-full min-h-[50vh] bg-muted/10">
        <div className="h-8 w-32 bg-muted rounded animate-pulse mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }
  if (!category) notFound();

  return (
    <div className="container container-wide px-4 py-10 mx-auto w-full min-h-[50vh] bg-muted/10">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/blog" className="inline-flex items-center gap-1">
          <ChevronLeft className="size-4" />
          Back to Blog
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
      {category.description && (
        <p className="text-muted-foreground mb-8">{category.description}</p>
      )}
      {postsLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts in this category yet.</p>
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
