"use client";

import { useCategories } from "@/hooks/useCategories";
import { useFeaturedPosts } from "@/hooks/useFeaturedPosts";
import { usePostsForMultipleCategories } from "@/hooks/usePosts";
import { useAuthor } from "@/hooks/useAuthor";
import { Hero } from "./Hero";
import { TopicCards } from "./TopicCards";
import { FeaturedPosts } from "./FeaturedPosts";
import { CategoriesAndSections } from "./CategoriesAndSections";
import { MeetAuthor } from "./MeetAuthor";
import {
  TopicCardsSkeleton,
  FeaturedPostsSkeleton,
  CategorySectionSkeleton,
  MeetAuthorSkeleton,
} from "@/components/skeletons/HomeSkeletons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const POSTS_PER_CATEGORY = 4;

export function HomeSections() {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const categoryIds = categories.map((c) => c.id);
  const { data: postsByCategoryId = {}, isLoading: categoryPostsLoading } = usePostsForMultipleCategories(
    categoryIds,
    POSTS_PER_CATEGORY
  );
  const { data: posts = [], isLoading: postsLoading } = useFeaturedPosts();
  const { data: author, isLoading: authorLoading } = useAuthor();

  const hasCategories = categories.length > 0;
  const hasPosts = posts.length > 0;
  const hasAuthor = !!author;
  const isLoading = categoriesLoading || postsLoading || authorLoading || (hasCategories && categoryPostsLoading);

  const hasAnyContent = hasCategories || hasPosts || hasAuthor;

  return (
    <>
      <Hero />
      {isLoading ? (
        <>
          <TopicCardsSkeleton />
          <FeaturedPostsSkeleton />
          <CategorySectionSkeleton />
          <MeetAuthorSkeleton />
        </>
      ) : !hasAnyContent ? (
        <section className="section-spacing w-full bg-muted/30 border-y border-border/60">
          <div className="container max-w-xl px-4 mx-auto text-center">
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
          {hasAuthor && <MeetAuthor />}
        </>
      )}
    </>
  );
}
