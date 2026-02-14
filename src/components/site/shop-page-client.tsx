"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/site/container";
import { LoadingState } from "@/components/site/loading-state";
import { Pagination } from "@/components/site/pagination";
import { SectionHeading } from "@/components/site/section-heading";
import { ShopCard } from "@/components/site/shop-card";
import { useCategories, useShopItems } from "@/lib/hooks/useContent";
import type { ShopSortOption } from "@/lib/types/content";

const sortOptions: { value: ShopSortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to high" },
  { value: "price-high", label: "Price: High to low" },
  { value: "rating", label: "Top rated" },
];

export const ShopPageClient = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<ShopSortOption>("featured");
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      page,
      pageSize: 8,
      search,
      category: category || undefined,
      sort,
    }),
    [page, search, category, sort],
  );

  const { data, isLoading, isError, error } = useShopItems(params);
  const { data: categoryData } = useCategories();

  return (
    <Container className="space-y-8 py-8 md:py-12">
      <SectionHeading
        title="Shop Curations"
        description="Editor-selected products and tools that support simple, effective beauty workflows."
      />

      <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-3 md:p-5">
        <div className="grid gap-2 md:col-span-2">
          <label htmlFor="shop-search" className="text-sm font-medium text-zinc-700">
            Search products
          </label>
          <input
            id="shop-search"
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
            placeholder="Search by product, brand, or category..."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          <div className="grid gap-2">
            <label htmlFor="shop-category" className="text-sm font-medium text-zinc-700">
              Category
            </label>
            <select
              id="shop-category"
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
            <label htmlFor="shop-sort" className="text-sm font-medium text-zinc-700">
              Sort by
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as ShopSortOption);
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

      {isLoading ? <LoadingState label="Loading curated products..." /> : null}
      {isError ? <LoadingState label={error instanceof Error ? error.message : "Failed to load shop data."} /> : null}

      {data ? (
        <>
          <p className="text-sm text-zinc-600">
            Showing {data.items.length} of {data.meta.totalItems} curated products
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {data.items.map((item) => (
              <ShopCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination page={data.meta.page} totalPages={data.meta.totalPages} onPageChange={setPage} />
        </>
      ) : null}
    </Container>
  );
};
