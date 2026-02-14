"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/site/container";
import { LoadingState } from "@/components/site/loading-state";
import { Pagination } from "@/components/site/pagination";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { useCategories, usePosts } from "@/lib/hooks/useContent";
import type { PostSortOption } from "@/lib/types/content";

const sortOptions: { value: PostSortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "trending", label: "Trending" },
  { value: "title", label: "Title (A-Z)" },
];

export const BlogsPageClient = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<PostSortOption>("newest");
  const [page, setPage] = useState(1);

  const postParams = useMemo(
    () => ({
      page,
      pageSize: 6,
      search,
      category: category || undefined,
      sort,
    }),
    [page, search, category, sort],
  );

  const { data: postsResponse, isLoading, isError, error } = usePosts(postParams);
  const { data: categoryData } = useCategories();

  const onSearchChange = (nextValue: string) => {
    setSearch(nextValue);
    setPage(1);
  };

  const onCategoryChange = (nextValue: string) => {
    setCategory(nextValue);
    setPage(1);
  };

  const onSortChange = (nextValue: PostSortOption) => {
    setSort(nextValue);
    setPage(1);
  };

  return (
    <Container className="space-y-8 py-8 md:py-12">
      <SectionHeading
        title="Editorial Blogs"
        description="Search, filter, and sort our latest beauty guidance and routine playbooks."
      />

      <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-3 md:p-5">
        <div className="grid gap-2 md:col-span-2">
          <label htmlFor="blog-search" className="text-sm font-medium text-zinc-700">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title, topic, or keyword..."
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          <div className="grid gap-2">
            <label htmlFor="blog-category" className="text-sm font-medium text-zinc-700">
              Category
            </label>
            <select
              id="blog-category"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
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
            <label htmlFor="blog-sort" className="text-sm font-medium text-zinc-700">
              Sort by
            </label>
            <select
              id="blog-sort"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as PostSortOption)}
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

      {isLoading ? <LoadingState label="Loading posts..." /> : null}
      {isError ? (
        <LoadingState label={error instanceof Error ? error.message : "Failed to load blog listing."} />
      ) : null}

      {postsResponse ? (
        <>
          <p className="text-sm text-zinc-600">
            Showing {postsResponse.items.length} of {postsResponse.meta.totalItems} articles
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {postsResponse.items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            page={postsResponse.meta.page}
            totalPages={postsResponse.meta.totalPages}
            onPageChange={setPage}
          />
        </>
      ) : null}
    </Container>
  );
};
