"use client";

import dynamic from "next/dynamic";

/** Lazy-loaded lightbox to reduce initial JS (improves mobile TBT). Renders only on client. */
export const ImageLightbox = dynamic(
  () => import("./ImageLightbox").then((m) => ({ default: m.ImageLightbox })),
  { ssr: false }
);
