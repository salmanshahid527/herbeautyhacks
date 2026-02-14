import type { Metadata } from "next";

import { WebStoriesPageClient } from "@/components/site/web-stories-page-client";

export const metadata: Metadata = {
  title: "Web Stories",
  description: "Browse short-form visual beauty stories from HerBeautyHacks.",
};

export default function WebStoriesPage() {
  return <WebStoriesPageClient />;
}
