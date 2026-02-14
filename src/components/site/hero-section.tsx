import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/types/content";
import { formatDate } from "@/lib/utils/format";

interface HeroSectionProps {
  post: Post;
}

export const HeroSection = ({ post }: HeroSectionProps) => (
  <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
    <div className="grid md:grid-cols-[1.2fr_1fr]">
      <div className="relative min-h-80">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 65vw"
          priority
        />
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">Featured story</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950">{post.title}</h1>
        <p className="text-sm leading-6 text-zinc-600">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTimeMinutes} min read</span>
          <span className="font-medium uppercase">{post.categorySlug}</span>
        </div>
        <Link
          href={`/${post.categorySlug}/${post.slug}`}
          className="mt-2 inline-flex w-fit items-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Read feature
        </Link>
      </div>
    </div>
  </section>
);
