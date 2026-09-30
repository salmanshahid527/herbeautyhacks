import { BlogPostView } from "@/components/blog/BlogPostView";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WpPageContent } from "@/components/pages/WpPageContent";
import { decodeHtmlEntities } from "@/lib/html";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { fetchRankMathDescription } from "@/lib/wp/rankmath";
import { getPostBySlug, getRelatedPostsByCategory } from "@/lib/wp/post";
import { getPageBySlug } from "@/lib/wp/pages";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/** WP page slug → Next.js path (matches `app/sitemap.ts`). */
const PAGE_SLUG_TO_PATH: Record<string, string> = {
  about: "/about",
  contact: "/contact",
  "privacy-policy": "/privacy",
  privacy: "/privacy",
};

/** Strip HTML and cut to ~max chars at a word boundary (no rewriting). */
function truncateAtWord(text: string, max: number): string {
  const clean = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : clean.slice(0, max)).replace(/[\s,;:.\-–—]+$/, "");
}

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 43200;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (page) {
    const path = PAGE_SLUG_TO_PATH[slug] ?? `/${slug}`;
    const siteUrl = getSiteUrl();
    const url = `${siteUrl}${path}`;
    const title = decodeHtmlEntities(page.title ?? "Page");
    const description = page.excerpt ? truncateAtWord(decodeHtmlEntities(page.excerpt), 155) : undefined;
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        type: "website",
        images: [DEFAULT_OG_IMAGE],
      },
    };
  }

  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };

  const rankMathDesc = await fetchRankMathDescription(slug);

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${slug}`;
  const title = decodeHtmlEntities(post.title ?? "Post");
  const rawDescription = rankMathDesc || post.excerpt || undefined;
  const description = rawDescription ? decodeHtmlEntities(rawDescription) : undefined;
  const ogSection = post.category?.title ? decodeHtmlEntities(post.category.title) : undefined;
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
      section: ogSection,
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

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (page) {
    return (
      <div className="container container-wide px-3 sm:px-4 md:px-6 py-8 sm:py-10 mx-auto w-full min-h-[50vh] bg-muted/20">
        <WpPageContent slug={slug} initialPage={page} />
      </div>
    );
  }

  const initialPost = await getPostBySlug(slug);
  if (!initialPost) notFound();

  const seoDescriptionRaw = (await fetchRankMathDescription(slug)) || initialPost.excerpt;
  const seoDescription = seoDescriptionRaw ? decodeHtmlEntities(seoDescriptionRaw) : undefined;
  const jsonLdTitle = decodeHtmlEntities(initialPost.title ?? "");
  const breadcrumbPostName = decodeHtmlEntities(initialPost.title ?? "Post");

  // Fetch related posts if category exists
  const relatedPosts = [];
  if (initialPost.category?.id) {
    try {
      const posts = await getRelatedPostsByCategory(initialPost.category.id, initialPost.slug, 4);
      relatedPosts.push(...posts);
    } catch (err) {
      // Silently fail if we can't get related posts
      console.log("Could not fetch related posts:", err);
    }
  }

  const siteUrl = getSiteUrl();
  const absoluteImageUrl =
    initialPost.featuredImage?.startsWith("http") === true
      ? initialPost.featuredImage
      : initialPost.featuredImage
        ? `${siteUrl}${initialPost.featuredImage.startsWith("/") ? "" : "/"}${initialPost.featuredImage}`
        : undefined;

  const postUrl = `${siteUrl}/${initialPost.slug}`;

  return (
    <>
      <ArticleJsonLd
        title={jsonLdTitle}
        description={seoDescription}
        slug={initialPost.slug}
        datePublished={initialPost.publishedAtIso ?? initialPost.publishedAt ?? ""}
        dateModified={
          initialPost.modifiedAtIso ??
          initialPost.modifiedAt ??
          initialPost.publishedAtIso ??
          initialPost.publishedAt ??
          ""
        }
        authorName={initialPost.author?.name}
        imageUrl={absoluteImageUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
          ...(initialPost.category
            ? [
                {
                  name: decodeHtmlEntities(initialPost.category.title),
                  url: `${siteUrl}/category/${initialPost.category.slug}`,
                },
              ]
            : []),
          { name: breadcrumbPostName, url: postUrl },
        ]}
      />
      <BlogPostView slug={slug} initialPost={initialPost} shareUrl={postUrl} relatedPosts={relatedPosts} />
    </>
  );
}
