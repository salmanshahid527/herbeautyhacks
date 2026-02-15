"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { useAuthor } from "@/hooks/useAuthor";
import { Card, CardContent } from "@/components/ui/card";

export function MeetAuthor() {
  const { data: author } = useAuthor();

  if (!author) return null;

  return (
    <section className="section-spacing w-full bg-muted/40 border-y border-border/50">
      <div className="container container-wide px-4 mx-auto">
        <h2 className="section-title section-title-center text-2xl md:text-3xl font-bold text-center mb-12 text-foreground animate-fade-in-up">
          Meet The Author
        </h2>
        <Card className="overflow-hidden rounded-2xl border border-border/60 shadow-card-lg bg-card/98 backdrop-blur-sm border-l-4 border-l-primary animate-scale-in">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
            {author.image && (
              <div className="relative size-32 md:size-40 rounded-full overflow-hidden shrink-0 bg-muted">
                <SafeImage
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">{author.name}</h3>
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
      </div>
    </section>
  );
}
