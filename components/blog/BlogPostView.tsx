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
import PinterestHover from "./PinterestHover";

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
    <article className=" w-full min-h-[50vh] bg-muted/10">
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

{/* --- Pinterest Setup --- */}

        <PinterestHover targetContainerClass="article-rich-text-body" />

        <div className="article-rich-text-body w-full [&_.prose_p]:text-justify">
          <PostContent body={displayPost.body} />
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 lg:mt-16">
            <RelatedPosts posts={relatedPosts} currentPostSlug={slug} />
          </div>
        )}

{/* --- Meet The Author Card --- */}
{displayPost.author?.name && (
  <div className="mt-12 p-6 sm:p-8 bg-card border border-border rounded-2xl shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
    
    {/* 1. Author Avatar / Image */}
    <div className="size-16 shrink-0 rounded-full overflow-hidden ring-4 ring-primary/5 bg-primary/10 flex items-center justify-center relative">
      {/* Explicit type casting to 'any' to bypass TypeScript field existence checks */}
      {(displayPost.author as any).image ? (
        <img
          src={(displayPost.author as any).image}
          alt={displayPost.author.name}
          className="w-full h-full object-cover absolute inset-0"
          onError={(e) => {
            // Hide the broken image and display the fallback initials if loading fails
            e.currentTarget.style.opacity = '0';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      ) : null}

      {/* Fallback Initial Letter (Displayed dynamically if the image is missing or fails to load) */}
      <span 
        className="text-xl font-bold text-primary uppercase"
        style={{ display: (displayPost.author as any).image ? 'none' : 'flex' }}
      >
        {displayPost.author.name.charAt(0)}
      </span>
    </div>

    {/* 2. Author Details Area */}
    <div className="flex-1 text-center sm:text-left">
      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
        Written By
      </span>
      
      {/* Author Name */}
      <h3 className="mt-1 text-xl font-bold text-foreground">
        {displayPost.author.name}
      </h3>
      
      {/* Author Bio (Renders dynamic WordPress bio, falls back to default description if empty) */}
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {(displayPost.author as any).bio ?? null}
      </p>
      <Link
  href="/about"
  className="inline-flex mt-4 text-sm font-semibold text-primary hover:underline">
  About the author →
</Link>
    
    </div>
  </div>

)}         

        <ShareButtons title={formatTitle(displayPost.title ?? "")} url={shareUrl} />
      </div>
    </article>
  );
}
