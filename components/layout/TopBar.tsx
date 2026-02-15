"use client";

import { useAuthor } from "@/hooks/useAuthor";
import { SearchBar } from "./SearchBar";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Instagram, Facebook } from "lucide-react";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.214 0-2.354-.629-2.758-1.379l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export function TopBar() {
  const { data: author } = useAuthor();
  const { data: settings } = useSiteSettings();
  const placeholder = settings?.searchPlaceholder ?? "Search…";

  const pinterestUrl = author?.pinterest ?? "#";
  const instagramUrl = author?.instagram ?? "#";
  const facebookUrl = author?.facebook ?? "#";

  return (
    <div className="w-full border-b border-border/60 bg-muted/30">
      <div className="container container-wide flex h-9 md:h-10 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-5">
          <a
            href={pinterestUrl}
            target={pinterestUrl.startsWith("http") ? "_blank" : undefined}
            rel={pinterestUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Pinterest"
          >
            <PinterestIcon className="size-4" />
          </a>
          <a
            href={instagramUrl}
            target={instagramUrl.startsWith("http") ? "_blank" : undefined}
            rel={instagramUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={facebookUrl}
            target={facebookUrl.startsWith("http") ? "_blank" : undefined}
            rel={facebookUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="size-4" />
          </a>
        </div>
        <div className="flex items-center">
          <SearchBar placeholder={placeholder} className="[&_input]:h-8 [&_input]:w-36 [&_input]:text-sm" />
        </div>
      </div>
    </div>
  );
}
