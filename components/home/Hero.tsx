"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80";

export function Hero() {
  const { data: settings } = useSiteSettings();
  const tagline = settings?.heroTagline ?? "No One Is You…";
  const intro =
    settings?.heroIntro ??
    "Your go-to spot for beauty, fashion, skincare, and lifestyle tips. Pick a topic and explore.";
  const ctaText = settings?.heroCtaText ?? "Pick Your Topic";

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="grid min-h-[70vh] w-full grid-cols-1 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24">
          <h1 className="font-script text-4xl font-bold text-primary md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
            {tagline}
          </h1>
          <p className="mt-4 max-w-lg text-base text-foreground/85 md:text-lg leading-relaxed">
            {intro}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 w-fit bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 h-12 text-base font-semibold"
          >
            <Link href="/blog">{ctaText}</Link>
          </Button>
        </div>
        {/* Right: hero image */}
        <div className="relative min-h-[320px] w-full bg-muted lg:min-h-0">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
