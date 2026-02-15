"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostSkeleton() {
  return (
    <div className="container container-wide px-4 py-12 md:py-16 mx-auto w-full min-h-[50vh] bg-muted/10">
      <Skeleton className="mb-6 h-9 w-28 rounded" />
      <Skeleton className="mb-2 h-4 w-24 rounded" />
      <Skeleton className="mb-4 h-10 w-full max-w-2xl rounded" />
      <Skeleton className="mb-6 h-5 w-full max-w-xl rounded" />
      <Skeleton className="mb-8 aspect-video w-full rounded-lg" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-4 w-full rounded" />
        ))}
      </div>
    </div>
  );
}
