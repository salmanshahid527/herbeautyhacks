"use client";

import { useCategories } from "@/hooks/useCategories";
import type { Post } from "@/hooks/usePosts";
import { CategorySection } from "./CategorySection";

const sectionTitles: Record<string, string> = {
  fashion: "Fashion Fixes",
  nails: "Mani Moments",
  haircare: "Hair Happenings",
  food: "Steal these recipes",
  "self-care": "Self-Love Lab",
  skincare: "Skin Secrets",
  holidays: "Holiday Highlights",
};

export function CategoriesAndSections({
  postsByCategoryId = {},
}: {
  postsByCategoryId?: Record<number, Post[]>;
}) {
  const { data: categories = [] } = useCategories();

  return (
    <>
      {categories.map((category, index) => (
        <CategorySection
          key={category._id}
          category={category}
          sectionTitle={sectionTitles[category.slug] ?? category.title}
          limit={4}
          variant={index % 2 === 0 ? "default" : "alt"}
          initialPosts={postsByCategoryId[category.id]}
        />
      ))}
    </>
  );
}
