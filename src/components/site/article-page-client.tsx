"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/site/container";
import { LoadingState } from "@/components/site/loading-state";
import { NotFoundState } from "@/components/site/not-found-state";
import { PostCard } from "@/components/site/post-card";
import { usePost, useRelatedPosts } from "@/lib/hooks/useContent";
import { formatDate } from "@/lib/utils/format";

interface ArticlePageClientProps {
  postSlug: string;
}

export const ArticlePageClient = ({ postSlug }: ArticlePageClientProps) => {
  const { data: post, isLoading, isError, error } = usePost(postSlug);
  const { data: relatedPosts } = useRelatedPosts(postSlug);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, [postSlug]);

  const encoded = useMemo(
    () => ({
      url: encodeURIComponent(shareUrl || `https://herbeautyhacks.com/${postSlug}`),
      title: encodeURIComponent(post?.title ?? "HerBeautyHacks article"),
    }),
    [shareUrl, post?.title, postSlug],
  );

  if (isLoading) {
    return <LoadingState label="Loading article..." />;
  }

  if (isError) {
    return <LoadingState label={error instanceof Error ? error.message : "Failed to load article."} />;
  }

  if (!post) {
    return <NotFoundState />;
  }

  return (
    <Container className="space-y-12 py-8 md:py-12">
      <article className="space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">{post.categorySlug}</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">{post.title}</h1>
          <p className="max-w-3xl text-base text-zinc-600">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readTimeMinutes} min read</span>
          </div>
          <div className="relative h-72 overflow-hidden rounded-3xl border border-zinc-200 md:h-[430px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
          <section className="order-2 space-y-8 lg:order-1">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 space-y-3">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-950">{section.heading}</h2>
                {section.content.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-zinc-700">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </section>

          <aside className="order-1 space-y-6 lg:sticky lg:top-24 lg:order-2">
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-700">Table of contents</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {post.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-zinc-700 transition hover:text-zinc-950">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-700">Share</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href={`https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-700 transition hover:text-zinc-950"
                  >
                    Share on X
                  </Link>
                </li>
                <li>
                  <Link
                    href={`https://pinterest.com/pin/create/button/?url=${encoded.url}&description=${encoded.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-700 transition hover:text-zinc-950"
                  >
                    Share on Pinterest
                  </Link>
                </li>
                <li>
                  <Link href={`mailto:?subject=${encoded.title}&body=${encoded.url}`} className="text-zinc-700 transition hover:text-zinc-950">
                    Share via Email
                  </Link>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </article>

      <section className="space-y-5">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-950">Related posts</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {(relatedPosts ?? []).map((relatedPost) => (
            <PostCard key={relatedPost.id} post={relatedPost} compact />
          ))}
        </div>
      </section>
    </Container>
  );
};
