import Link from "next/link";

import { Container } from "@/components/site/container";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/disclosure-policy", label: "Disclosure Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export const SiteFooter = () => (
  <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-200">
    <Container className="grid gap-8 py-12 md:grid-cols-3">
      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-white">HerBeautyHacks</h2>
        <p className="text-sm text-zinc-400">
          Editorial beauty advice, routine systems, and product curation built for modern lifestyles.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Explore</h3>
        <ul className="mt-3 grid gap-2 text-sm">
          <li>
            <Link href="/blogs" className="transition hover:text-white">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/shop" className="transition hover:text-white">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/web-stories" className="transition hover:text-white">
              Web Stories
            </Link>
          </li>
          <li>
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Legal</h3>
        <ul className="mt-3 grid gap-2 text-sm">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>

    <Container className="border-t border-zinc-800 py-4">
      <p className="text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} HerBeautyHacks. All rights reserved.
      </p>
    </Container>
  </footer>
);
