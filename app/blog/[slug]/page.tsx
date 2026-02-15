import { BlogPostView } from "@/components/blog/BlogPostView";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { getSiteUrl } from "@/lib/seo";
import { getPostBySlug } from "@/lib/wp/post";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post | Her Beauty Hacks" };
  const url = `${getSiteUrl()}/blog/${slug}`;
  const title = post.title ?? "Post";
  const description = post.excerpt ?? undefined;
  return {
    title: `${title} | Her Beauty Hacks`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const initialPost = await getPostBySlug(slug);
  return (
    <>
      {initialPost && (
        <ArticleJsonLd
          title={initialPost.title ?? ""}
          description={initialPost.excerpt}
          slug={initialPost.slug}
          datePublished={initialPost.publishedAt ?? ""}
          dateModified={initialPost.modifiedAt ?? initialPost.publishedAt ?? ""}
          authorName={initialPost.author?.name}
          imageUrl={initialPost.featuredImage}
        />
      )}
      <BlogPostView
        slug={slug}
        initialPost={initialPost ?? undefined}
        shareUrl={initialPost ? `${getSiteUrl()}/blog/${slug}` : undefined}
      />
    </>
  );
}
