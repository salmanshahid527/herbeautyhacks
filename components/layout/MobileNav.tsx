"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { trackCategoryClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Category } from "@/hooks/useCategories";
import type { NavLink } from "@/hooks/useSiteSettings";

interface MobileNavProps {
  navLinks: NavLink[];
  categories: Category[];
}

export function MobileNav({ navLinks, categories }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu" className="size-10 min-w-10 touch-manipulation">
          <Menu className="size-5 sm:size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(85vw,320px)] max-w-full p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-6 sm:mt-8" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 -mx-2 text-base sm:text-lg font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors touch-manipulation min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ) : null
          )}
          {categories.length > 0 && (
            <>
              <span className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-4 pt-4 border-t border-border">
                Categories
              </span>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    className="py-3 px-2 -mx-2 text-sm sm:text-base text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors touch-manipulation min-h-[44px] flex items-center pl-2"
                    onClick={() => trackCategoryClick(cat.slug, cat.title)}
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
