"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { useAuthor } from "@/hooks/useAuthor";
import { Instagram, Facebook, Linkedin } from "lucide-react";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.214 0-2.354-.629-2.758-1.379l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export function MeetAuthor() {
  const { data: author } = useAuthor();

  if (!author) return null;

  return (
    <section className="section-spacing w-full bg-gradient-to-b from-primary/10 via-primary-muted/20 to-accent/40 border-y border-primary/10">
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        <h2 className="section-title section-title-center text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground animate-fade-in-up">
          Meet The Author
        </h2>
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-primary/20 bg-card/95 shadow-lg backdrop-blur-sm animate-scale-in">
          <div className="p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
            <div className="relative size-24 sm:size-28 md:size-36 rounded-full overflow-hidden shrink-0 ring-4 ring-primary/20 bg-muted">
              <SafeImage
                src={author.image ?? "/placeholder.svg"}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2">
                {author.name}
              </h3>
              {author.bio && (
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {author.bio}
                </p>
              )}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
                {author.pinterest && (
                  <a
                    href={author.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Pinterest"
                  >
                    <PinterestIcon className="size-5" />
                  </a>
                )}
                {author.instagram && (
                  <a
                    href={author.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-5" />
                  </a>
                )}
                {author.facebook && (
                  <a
                    href={author.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Facebook"
                  >
                    <Facebook className="size-5" />
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="size-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
