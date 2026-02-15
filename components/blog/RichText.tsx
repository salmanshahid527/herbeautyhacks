"use client";

interface RichTextProps {
  value: string | null | undefined;
}

export function RichText({ value }: RichTextProps) {
  if (!value?.trim()) return null;
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
