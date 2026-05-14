"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { decodeHtmlEntities } from "@/lib/html";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = "Search…", className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: results = [], isLoading, isFetching } = useSearch(debouncedQuery);
  const searching = isLoading || isFetching;
  const showDropdown = open && (debouncedQuery.length >= 2 || results.length > 0);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          className="w-48 pl-8"
          aria-label="Search posts"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          role="combobox"
        />
      </div>
      {showDropdown && (
        <div
          className="absolute top-full left-0 mt-1 w-72 rounded-md border bg-popover py-2 shadow-lg z-50 max-h-80 overflow-auto"
          role="listbox"
        >
          {searching ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">Searching…</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">
              {debouncedQuery.length >= 2 ? "No results." : "Type to search."}
            </p>
          ) : (
            <ul className="space-y-0.5">
              {results.map((post) => (
                <li key={post._id} role="option">
                  <Link
                    href={`/${post.slug}`}
                    className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-medium line-clamp-1">
                      {decodeHtmlEntities(post.title ?? "")}
                    </span>
                    {post.category && (
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        {decodeHtmlEntities(post.category.title)}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
