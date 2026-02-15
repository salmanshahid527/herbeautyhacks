"use client";

import { useCategories } from "@/hooks/useCategories";
import { useFeaturedPosts } from "@/hooks/useFeaturedPosts";
import { useAuthor } from "@/hooks/useAuthor";
import { Hero } from "./Hero";
import { TopicCards } from "./TopicCards";
import { FeaturedPosts } from "./FeaturedPosts";
import { CategoriesAndSections } from "./CategoriesAndSections";
import { MeetAuthor } from "./MeetAuthor";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeSections() {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: posts = [], isLoading: postsLoading } = useFeaturedPosts();
  const { data: author, isLoading: authorLoading } = useAuthor();

  const hasCategories = categories.length > 0;
  const hasPosts = posts.length > 0;
  const hasAuthor = !!author;
  const isLoading = categoriesLoading || postsLoading || authorLoading;

  const hasAnyContent = hasCategories || hasPosts || hasAuthor;

  return (
    <>
      <Hero />
      {isLoading ? (
        <section className="section-spacing w-full bg-muted/20">
          <div className="container container-wide px-4 mx-auto flex justify-center">
            <div className="flex gap-2">
              <span className="size-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
              <span className="size-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
              <span className="size-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </section>
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
          {hasCategories && <TopicCards />}
          {hasPosts && <FeaturedPosts />}
          {hasCategories && <CategoriesAndSections />}
          {hasAuthor && <MeetAuthor />}
        </>
      )}
    </>
  );
}
