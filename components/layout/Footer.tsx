"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAuthor } from "@/hooks/useAuthor";

const defaultGoToLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { data: categories = [] } = useCategories();
  const { data: settings } = useSiteSettings();
  const { data: author } = useAuthor();
  const goToLinks = settings?.footerGoToLinks?.length ? settings.footerGoToLinks : defaultGoToLinks;
  const legalLinks = settings?.footerLegalLinks ?? [];
  const asSeenOn = settings?.asSeenOn ?? [];

  return (
    <footer className="border-t-2 border-border bg-gradient-to-b from-muted/50 to-muted/30">
      <div className="container container-wide px-4 py-14 md:py-20 mx-auto">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Go To
            </h3>
            <ul className="space-y-2">
              {goToLinks.map((link) =>
                link.href ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Search
            </h3>
            <form className="flex gap-2" action="/blog" method="get">
              <Input
                type="search"
                name="q"
                placeholder={settings?.searchPlaceholder ?? "Search…"}
                className="flex-1"
              />
              <Button type="submit" size="icon" aria-label="Search">
                <Search className="size-4" />
              </Button>
            </form>
          </div>
          {author && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
              <div className="flex gap-3">
                {author.pinterest && (
                  <a
                    href={author.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    aria-label="Pinterest"
                  >
                    Pinterest
                  </a>
                )}
                {author.instagram && (
                  <a
                    href={author.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                )}
                {author.facebook && (
                  <a
                    href={author.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        {legalLinks.length > 0 && (
          <div className="mt-8 pt-8 border-t border-border">
            <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {legalLinks.map((link) =>
                link.href ? (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        )}
        {asSeenOn.length > 0 && (
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-4">As Seen On</p>
            <div className="flex flex-wrap items-center gap-6">
              {asSeenOn.map((item, i) => (
                <span key={i}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary text-sm font-medium"
                    >
                      {item.name ?? "Partner"}
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-sm">{item.name}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Her Beauty Hacks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
