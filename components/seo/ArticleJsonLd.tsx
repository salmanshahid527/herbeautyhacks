import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

interface ArticleJsonLdProps {
  title: string;
  description?: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: ArticleJsonLdProps) {
  const url = `${siteUrl}/blog/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description ?? undefined,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    image: imageUrl ? [imageUrl] : undefined,
    publisher: {
      "@type": "Organization",
      name: "Her Beauty Hacks",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo-her-beauty-hacks.png` },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
