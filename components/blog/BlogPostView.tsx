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
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
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
      </div>
    </article>
  );
}
