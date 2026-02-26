"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { trackCategoryClick } from "@/lib/analytics";


export function CategoriesBar() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <nav
      className="w-full min-h-11 bg-primary overflow-hidden"
      aria-label="Categories"
    >
      <div className="container container-wide mx-auto px-3 sm:px-4 md:px-6">
        <ul className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-x-3 sm:gap-x-5 md:gap-x-6 gap-y-2 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground overflow-x-auto scrollbar-hide scroll-smooth [-webkit-overflow-scrolling:touch]">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i}>
                  <Skeleton className="h-4 w-20 rounded bg-primary-foreground/20" />
                </li>
              ))}
            </>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat._id} className="shrink-0">
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:underline underline-offset-4 uppercase tracking-wide py-2 px-2 -mx-1 rounded touch-manipulation active:bg-primary-foreground/10"
                  onClick={() => trackCategoryClick(cat.slug, cat.title)}
                >
                  {cat.title}
                </Link>
              </li>
            ))
          ) : null}
        </ul>
      </div>
    </nav>
  );
}
