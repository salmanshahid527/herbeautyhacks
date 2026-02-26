import { BlogPostView } from "@/components/blog/BlogPostView";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
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
  if (!post) return { title: "Post" };
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${slug}`;
  const title = post.title ?? "Post";
  const description = post.excerpt ?? undefined;
  const imageUrl =
    post.featuredImage?.startsWith("http") === true
      ? post.featuredImage
      : post.featuredImage
        ? `${siteUrl}${post.featuredImage.startsWith("/") ? "" : "/"}${post.featuredImage}`
        : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: title }]
        : [DEFAULT_OG_IMAGE],
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt ?? post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.category?.title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
    },
    ...(post.featuredImage && {
      links: [{ rel: "preload", as: "image", href: post.featuredImage }],
    }),
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
