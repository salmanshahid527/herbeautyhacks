"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { notFound } from "next/navigation";
import { usePost } from "@/hooks/usePosts";
import type { PostDetail } from "@/hooks/usePosts";
import { PostContent } from "./PostContent";
import { ShareButtons } from "./ShareButtons";
import { BlogPostSkeleton } from "@/components/skeletons/BlogPostSkeleton";
import { ChevronRight } from "lucide-react";
import { decodeHtmlEntities } from "@/lib/html";
import type { MappedPostDetail } from "@/lib/wp/post";

/** Strip HTML tags and decode entities for safe plain-text title (avoids DOMPurify/ESM on SSR). */
function formatTitle(html: string): string {
  const stripped = html.replace(/<[^>]*>/g, "").trim();
  return decodeHtmlEntities(stripped);
}

/** Get plain text of first paragraph from HTML. */
function firstParagraphFromHtml(html: string): string {
  if (!html?.trim()) return "";
  const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const block = match ? match[1] : html;
  const stripped = block.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return decodeHtmlEntities(stripped);
}

/** Excerpt to show: use full first paragraph from body when API excerpt is truncated (e.g. ends with …). */
function getLeadText(excerpt: string | undefined, body: string | undefined): string {
  const trimmed = excerpt?.trim();
  if (!trimmed) {
    return body ? firstParagraphFromHtml(body) : "";
  }
  const looksTruncated = /\[?\.\.\.\]?$|…$/.test(trimmed);
  if (looksTruncated && body?.trim()) {
    const first = firstParagraphFromHtml(body);
    return first || trimmed;
  }
  return trimmed;
}

interface BlogPostViewProps {
  slug: string;
  /** When provided, full article is pre-rendered (SEO). No client fetch; used as initialData. */
  initialPost?: MappedPostDetail | null;
  /** Canonical URL for sharing; used in share buttons. */
  shareUrl?: string;
}

function formatPostDate(isoDate: string | undefined): string {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return "";
  }
}

export function BlogPostView({ slug, initialPost, shareUrl }: BlogPostViewProps) {
  const [featuredPreviewSrc, setFeaturedPreviewSrc] = useState<string | null>(null);
  const { data: post, isLoading } = usePost(slug, initialPost ?? undefined);

  const displayPost = (post ?? initialPost) as PostDetail | undefined;
  if (typeof window !== "undefined" && displayPost) {
    const body = displayPost.body ?? "";
    console.log("[Blog Post View – data used for render]", {
      slug,
      bodyLength: body.length,
      bodyFirst500: body.slice(0, 500),
      featuredImage: displayPost.featuredImage,
      imgSrcsInBody: body.match(/src=["']([^"']+)["']/gi) ?? [],
    });
  }
  if (initialPost == null && isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!displayPost) {
    notFound();
  }

  const featuredImageSrc =
    displayPost.featuredImage ?? "/placeholder.svg";
  const hasByline = displayPost.author?.name || displayPost.publishedAt;

  return (
    <article className="w-full min-h-[50vh] bg-muted/10">
      <div className="container container-narrow px-4 py-10 md:py-14 mx-auto">
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

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
          {formatTitle(displayPost.title ?? "")}
        </h1>

        {hasByline && (
          <p className="mt-3 text-sm text-muted-foreground">
            {displayPost.author?.name && <>Written by {displayPost.author.name}</>}
            {displayPost.author?.name && displayPost.publishedAt && " · "}
            {displayPost.publishedAt && formatPostDate(displayPost.publishedAt)}
          </p>
        )}

        {(displayPost.excerpt || displayPost.body) && (
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed whitespace-normal text-justify">
            {getLeadText(displayPost.excerpt, displayPost.body)}
          </p>
        )}

        <button
          type="button"
          className="relative aspect-video w-full rounded-xl overflow-hidden mt-8 mb-10 bg-muted shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={() => {
            if (featuredImageSrc && featuredImageSrc !== "/placeholder.svg")
              setFeaturedPreviewSrc(featuredImageSrc);
          }}
          aria-label="View featured image"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredImageSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </button>
        <ImageLightbox
          src={featuredPreviewSrc}
          onClose={() => setFeaturedPreviewSrc(null)}
        />

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
