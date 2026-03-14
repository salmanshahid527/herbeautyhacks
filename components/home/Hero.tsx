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
    <section className="relative w-full overflow-hidden border-b border-primary/20 bg-gradient-to-br from-primary/8 via-primary/3 to-background">
      <div className="grid min-h-[70vh] w-full grid-cols-1 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-12 lg:py-24">
          <h1 className="font-script text-3xl font-bold text-primary sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight animate-fade-in-up">
            {tagline}
          </h1>
          <p className="mt-4 max-w-lg text-sm text-foreground/85 sm:text-base md:text-lg leading-relaxed animate-fade-in-up animate-delay-1 opacity-0 [animation-fill-mode:both]">
            {intro}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 sm:mt-8 w-full sm:w-fit bg-primary hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] text-primary-foreground rounded-none px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base font-semibold transition-all animate-fade-in-up animate-delay-2 opacity-0 [animation-fill-mode:both]"
          >
            <Link href="/blog">{ctaText}</Link>
          </Button>
        </div>
        {/* Right: hero image */}
        <div className="relative min-h-[240px] sm:min-h-[280px] md:min-h-[320px] w-full bg-muted lg:min-h-0 animate-scale-in opacity-0 [animation-fill-mode:both] [animation-delay:0.25s]">
          <Image
            src={HERO_IMAGE}
            alt="Her Beauty Hacks - beauty and lifestyle tips"
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
