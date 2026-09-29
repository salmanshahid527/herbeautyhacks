"use client";

import Link from "next/link";
import { SmartImage as Image } from "@/components/ui/SmartImage";
import { Search } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { useNavLinks } from "@/hooks/useNavLinks";
import type { NavLink } from "@/lib/wp/nav";
import type { Category } from "@/lib/wp/categories";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Terms & Conditions", href: "/terms-conditions" },

];

interface HeaderProps {
  /** Server-fetched nav so first paint matches (no flash). */
  initialNavLinks?: NavLink[];
  /** Server-fetched categories so SSR matches client (avoids hydration error). */
  initialCategories?: Category[];
}

export function Header({ initialNavLinks, initialCategories }: HeaderProps) {
  const { data: categories = [] } = useCategories(initialCategories);
  const { data: navLinksFromQuery } = useNavLinks(initialNavLinks ?? null);
  const navLinks =
    (navLinksFromQuery && navLinksFromQuery.length > 0 ? navLinksFromQuery : initialNavLinks) ??
    defaultNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="container container-wide flex h-14 md:h-16 items-center justify-between gap-3 px-3 sm:px-4 md:gap-6 md:px-6 mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          <MobileNav navLinks={navLinks} categories={categories} />
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-her-beauty-hacks.webp"
              alt="Her Beauty Hacks"
              width={220}
              height={56}
              className="h-8 sm:h-9 md:h-10 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-none object-contain"
              priority
            />
          </Link>
        </div>
        <NavigationMenu className="hidden sm:flex justify-end max-w-max flex-1 min-w-0">
          <NavigationMenuList className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 space-x-0">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/search"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary px-3 py-2 text-sm md:px-4",
                  )}
                  aria-label="Search"
                >
                  <Search className="size-4 md:size-[18px]" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {navLinks.map((link) =>
              link.href ? (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary px-3 py-2 text-sm md:px-4"
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : null
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
