"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/site/container";
import { LoadingState } from "@/components/site/loading-state";
import { Pagination } from "@/components/site/pagination";
import { SectionHeading } from "@/components/site/section-heading";
import { WebStoryCard } from "@/components/site/web-story-card";
import { useCategories, useWebStories } from "@/lib/hooks/useContent";
import type { StorySortOption } from "@/lib/types/content";

const sortOptions: { value: StorySortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title (A-Z)" },
];

export const WebStoriesPageClient = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<StorySortOption>("newest");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      page,
      pageSize: 9,
      search,
      category: category || undefined,
      sort,
    }),
    [page, search, category, sort],
  );

  const { data, isLoading, isError, error } = useWebStories(params);
  const { data: categoryData } = useCategories();

  return (
    <Container className="space-y-8 py-8 md:py-12">
      <SectionHeading
        title="Web Stories"
        description="Swipe-friendly mini stories for quick beauty wins and routine refreshes."
      />

      <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-3 md:p-5">
        <div className="grid gap-2 md:col-span-2">
          <label htmlFor="stories-search" className="text-sm font-medium text-zinc-700">
            Search stories
          </label>
          <input
            id="stories-search"
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
            placeholder="Search by title or category..."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          <div className="grid gap-2">
            <label htmlFor="stories-category" className="text-sm font-medium text-zinc-700">
              Category
            </label>
            <select
              id="stories-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-400"
            >
              <option value="">All categories</option>
              {(categoryData ?? []).map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="stories-sort" className="text-sm font-medium text-zinc-700">
              Sort by
            </label>
            <select
              id="stories-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as StorySortOption);
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
        </div>
      </section>

      {isLoading ? <LoadingState label="Loading web stories..." /> : null}
      {isError ? <LoadingState label={error instanceof Error ? error.message : "Failed to load web stories."} /> : null}

      {data ? (
        <>
          <p className="text-sm text-zinc-600">
            Showing {data.items.length} of {data.meta.totalItems} stories
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.items.map((story) => (
              <WebStoryCard key={story.id} story={story} />
            ))}
          </div>
          <Pagination page={data.meta.page} totalPages={data.meta.totalPages} onPageChange={setPage} />
        </>
      ) : null}
    </Container>
  );
};
