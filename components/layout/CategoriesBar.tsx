"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { trackCategoryClick } from "@/lib/analytics";

const BAR_MIN_HEIGHT = "2.75rem"; /* py-3 + one line of text */

export function CategoriesBar() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <nav
      className="w-full min-h-[2.75rem] bg-primary"
      aria-label="Categories"
    >
      <div className="container container-wide mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-sm font-semibold text-primary-foreground">
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
              <li key={cat._id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:underline underline-offset-4 uppercase tracking-wide"
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
