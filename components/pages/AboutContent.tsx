"use client";

import Image from "next/image";
import { useAuthor } from "@/hooks/useAuthor";
import { Card, CardContent } from "@/components/ui/card";

export function AboutContent() {
  const { data: author, isLoading } = useAuthor();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-48 w-48 rounded-full bg-muted animate-pulse mx-auto" />
        <div className="h-6 w-48 bg-muted rounded animate-pulse mx-auto" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
      </div>
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
