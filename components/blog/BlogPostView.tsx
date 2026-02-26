"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { usePost } from "@/hooks/usePosts";
import type { PostDetail } from "@/hooks/usePosts";
import { PostContent } from "./PostContent";
import { ShareButtons } from "./ShareButtons";
import { BlogPostSkeleton } from "@/components/skeletons/BlogPostSkeleton";
import { ChevronRight } from "lucide-react";
import { decodeHtmlEntities } from "@/lib/html";
import { trackCategoryClick } from "@/lib/analytics";
import type { MappedPostDetail } from "@/lib/wp/post";

/** Strip HTML tags and decode entities for safe plain-text title (avoids DOMPurify/ESM on SSR). */
function formatTitle(html: string): string {
  const stripped = html.replace(/<[^>]*>/g, "").trim();
  return decodeHtmlEntities(stripped);
}

function formatPostDate(iso: string | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
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
}

export function BlogPostView({ slug, initialPost, shareUrl }: BlogPostViewProps) {
  const { data: post, isLoading } = usePost(slug, initialPost ?? undefined);

  const displayPost = (post ?? initialPost) as PostDetail | undefined;
  if (initialPost == null && isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!displayPost) {
    notFound();
  }

  return (
    <article className="w-full min-h-[50vh] bg-muted/10">
      <div className="container container-narrow px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-14 mx-auto">
        {/* Breadcrumb: Home / Category */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                Home
              </Link>
            </li>
            {displayPost.category && (
              <>
                <li aria-hidden="true" className="flex items-center gap-1">
                  <ChevronRight className="size-3.5 shrink-0" />
                  <Link
                    href={`/category/${displayPost.category.slug}`}
                    className="hover:text-foreground hover:underline"
                    onClick={() =>
                      trackCategoryClick(
                        displayPost.category!.slug,
                        displayPost.category!.title
                      )
                    }
                  >
                    {displayPost.category.title}
                  </Link>
                </li>
              </>
            )}
            {!displayPost.category && (
              <li aria-hidden="true" className="flex items-center gap-1">
                <ChevronRight className="size-3.5 shrink-0" />
                <Link href="/blog" className="hover:text-foreground hover:underline">
                  Blog
                </Link>
              </li>
            )}
          </ol>
        </nav>

        {/* Title and written by above the featured image */}
        <header className="mt-6 mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {formatTitle(displayPost.title ?? "")}
          </h1>
          {(displayPost.author?.name || displayPost.publishedAt) && (
            <p className="mt-2 text-sm text-muted-foreground">
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
        </header>

        <div className="w-full [&_.prose_p]:text-justify">
          <PostContent body={displayPost.body} />
        </div>

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
