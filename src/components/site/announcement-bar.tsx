"use client";

import Link from "next/link";

import { Container } from "@/components/site/container";
import { useSiteConfig } from "@/lib/hooks/useContent";

export const AnnouncementBar = () => {
  const { data } = useSiteConfig();
  const announcement = data?.announcement ?? "Welcome to HerBeautyHacks.";
  const socialLinks = data?.socialLinks ?? [];

  return (
    <div className="border-b border-zinc-200 bg-zinc-950 text-zinc-100">
      <Container className="flex flex-col gap-3 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium tracking-wide">{announcement}</p>
        <ul className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};
