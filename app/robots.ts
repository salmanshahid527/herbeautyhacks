import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal search result pages are thin/duplicate content; keep them out of the index.
      disallow: ["/api/revalidate-all", "/search$", "/search?", "/search/"],
    },
    host: new URL(base).host,
    sitemap: `${base}/sitemap.xml`,
  };
}
