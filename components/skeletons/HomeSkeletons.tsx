"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TopicCardsSkeleton() {
  return (
    <section className="section-spacing w-full border-t border-primary/20 bg-muted/20">
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        <Skeleton className="mx-auto mb-10 h-9 w-64 rounded" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedPostsSkeleton() {
  return (
    <section className="section-spacing w-full border-t border-primary/20 bg-background">
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        <Skeleton className="mx-auto mb-12 h-9 w-72 rounded" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
              <Skeleton className="aspect-video w-full rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategorySectionSkeleton() {
  return (
    <section className="section-spacing w-full border-t border-primary/20 bg-muted/20">
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-48 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
              <Skeleton className="aspect-video w-full rounded-none" />
              <div className="p-4">
                <Skeleton className="h-4 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MeetAuthorSkeleton() {
  return (
    <section className="section-spacing w-full bg-gradient-to-b from-primary/10 via-primary-muted/20 to-accent/40 border-y border-primary/10">
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        <Skeleton className="mx-auto mb-12 h-9 w-56 rounded" />
        <div className="flex flex-col gap-6 rounded-2xl border border-primary/20 bg-card/95 p-6 md:flex-row md:p-8">
          <Skeleton className="size-32 shrink-0 rounded-full md:size-40" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-40 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
