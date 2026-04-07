"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaPinterest } from "react-icons/fa";
import { formatDateTimeShort } from "@/lib/utils";
import type { Post } from "@/hooks/usePosts";

interface PostCardProps {
  post: Post;
  /** Set for first few cards to improve LCP (e.g. priority load image). */
  priority?: boolean;
}

export function PostCard({ post, priority }: PostCardProps) {
  return (
    <>
      {/* Pinterest Button - Absolutely positioned outside Link */}
      <a
        href="https://pinterest.com/Herbeauty_hacks"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Share on Pinterest"
        className={`
          absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4
          z-20
          w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
          bg-[#E60023] hover:bg-[#C41E14]
          rounded-full
          flex items-center justify-center
          shadow-lg hover:shadow-2xl
          transition-all duration-300 ease-out
          opacity-0 group-hover:opacity-100
          pointer-events-auto
          active:scale-95
          ring-2 ring-white/20 hover:ring-white/40
        `}
      >
        <FaPinterest className="w-5 h-5 text-white" />
      </a>
      <Link href={`/${post.slug}`} className="group block h-full relative">
        <Card className="overflow-hidden h-full flex flex-col rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-card-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
          <div className="relative aspect-video bg-muted overflow-hidden">
            <SafeImage
              src={post.featuredImage ?? "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          </div>

          <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
            {post.category && (
              <Badge className="mb-2 text-xs bg-primary/15 text-primary border-primary/30">
                {post.category.title}
              </Badge>
            )}
            <h3 className="font-semibold line-clamp-2">{post.title}</h3>
            {post.excerpt && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
            )}

            {post.author?.name && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {formatDateTimeShort(post.publishedAt)}
                  </time>
                )}
                <p>By {post.author.name}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </>
  );
}