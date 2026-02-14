"use client";

import { ArticlePageClient } from "@/components/site/article-page-client";
import { CategoryHubClient } from "@/components/site/category-hub-client";
import { LoadingState } from "@/components/site/loading-state";
import { NotFoundState } from "@/components/site/not-found-state";
import { useResolvedPath } from "@/lib/hooks/useContent";

interface DynamicResolverClientProps {
  slugSegments: string[];
}

export const DynamicResolverClient = ({ slugSegments }: DynamicResolverClientProps) => {
  const { data, isLoading, isError, error } = useResolvedPath(slugSegments);

  if (isLoading) {
    return <LoadingState label="Resolving page..." />;
  }

  if (isError || !data) {
    return <LoadingState label={error instanceof Error ? error.message : "Failed to resolve this page."} />;
  }

  if (data.type === "category") {
    return <CategoryHubClient categorySlug={data.category.slug} />;
  }

  if (data.type === "post") {
    return <ArticlePageClient postSlug={data.post.slug} />;
  }

  return <NotFoundState />;
};
