"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { notFound } from "next/navigation";
import { usePost } from "@/hooks/usePosts";
import { PostContent } from "./PostContent";
import { BlogPostSkeleton } from "@/components/skeletons/BlogPostSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BlogPostViewProps {
  slug: string;
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

  return (
    <article className="container container-wide px-4 py-12 md:py-16 mx-auto w-full min-h-[50vh] bg-muted/10">
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href="/blog" className="inline-flex items-center gap-1">
          <ChevronLeft className="size-4" />
          Back to Blog
        </Link>
      </Button>
      {post.category && (
        <Link
          href={`/category/${post.category.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          {post.category.title}
        </Link>
      )}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-foreground tracking-tight">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
      )}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-8 bg-muted">
          <SafeImage
            src={post.featuredImage ?? "/placeholder.svg"}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
      <PostContent body={post.body} />
      {post.author && (
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            By <span className="font-medium text-foreground">{post.author.name}</span>
          </p>
        </div>
      )}
    </article>
  );
}
