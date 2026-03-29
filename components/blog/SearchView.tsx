"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { PostCard } from "./PostCard";

const SUGGESTIONS = ["Skincare", "Makeup", "Hair care", "Fashion", "Wellness"];

export function SearchView() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);
  const { data: results = [], isLoading, isFetching } = useSearch(debouncedQuery);

  const isSearching = isLoading || isFetching;
  const hasQuery = debouncedQuery.trim().length >= 2;

  return (
    <div>
      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Search</p>
        <h1 className="font-display mb-6 text-4xl font-semibold text-foreground sm:text-5xl">
          Find beauty tips
        </h1>
        <div className="relative max-w-2xl">
          <Search
            size={20}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skincare, makeup, hair care…"
            autoFocus
            className="w-full rounded-2xl border border-input bg-background py-4 pl-14 pr-12 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
      </div>

      {isSearching && hasQuery ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
              <div className="aspect-video animate-pulse bg-muted" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isSearching && hasQuery && results.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} for{" "}
            <span className="font-medium text-primary">&ldquo;{debouncedQuery}&rdquo;</span>
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post, i) => (
              <PostCard key={post._id} post={post} priority={i < 3} />
            ))}
          </div>
        </>
      ) : null}

      {!isSearching && hasQuery && results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-3 text-2xl" aria-hidden>
            🔍
          </p>
          <p className="mb-2 font-medium text-foreground">No results found</p>
          <p className="text-sm text-muted-foreground">
            Try &ldquo;skincare&rdquo;, &ldquo;makeup&rdquo;, or &ldquo;hair care&rdquo;
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {!hasQuery ? (
        <div className="py-8 text-center text-muted-foreground">
          <p>Start typing to search articles (at least 2 characters)…</p>
        </div>
      ) : null}
    </div>
  );
}
