"use client";

import { RichText } from "./RichText";

interface PostContentProps {
  body: string | null | undefined;
}

export function PostContent({ body }: PostContentProps) {
  return <RichText value={body} />;
}
