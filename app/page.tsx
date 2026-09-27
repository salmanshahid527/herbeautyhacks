import { HomeSections } from "@/components/home/HomeSections";
import { getSiteUrl } from "@/lib/seo";
import { getCategories } from "@/lib/wp/categories";
import { getFeaturedPosts, getPostsForMultipleCategories } from "@/lib/wp/post";
import type { Metadata } from "next";

/** ISR: at most hourly — keeps Vercel Hobby ISR write limits sustainable */
export const revalidate = 43200;

const siteUrl = getSiteUrl();
const POSTS_PER_CATEGORY = 4;

export const metadata: Metadata = {
  title: { absolute: "Her Beauty Hacks" },
  description: "Beauty, fashion, skincare, and lifestyle tips — no one is you.",
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    type: "website",
    title: "Her Beauty Hacks",
    description: "Beauty, fashion, skincare, and lifestyle tips — no one is you.",
    images: [{ url: "/logo-her-beauty-hacks.png", width: 512, height: 512, alt: "Her Beauty Hacks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Her Beauty Hacks",
    description: "Beauty, fashion, skincare, and lifestyle tips — no one is you.",
  },
};

export default async function Home() {
  const [categories, featuredPosts] = await Promise.all([
    getCategories(),
    getFeaturedPosts(),
  ]);
  const categoryIds = categories.map((c) => c.id);
  const postsByCategoryId =
    categoryIds.length > 0
      ? await getPostsForMultipleCategories(categoryIds, POSTS_PER_CATEGORY)
      : {};

  return (
    <>
    <HomeSections
      initialData={{
        categories,
        featuredPosts,
        postsByCategoryId,
      }}
    />

    </>
  );
}
