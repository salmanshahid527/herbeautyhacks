"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "./MobileNav";

const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const { data: categories = [] } = useCategories();
  const { data: settings } = useSiteSettings();
  const navLinks = settings?.navLinks?.length ? settings.navLinks : defaultNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70 shadow-sm">
      <div className="container container-wide flex h-14 md:h-16 items-center justify-between gap-4 px-4 md:gap-6 mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          <MobileNav navLinks={navLinks} categories={categories} />
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-her-beauty-hacks.svg"
              alt="Her Beauty Hacks"
              width={180}
              height={36}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex justify-end max-w-max flex-1">
          <NavigationMenuList className="gap-1 justify-end">
            {navLinks.map((link) =>
              link.href ? (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className={navigationMenuTriggerStyle()}>
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
