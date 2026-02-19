import { HomeSections } from "@/components/home/HomeSections";
import { getSiteUrl } from "@/lib/seo";
import type { Metadata } from "next";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
  openGraph: { url: siteUrl, type: "website" },
};

export default function Home() {
  return <HomeSections />;
}
