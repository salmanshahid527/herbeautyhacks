"use client";

import Image from "next/image";
import { useAuthor } from "@/hooks/useAuthor";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AboutContent() {
  const { data: author, isLoading } = useAuthor();

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Skeleton className="size-40 shrink-0 rounded-full" />
          <div className="flex-1 w-full space-y-3">
            <Skeleton className="h-6 w-40 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!author) {
    return (
      <p className="text-muted-foreground">
        No author info found. Add content in WordPress.
      </p>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
        {author.image && (
          <div className="relative size-40 rounded-full overflow-hidden shrink-0 bg-muted">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
          {author.bio && (
            <p className="text-muted-foreground whitespace-pre-line">{author.bio}</p>
          )}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            {author.pinterest && (
              <a
                href={author.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline text-sm"
              >
                Pinterest
              </a>
            )}
            {author.instagram && (
              <a
                href={author.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline text-sm"
              >
                Instagram
              </a>
            )}
            {author.facebook && (
              <a
                href={author.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline text-sm"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
