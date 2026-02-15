"use client";

import { useRef, useEffect, useState } from "react";
import { decodeHtmlEntities, sanitizeHtmlForProse } from "@/lib/html";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

interface RichTextProps {
  value: string | null | undefined;
}

export function RichText({ value }: RichTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleClick = (e: Event) => {
      const target = e.target as Node;
      if (target instanceof HTMLImageElement) {
        e.preventDefault();
        const src = target.getAttribute("src") ?? target.currentSrc;
        if (src) setPreviewSrc(src);
      }
    };
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [value]);

  if (!value?.trim()) return null;
  const decoded = decodeHtmlEntities(value);
  const sanitized = sanitizeHtmlForProse(decoded);
  const html = decodeHtmlEntities(sanitized);

  return (
    <>
      <div
        ref={containerRef}
        className="prose max-w-none [&_img]:cursor-pointer"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ImageLightbox src={previewSrc} onClose={() => setPreviewSrc(null)} />
    </>
  );
}
