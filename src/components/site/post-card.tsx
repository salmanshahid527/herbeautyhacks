import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/types/content";
import { formatDate } from "@/lib/utils/format";

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export const PostCard = ({ post, compact = false }: PostCardProps) => (
  <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <Link href={`/${post.categorySlug}/${post.slug}`} className="block">
      <div className={`relative ${compact ? "h-44" : "h-56"}`}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </Link>
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
        <span className="rounded-full bg-rose-100 px-2.5 py-1 font-semibold uppercase tracking-wide text-rose-700">
          {post.categorySlug}
        </span>
        <span>{formatDate(post.publishedAt)}</span>
      </div>

      <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-950">
        <Link href={`/${post.categorySlug}/${post.slug}`} className="focus-visible:outline-none">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm leading-6 text-zinc-600">{post.excerpt}</p>
      <p className="text-xs font-medium text-zinc-500">{post.readTimeMinutes} min read</p>
    </div>
  </article>
);
