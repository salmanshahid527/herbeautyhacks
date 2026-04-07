"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { usePost } from "@/hooks/usePosts";
import type { PostDetail } from "@/hooks/usePosts";
import { PostContent } from "./PostContent";
import { ShareButtons } from "./ShareButtons";
import { RelatedPosts } from "@/components/article/RelatedPosts";
import { BlogPostSkeleton } from "@/components/skeletons/BlogPostSkeleton";
import { ChevronRight } from "lucide-react";
import { decodeHtmlEntities } from "@/lib/html";
import { trackCategoryClick } from "@/lib/analytics";
import type { MappedPostDetail, MappedPost } from "@/lib/wp/post";

/** Strip HTML tags and decode entities for safe plain-text title (avoids DOMPurify/ESM on SSR). */
function formatTitle(html: string): string {
  const stripped = html.replace(/<[^>]*>/g, "").trim();
  return decodeHtmlEntities(stripped);
}

function formatPostDate(iso: string | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

interface BlogPostViewProps {
  slug: string;
  /** When provided, full article is pre-rendered (SEO). No client fetch; used as initialData. */
  initialPost?: MappedPostDetail | null;
  /** Canonical URL for sharing; used in share buttons. */
  shareUrl?: string;
  /** Related posts to display at the end of the article */
  relatedPosts?: MappedPost[];
}

export function BlogPostView({ slug, initialPost, shareUrl, relatedPosts = [] }: BlogPostViewProps) {
  const { data: post, isLoading } = usePost(slug, initialPost ?? undefined);

  const displayPost = (post ?? initialPost) as PostDetail | undefined;
  if (initialPost == null && isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!displayPost) {
    notFound();
  }

  return (
    <article className="w-full min-h-[50vh]">
      {/* Hero section with featured image as background */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div 
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden group"
        style={{
          backgroundImage: displayPost.featuredImage 
            ? `url('${displayPost.featuredImage}')` 
            : 'linear-gradient(135deg, rgb(var(--color-primary)/0.1), rgb(var(--color-muted)/0.1))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />

        {/* Pinterest Button */}
        <a
          href="https://pinterest.com/Herbeauty_hacks"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label="Share on Pinterest"
          className={`
            absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8
            z-20
            w-12 h-12 md:w-14 md:h-14
            bg-[#E60023] hover:bg-[#C41E14]
            rounded-full
            flex items-center justify-center
            shadow-lg hover:shadow-2xl
            transition-all duration-300 ease-out
            opacity-0 sm:group-hover:opacity-100
            md:group-hover:opacity-100
            lg:opacity-100
            pointer-events-auto
            active:scale-95
            ring-2 ring-white/20 hover:ring-white/40
          `}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path d="M12 6c-3.3 0-6 2.7-6 6 0 2.5 1.5 4.7 3.7 5.6-.1-1-.2-2.5 0-3.6l2.2-9.4c.1-.4.6-.8 1.1-.8s1 .4 1.1.8l2.2 9.4c.2 1.1.1 2.6 0 3.6 2.2-.9 3.7-3.1 3.7-5.6 0-3.3-2.7-6-6-6z" />
          </svg>
        </a>

        {/* Hero content */}
        <div className="container container-narrow px-3 sm:px-4 md:px-6 relative">
          {displayPost.category && (
            <Link
              href={`/category/${displayPost.category.slug}`}
              className="inline-block mb-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/80 transition-colors"
              onClick={() =>
                trackCategoryClick(
                  displayPost.category!.slug,
                  displayPost.category!.title
                )
              }
            >
              {displayPost.category.title}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg max-w-4xl">
            {formatTitle(displayPost.title ?? "")}
          </h1>
          
          {(displayPost.author?.name || displayPost.publishedAt) && (
            <p className="text-white/90 drop-shadow">
              {displayPost.author?.name && (
                <span>Written by {displayPost.author.name}</span>
              )}
              {displayPost.author?.name && displayPost.publishedAt && " · "}
              {displayPost.publishedAt && (
                <time dateTime={displayPost.publishedAt}>
                  {formatPostDate(displayPost.publishedAt)}
                </time>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Article content */}
      <div className="bg-muted/10">
        <div className="container container-narrow px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-14 mx-auto">
          <PostContent body={displayPost.body} />
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 lg:mt-16">
            <RelatedPosts posts={relatedPosts} currentPostSlug={slug} />
          </div>
        )}

        {(displayPost.author || displayPost.category) && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {displayPost.author && (
                <span>
                  By <span className="font-medium text-foreground">{displayPost.author.name}</span>
                </span>
              )}
              {displayPost.category && (
                <Link
                  href={`/category/${displayPost.category.slug}`}
                  className="text-primary hover:underline"
                  onClick={() =>
                    trackCategoryClick(
                      displayPost.category!.slug,
                      displayPost.category!.title
                    )
                  }
                >
                  More in {displayPost.category.title}
                </Link>
              )}
            </div>
          </div>
        )}

        <ShareButtons title={formatTitle(displayPost.title ?? "")} url={shareUrl} />
      </div>
    </article>
  );
}
