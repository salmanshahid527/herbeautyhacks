"use client";

import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/site/container";
import { useCategories, useSiteConfig } from "@/lib/hooks/useContent";

const mainNavItems = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/shop", label: "Shop" },
  { href: "/web-stories", label: "Web Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: config } = useSiteConfig();
  const { data: categoryData } = useCategories();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            {config?.brandName ?? "HerBeautyHacks"}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((previous) => !previous)}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm font-medium text-zinc-700 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            Menu
          </button>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
            <ul className="flex items-center gap-6 text-sm font-medium text-zinc-700">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="group relative">
              <button
                type="button"
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                Topics
              </button>
              <div className="invisible absolute right-0 top-12 w-64 rounded-2xl border border-zinc-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="grid gap-1">
                  {(categoryData ?? []).map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/${category.slug}`}
                        className="block rounded-xl px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`overflow-hidden transition-all duration-200 md:hidden ${
            mobileOpen ? "max-h-96 pt-4" : "max-h-0"
          }`}
        >
          <ul className="grid gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-sm">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 font-medium text-zinc-800 transition hover:bg-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-zinc-200 pt-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Topics
            </li>
            {(categoryData ?? []).map((category) => (
              <li key={category.id}>
                <Link
                  href={`/${category.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-zinc-700 transition hover:bg-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
