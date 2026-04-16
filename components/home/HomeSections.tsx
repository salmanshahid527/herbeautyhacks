"use client";

import { useCategories } from "@/hooks/useCategories";
import { useFeaturedPosts } from "@/hooks/useFeaturedPosts";
import { usePostsForMultipleCategories } from "@/hooks/usePosts";
import { Hero } from "./Hero";
import { TopicCards } from "./TopicCards";
import { FeaturedPosts } from "./FeaturedPosts";
import { CategoriesAndSections } from "./CategoriesAndSections";
import {
  TopicCardsSkeleton,
  FeaturedPostsSkeleton,
  CategorySectionSkeleton,
} from "@/components/skeletons/HomeSkeletons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Category } from "@/hooks/useCategories";
import type { Post } from "@/hooks/usePosts";

const POSTS_PER_CATEGORY = 4;

export interface HomeSectionsInitialData {
  categories?: Category[];
  featuredPosts?: Post[];
  postsByCategoryId?: Record<number, Post[]>;
}

interface HomeSectionsProps {
  initialData?: HomeSectionsInitialData | null;
}

export function HomeSections({ initialData }: HomeSectionsProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories(
    initialData?.categories
  );
  const categoryIds = categories.map((c) => c.id);
  const { data: postsByCategoryId = {}, isLoading: categoryPostsLoading } =
    usePostsForMultipleCategories(
      categoryIds,
      POSTS_PER_CATEGORY,
      initialData?.postsByCategoryId
    );
  const { data: posts = [], isLoading: postsLoading } = useFeaturedPosts(
    initialData?.featuredPosts
  );

  const hasCategories = categories.length > 0;
  const hasPosts = posts.length > 0;
  const isLoading =
    categoriesLoading || postsLoading || (hasCategories && categoryPostsLoading);

  const hasAnyContent = hasCategories || hasPosts;

  return (
    <>
      <Hero />
      {isLoading ? (
        <>
          <TopicCardsSkeleton />
          <FeaturedPostsSkeleton />
          <CategorySectionSkeleton />
        </>
      ) : !hasAnyContent ? (
        <section className="section-spacing w-full bg-muted/30 border-y border-border/60">
          <div className="container max-w-xl px-3 sm:px-4 mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              No posts or categories yet. Add content in your WordPress dashboard to see it here.
            </p>
            <Button asChild variant="outline">
              <Link href="/blog">View Blog</Link>
            </Button>
          </div>
        </section>
      ) : (
        <>
          {hasCategories && <TopicCards postsByCategoryId={postsByCategoryId} />}
          {hasPosts && <FeaturedPosts />}
          {hasCategories && <CategoriesAndSections postsByCategoryId={postsByCategoryId} />}
        </>
      )}
    </>
  );
}
