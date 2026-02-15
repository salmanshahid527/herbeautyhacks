"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import { usePostsByCategory } from "@/hooks/usePosts";
import { SafeImage } from "@/components/ui/safe-image";
import type { Category } from "@/hooks/useCategories";

function CategoryTile({ category, index }: { category: Category; index: number }) {
  const { data: posts = [] } = usePostsByCategory(category.slug, 1);
  const imageUrl = posts[0]?.featuredImage;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in opacity-0"
      style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
    >
      <SafeImage
        src={imageUrl ?? "/placeholder.svg"}
        alt=""
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />
      <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
      <span className="absolute inset-x-0 bottom-0 p-3 text-center text-sm font-semibold text-white drop-shadow-md">
        {category.title}
      </span>
    </Link>
  );
}

export function TopicCards() {
  const { data: categories = [] } = useCategories();
  const displayCategories = categories.slice(0, 6);

  if (displayCategories.length === 0) return null;

  return (
    <section className="section-spacing w-full bg-muted/20">
      <div className="container container-wide px-4 mx-auto">
        <h2 className="section-title section-title-center text-2xl md:text-3xl font-bold text-center mb-10 text-foreground animate-fade-in-up">
          What&apos;s in Store?
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {displayCategories.map((cat, index) => (
            <CategoryTile key={cat._id} category={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
