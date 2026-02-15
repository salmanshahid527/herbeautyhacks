"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PLACEHOLDER_SRC = "/placeholder.svg";

export function SafeImage({
  className,
  alt,
  src,
  ...props
}: ImageProps) {
  const [error, setError] = useState(false);
  const usePlaceholder = error || !src;

  if (usePlaceholder) {
    return (
      <div
        className={cn("absolute inset-0 bg-muted flex items-center justify-center", className)}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLACEHOLDER_SRC}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt ?? ""}
      className={className}
      onError={() => setError(true)}
    />
  );
}
