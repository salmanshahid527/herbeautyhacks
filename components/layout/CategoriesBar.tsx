"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";

export function CategoriesBar() {
  const { data: categories = [] } = useCategories();

  if (categories.length === 0) return null;

  return (
    <nav className="w-full bg-primary" aria-label="Categories">
      <div className="container container-wide mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-sm font-semibold text-primary-foreground">
          {categories.map((cat) => (
            <li key={cat._id}>
              <Link
                href={`/category/${cat.slug}`}
                className="hover:underline underline-offset-4 uppercase tracking-wide"
              >
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
