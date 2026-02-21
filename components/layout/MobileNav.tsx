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
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ) : null
          )}
          {categories.length > 0 && (
            <>
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Categories
              </span>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.slug}`}
                  className="text-base text-foreground hover:text-primary pl-2"
                  onClick={() => trackCategoryClick(cat.slug, cat.title)}
                >
                  {cat.title}
                </Link>
              ))}
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
