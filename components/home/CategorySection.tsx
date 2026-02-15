"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { usePostsByCategory } from "@/hooks/usePosts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/hooks/useCategories";

interface CategorySectionProps {
  category: Category;
  sectionTitle?: string;
  limit?: number;
  /** Alternate background for visual separation (e.g. even/odd) */
  variant?: "default" | "alt";
}

export function CategorySection({
  category,
  sectionTitle,
  limit = 4,
  variant = "default",
}: CategorySectionProps) {
  const { data: posts = [] } = usePostsByCategory(category.id, limit);
  const title = sectionTitle ?? category.title;

  if (posts.length === 0) return null;

  return (
    <section className={`section-spacing w-full ${variant === "alt" ? "bg-primary-muted/10" : "bg-muted/20"}`}>
      <div className="container container-wide px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title text-2xl md:text-3xl font-bold text-foreground animate-fade-in-up">{title}</h2>
          <Link
            href={`/category/${category.slug}`}
            className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            See All →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, index) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group block h-full animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "forwards" }}
            >
              <Card className="overflow-hidden h-full rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-card-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <SafeImage
                    src={post.featuredImage ?? "/placeholder.svg"}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-4">
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
