import { Hero } from "./Hero";
import { TopicCards } from "./TopicCards";
import { FeaturedPosts } from "./FeaturedPosts";
import { CategoriesAndSections } from "./CategoriesAndSections";
import type { Category } from "@/hooks/useCategories";
import type { Post } from "@/hooks/usePosts";

export interface HomeSectionsInitialData {
  categories: Category[];
  featuredPosts: Post[];
  postsByCategoryId: Record<number, Post[]>;
}

interface HomeSectionsProps {
  initialData: HomeSectionsInitialData;
}

/** Server-rendered home sections so crawlers get categories and posts in the first HTML response. */
export function HomeSections({ initialData }: HomeSectionsProps) {
  const { categories, featuredPosts, postsByCategoryId } = initialData;

  return (
    <>
      <Hero />
      {categories.length > 0 && (
        <TopicCards categories={categories} postsByCategoryId={postsByCategoryId} />
      )}
      {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}
      {categories.length > 0 && (
        <CategoriesAndSections categories={categories} postsByCategoryId={postsByCategoryId} />
      )}
    </>
  );
}
