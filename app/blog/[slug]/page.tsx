import { BlogPostView } from "@/components/blog/BlogPostView";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { getSiteUrl } from "@/lib/seo";
import { fetchWp } from "@/lib/wp/client";
import type { Metadata } from "next";
import type { WpPost } from "@/lib/wp/types";

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

async function getPostSeoData(slug: string) {
  try {
    const data = await fetchWp<WpPost[]>("/posts", {
      slug,
      per_page: 1,
      _embed: 1,
    });
    const post = Array.isArray(data) ? data[0] : null;
    if (!post) return null;
    const author = post._embedded?.author?.[0];
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    return {
      title: post.title?.rendered?.replace(/<[^>]*>/g, "").trim() ?? "",
      description: post.excerpt?.rendered?.replace(/<[^>]*>/g, "").trim(),
      slug: post.slug,
      datePublished: post.date,
      dateModified: post.modified ?? post.date,
      authorName: author?.name,
      imageUrl: featuredMedia?.source_url,
    };
  } catch {
    return null;
  }
}

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMeta(slug);
  if (!post) return { title: "Post | Her Beauty Hacks" };
  const url = `${getSiteUrl()}/blog/${slug}`;
  return {
    title: `${post.title ?? "Post"} | Her Beauty Hacks`,
    description: post.excerpt ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      title: post.title ?? "Post",
      description: post.excerpt ?? undefined,
      url,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const seo = await getPostSeoData(slug);
  return (
    <>
      {seo && (
        <ArticleJsonLd
          title={seo.title}
          description={seo.description}
          slug={seo.slug}
          datePublished={seo.datePublished}
          dateModified={seo.dateModified}
          authorName={seo.authorName}
          imageUrl={seo.imageUrl}
        />
      )}
      <BlogPostView slug={slug} />
    </>
  );
}
