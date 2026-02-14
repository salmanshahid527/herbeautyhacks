import Image from "next/image";
import Link from "next/link";

import type { Category } from "@/lib/types/content";

interface TopicCardProps {
  category: Category;
}

export const TopicCard = ({ category }: TopicCardProps) => (
  <Link
    href={`/${category.slug}`}
    className="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div className="relative h-44">
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className={`absolute inset-0 bg-gradient-to-tr ${category.accentClass}`} />
    </div>
    <div className="space-y-2 p-4">
      <h3 className="font-display text-lg font-semibold text-zinc-950">{category.name}</h3>
      <p className="text-sm text-zinc-600">{category.description}</p>
    </div>
  </Link>
);
