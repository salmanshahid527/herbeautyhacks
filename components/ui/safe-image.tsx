"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SafeImage({
  className,
  alt,
  ...props
}: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn("absolute inset-0 bg-muted flex items-center justify-center", className)}
        aria-hidden
      >
        <span className="text-muted-foreground text-xs">Image</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt ?? ""}
      className={className}
      onError={() => setError(true)}
    />
  );
}
