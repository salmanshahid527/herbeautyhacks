"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { trackCategoryClick } from "@/lib/analytics";
import { usePostsByCategory } from "@/hooks/usePosts";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/hooks/useCategories";
import type { Post } from "@/hooks/usePosts";

interface CategorySectionProps {
  category: Category;
  sectionTitle?: string;
  limit?: number;
  /** Alternate background for visual separation (e.g. even/odd) */
  variant?: "default" | "alt";
  /** Pre-fetched posts (e.g. from batch on home); when set, no per-category request is made */
  initialPosts?: Post[];
}

export function CategorySection({
  category,
  sectionTitle,
  limit = 4,
  variant = "default",
  initialPosts,
}: CategorySectionProps) {
  const { data: fetchedPosts = [] } = usePostsByCategory(
    initialPosts === undefined ? category.id : null,
    limit
  );
  const posts = initialPosts ?? fetchedPosts;
  const title = sectionTitle ?? category.title;

  if (posts.length === 0) return null;

  return (
    <section className={`section-spacing w-full border-t border-primary/20 ${variant === "alt" ? "bg-primary-muted/15" : "bg-primary/5"}`}>
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="section-title text-xl sm:text-2xl md:text-3xl font-bold text-foreground animate-fade-in-up">{title}</h2>
          <Link
            href={`/category/${category.slug}`}
            className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-opacity hover:opacity-80"
            onClick={() => trackCategoryClick(category.slug, category.title)}
          >
            See All →
          </Link>
        </div>
        <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, index) => (
            <Link
              key={post._id}
              href={`/${post.slug}`}
              className="group block h-full animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "forwards" }}
            >
              <Card className="overflow-hidden h-full rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-card-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <SafeImage
                    src={post.featuredImage ?? "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
