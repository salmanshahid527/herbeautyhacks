import type { Metadata } from "next";

import { BlogsPageClient } from "@/components/site/blogs-page-client";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Browse editorial posts with search, filters, sorting, and pagination.",
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}
