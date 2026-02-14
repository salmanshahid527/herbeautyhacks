import type { Metadata } from "next";

import { ShopPageClient } from "@/components/site/shop-page-client";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore curated beauty, wellness, and style product recommendations.",
};

export default function ShopPage() {
  return <ShopPageClient />;
}
