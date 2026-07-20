import type { Metadata } from "next";
import { SearchView } from "@/components/blog/SearchView";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

export const revalidate = 43200;

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Search",
  description: "Search beauty, skincare, and lifestyle articles on Her Beauty Hacks.",
  alternates: { canonical: `${siteUrl}/search` },
};

export default function SearchPage() {
  return (
    <div className="container container-narrow mx-auto w-full px-3 py-8 sm:px-4 sm:py-12 md:px-6 md:py-16">
      <SearchView />
    </div>
  );
}
