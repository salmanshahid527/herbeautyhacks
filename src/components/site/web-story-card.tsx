import Image from "next/image";

import type { WebStory } from "@/lib/types/content";
import { formatDate } from "@/lib/utils/format";

interface WebStoryCardProps {
  story: WebStory;
}

export const WebStoryCard = ({ story }: WebStoryCardProps) => (
  <article id={story.slug} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
    <div className="relative h-64">
      <Image
        src={story.coverImage}
        alt={story.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span className="font-medium uppercase tracking-wide">{story.categorySlug}</span>
        <span>{formatDate(story.publishedAt)}</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-zinc-950">{story.title}</h3>
      <p className="text-sm text-zinc-600">{story.excerpt}</p>
      <p className="text-xs font-medium text-zinc-500">{story.readTimeMinutes} min story</p>
    </div>
  </article>
);
