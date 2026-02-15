"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <div className="w-full min-h-[50vh] bg-muted/10">
      <div className="container container-narrow px-4 py-10 md:py-14 mx-auto">
        <Skeleton className="mb-6 h-4 w-40 rounded" />
        <Skeleton className="mb-3 h-10 w-full max-w-3xl rounded" />
        <Skeleton className="mb-8 h-5 w-56 rounded" />
        <Skeleton className="mb-4 h-5 w-full max-w-2xl rounded" />
        <Skeleton className="mt-8 mb-10 aspect-video w-full rounded-xl" />
        <div className="container-prose mx-auto space-y-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-4 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
