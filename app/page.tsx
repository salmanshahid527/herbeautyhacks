import { HomeSections } from "@/components/home/HomeSections";
import { getSiteUrl } from "@/lib/seo";
import type { Metadata } from "next";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Her Beauty Hacks",
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

export default function Home() {
  return <HomeSections />;
}
