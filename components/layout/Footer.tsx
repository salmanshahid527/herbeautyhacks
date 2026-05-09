"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import { trackCategoryClick } from "@/lib/analytics";
import { useNavLinks } from "@/hooks/useNavLinks";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuthor } from "@/hooks/useAuthor";
import type { Category } from "@/lib/wp/categories";
import { Instagram, Facebook } from "lucide-react";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.214 0-2.354-.629-2.758-1.379l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

const defaultExploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy" },
];

interface FooterProps {
  /** Server-fetched categories so SSR matches client (avoids hydration error). */
  initialCategories?: Category[];
}

export function Footer({ initialCategories }: FooterProps) {
  const { data: categories = [] } = useCategories(initialCategories);
  const { data: navLinksFromWp } = useNavLinks();
  const { data: settings } = useSiteSettings();
  const { data: author } = useAuthor();
  const exploreLinks =
    navLinksFromWp && navLinksFromWp.length > 0 ? navLinksFromWp : defaultExploreLinks;
  const legalLinks = settings?.footerLegalLinks ?? [];
  const asSeenOn = settings?.asSeenOn ?? [];
  const pinterestUrl = "https://www.pinterest.com/Herbeauty_hacks/";
  const instagramUrl = author?.instagram ?? "#";
  const facebookUrl = author?.facebook ?? "#";

  return (
    <footer className="bg-muted/40 border-t border-border">
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        {/* Main footer content */}
        <div className="py-12 md:py-16">
          <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block">
                <span className="font-script text-2xl font-semibold text-foreground">
                  Her Beauty Hacks
                </span>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Beauty, fashion, skincare & lifestyle — no one is you.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Categories
              </h3>
              <ul className="mt-4 space-y-2.5">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                      onClick={() => trackCategoryClick(cat.slug, cat.title)}
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore (same WP-driven links as header nav) */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {exploreLinks.map((link) =>
                  link.href ? (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Follow Us
              </h3>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Stay connected with us for beauty tips, product ideas, and updates.
                Follow us on social media for the latest beauty tips and updates.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={pinterestUrl}
                  target={pinterestUrl.startsWith("http") ? "_blank" : undefined}
                  rel={pinterestUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Pinterest"
                >
                  <PinterestIcon className="size-4" />
                </a>
                <a
                  href={instagramUrl}
                  target={instagramUrl.startsWith("http") ? "_blank" : undefined}
                  rel={instagramUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="size-4" />
                </a>
                <a
                  href={facebookUrl}
                  target={facebookUrl.startsWith("http") ? "_blank" : undefined}
                  rel={facebookUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Facebook"
                >
                  <Facebook className="size-4" />
                </a>
              </div>
            </div>
          </div>

          

          {/* As Seen On */}
          {asSeenOn.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                As seen on
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                {asSeenOn.map((item, i) => (
                  <span key={i}>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.name ?? "Partner"}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border py-6 text-center sm:text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Her Beauty Hacks
          </p>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-1 text-sm text-muted-foreground">
              {legalLinks.map((link) =>
                link.href ? (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
