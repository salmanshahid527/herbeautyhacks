"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CategoryArchiveSkeleton() {
  return (
    <div className="container container-wide px-4 py-10 mx-auto w-full min-h-[50vh] bg-muted/10">
      <Skeleton className="mb-6 h-9 w-28 rounded" />
      <Skeleton className="mb-2 h-9 w-48 rounded" />
      <Skeleton className="mb-8 h-5 w-full max-w-xl rounded" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-4">
              <Skeleton className="h-4 w-full rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
