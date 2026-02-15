"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { notFound } from "next/navigation";
import { usePost } from "@/hooks/usePosts";
import { PostContent } from "./PostContent";
import { BlogPostSkeleton } from "@/components/skeletons/BlogPostSkeleton";
import { ChevronRight } from "lucide-react";
import { decodeHtmlEntities } from "@/lib/html";

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

export function BlogPostView({ slug }: BlogPostViewProps) {
  const { data: post, isLoading, isError } = usePost(slug);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (isError || (!post && !isLoading)) {
    notFound();
  }
  if (!post) return null;

  const hasByline = post.author?.name || post.publishedAt;

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
            {post.category && (
              <>
                <li aria-hidden="true" className="flex items-center gap-1">
                  <ChevronRight className="size-3.5 shrink-0" />
                  <Link
                    href={`/category/${post.category.slug}`}
                    className="hover:text-foreground hover:underline"
                  >
                    {post.category.title}
                  </Link>
                </li>
              </>
            )}
            {!post.category && (
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
          {formatTitle(post.title ?? "")}
        </h1>

        {hasByline && (
          <p className="mt-3 text-sm text-muted-foreground">
            {post.author?.name && <>Written by {post.author.name}</>}
            {post.author?.name && post.publishedAt && " · "}
            {post.publishedAt && formatPostDate(post.publishedAt)}
          </p>
        )}

        {(post.excerpt || post.body) && (
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl whitespace-normal">
            {getLeadText(post.excerpt, post.body)}
          </p>
        )}

        <div className="relative aspect-video rounded-xl overflow-hidden mt-8 mb-10 bg-muted shadow-lg">
          <SafeImage
            src={post.featuredImage ?? "/placeholder.svg"}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <PostContent body={post.body} />

        {(post.author || post.category) && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {post.author && (
                <span>
                  By <span className="font-medium text-foreground">{post.author.name}</span>
                </span>
              )}
              {post.category && (
                <Link
                  href={`/category/${post.category.slug}`}
                  className="text-primary hover:underline"
                >
                  More in {post.category.title}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
