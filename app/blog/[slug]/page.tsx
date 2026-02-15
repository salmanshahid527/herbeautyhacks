import { BlogPostView } from "@/components/blog/BlogPostView";
import { fetchWp } from "@/lib/wp/client";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPostMeta(slug: string) {
  try {
    const data = await fetchWp<{ title?: { rendered?: string }; excerpt?: { rendered?: string } }[]>(
      "/posts",
      { slug, per_page: 1 }
    );
    const post = Array.isArray(data) ? data[0] : null;
    return post
      ? {
          title: post.title?.rendered?.replace(/<[^>]*>/g, "").trim(),
          excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, "").trim(),
        }
      : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMeta(slug);
  if (!post) return { title: "Post | Her Beauty Hacks" };
  return {
    title: `${post.title ?? "Post"} | Her Beauty Hacks`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostView slug={slug} />;
}
