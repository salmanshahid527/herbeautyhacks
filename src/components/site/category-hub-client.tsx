"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/site/container";
import { LoadingState } from "@/components/site/loading-state";
import { NotFoundState } from "@/components/site/not-found-state";
import { Pagination } from "@/components/site/pagination";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { useCategory, usePosts } from "@/lib/hooks/useContent";
import type { PostSortOption } from "@/lib/types/content";

interface CategoryHubClientProps {
  categorySlug: string;
}

const sortOptions: { value: PostSortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "trending", label: "Trending" },
  { value: "title", label: "Title (A-Z)" },
];

export const CategoryHubClient = ({ categorySlug }: CategoryHubClientProps) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<PostSortOption>("newest");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      page,
      pageSize: 6,
      search,
      category: categorySlug,
      sort,
    }),
    [page, search, categorySlug, sort],
  );

  const { data: category, isLoading: isCategoryLoading } = useCategory(categorySlug);
  const { data: postData, isLoading, isError, error } = usePosts(params);

  if (isCategoryLoading) {
    return <LoadingState label="Loading category..." />;
  }

  if (!category) {
    return <NotFoundState />;
  }

  return (
    <Container className="space-y-8 py-8 md:py-12">
      <SectionHeading title={category.name} description={category.description} />

      <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-3 md:p-5">
        <div className="grid gap-2 md:col-span-2">
          <label htmlFor={`category-search-${categorySlug}`} className="text-sm font-medium text-zinc-700">
            Search in {category.name}
          </label>
          <input
            id={`category-search-${categorySlug}`}
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
            placeholder={`Search ${category.name.toLowerCase()} articles...`}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`category-sort-${categorySlug}`} className="text-sm font-medium text-zinc-700">
            Sort by
          </label>
          <select
            id={`category-sort-${categorySlug}`}
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as PostSortOption);
              setPage(1);
            }}
            className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-400"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {isLoading ? <LoadingState label={`Loading ${category.name.toLowerCase()} stories...`} /> : null}
      {isError ? (
        <LoadingState label={error instanceof Error ? error.message : "Failed to load category stories."} />
      ) : null}

      {postData ? (
        <>
          <p className="text-sm text-zinc-600">
            Showing {postData.items.length} of {postData.meta.totalItems} posts in {category.name}
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {postData.items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination page={postData.meta.page} totalPages={postData.meta.totalPages} onPageChange={setPage} />
        </>
      ) : null}
    </Container>
  );
};
