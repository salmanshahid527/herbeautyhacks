import Image from "next/image";
import Link from "next/link";

import type { ShopItem } from "@/lib/types/content";
import { formatCurrency } from "@/lib/utils/format";

interface ShopCardProps {
  item: ShopItem;
}

export const ShopCard = ({ item }: ShopCardProps) => (
  <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
    <div className="relative h-52">
      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="rounded-full bg-zinc-100 px-2 py-1 font-semibold uppercase tracking-wide text-zinc-600">
          {item.categorySlug}
        </span>
        <span className="font-medium text-zinc-500">{item.brand}</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-zinc-950">{item.title}</h3>
      <p className="text-sm text-zinc-600">{item.description}</p>
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <span className="text-lg font-semibold text-zinc-900">{formatCurrency(item.price)}</span>
          {item.originalPrice ? (
            <span className="text-sm text-zinc-400 line-through">{formatCurrency(item.originalPrice)}</span>
          ) : null}
        </div>
        <span className="text-xs font-medium text-zinc-500">{item.rating.toFixed(1)} / 5</span>
      </div>
      <Link
        href={item.affiliateUrl}
        target="_blank"
        rel="sponsored noreferrer"
        className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
      >
        View product
      </Link>
    </div>
  </article>
);
