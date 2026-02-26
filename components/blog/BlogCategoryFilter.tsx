"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { trackCategoryClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import type { Category } from "@/hooks/useCategories";

interface BlogCategoryFilterProps {
  initialCategories?: Category[];
}

export function BlogCategoryFilter({ initialCategories }: BlogCategoryFilterProps) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? undefined;
  const { data: categories = [] } = useCategories(initialCategories);

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={!categorySlug ? "default" : "outline"} size="sm" asChild>
        <Link href="/blog" prefetch={false}>All</Link>
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat._id}
          variant={categorySlug === cat.slug ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link
            href={`/blog?category=${cat.slug}`}
            prefetch={false}
            onClick={() => trackCategoryClick(cat.slug, cat.title)}
          >
            {cat.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
