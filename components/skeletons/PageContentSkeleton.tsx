"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PageContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-9 w-48 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
    </div>
  );
}
