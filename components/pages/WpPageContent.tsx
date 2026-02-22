"use client";

import { usePage } from "@/hooks/usePage";
import type { Page } from "@/lib/wp/pages";
import { RichText } from "@/components/blog/RichText";
import { PageContentSkeleton } from "@/components/skeletons/PageContentSkeleton";

interface WpPageContentProps {
  slug: string;
  /** Server-fetched page so first paint shows correct content (no flash/wrong URL). */
  initialPage?: Page | null;
  /** Fallback when no page is found (e.g. "Coming soon") */
  emptyMessage?: React.ReactNode;
  /** Optional class for the wrapper */
  className?: string;
}

export function WpPageContent({ slug, initialPage, emptyMessage, className }: WpPageContentProps) {
  const { data: page, isLoading, isError } = usePage(slug, initialPage);

  if (isLoading) {
    return (
      <div className={className}>
        <PageContentSkeleton />
      </div>
    );
  }

  if (isError || !page) {
    return (
      <div className={className}>
        {emptyMessage ?? (
          <p className="text-muted-foreground">This page could not be loaded.</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <h1 className="text-3xl font-bold mb-8">{page.title}</h1>
      {page.content ? (
        <RichText value={page.content} />
      ) : (
        emptyMessage ?? (
          <p className="text-muted-foreground">No content yet.</p>
        )
      )}
    </div>
  );
}
