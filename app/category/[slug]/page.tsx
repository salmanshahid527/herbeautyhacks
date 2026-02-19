import { CategoryArchive } from "@/components/blog/CategoryArchive";
import { getSiteUrl } from "@/lib/seo";
import { fetchWp } from "@/lib/wp/client";
import type { WpCategory } from "@/lib/wp/types";
import type { Metadata } from "next";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
  try {
    const data = await fetchWp<WpCategory[]>("/categories", { slug });
    const cat = Array.isArray(data) ? data[0] : null;
    return cat ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/category/${slug}`;
  const title = category?.name
    ? `${category.name} | Her Beauty Hacks`
    : "Category | Her Beauty Hacks";
  const description =
    category?.description?.replace(/<[^>]*>/g, "").trim() ||
    `Posts in ${category?.name ?? "this category"}.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: category?.name ?? "Category",
      description,
      url,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryArchive slug={slug} />;
}
