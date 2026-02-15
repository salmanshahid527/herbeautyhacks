"use client";

import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { decodeHtmlEntities, sanitizeHtmlForProse } from "@/lib/html";

interface RichTextProps {
  value: string | null | undefined;
}

export function RichText({ value }: RichTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const images = el.querySelectorAll<HTMLImageElement>("img");
    const handleClick = (e: Event) => {
      e.preventDefault();
      const img = e.currentTarget as HTMLImageElement;
      const src = img.getAttribute("src");
      if (src) setPreviewSrc(src);
    };
    images.forEach((img) => img.addEventListener("click", handleClick));
    return () => images.forEach((img) => img.removeEventListener("click", handleClick));
  }, [value]);

  useEffect(() => {
    if (!previewSrc) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewSrc]);

  if (!value?.trim()) return null;
  const decoded = decodeHtmlEntities(value);
  const sanitized = sanitizeHtmlForProse(decoded);
  const html = decodeHtmlEntities(sanitized);

  return (
    <>
      <div
        ref={containerRef}
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {previewSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setPreviewSrc(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setPreviewSrc(null)}
            aria-label="Close preview"
          >
            <X className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- lightbox shows arbitrary WP image URLs */}
          <img
            src={previewSrc}
            alt="Preview"
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
