"use client";

import { usePage } from "@/hooks/usePage";
import { RichText } from "@/components/blog/RichText";

interface WpPageContentProps {
  slug: string;
  /** Fallback when no page is found (e.g. "Coming soon") */
  emptyMessage?: React.ReactNode;
  /** Optional class for the wrapper */
  className?: string;
}

export function WpPageContent({ slug, emptyMessage, className }: WpPageContentProps) {
  const { data: page, isLoading, isError } = usePage(slug);

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className ?? ""}`}>
        <div className="h-9 w-48 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
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
