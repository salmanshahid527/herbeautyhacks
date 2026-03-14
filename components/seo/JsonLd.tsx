import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

export function OrganizationWebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Her Beauty Hacks",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo-her-beauty-hacks.png` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Her Beauty Hacks",
        description: "Beauty, fashion, skincare, and lifestyle tips — no one is you.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
