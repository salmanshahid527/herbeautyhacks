import { AboutContent } from "@/components/pages/AboutContent";
import { WpPageContent } from "@/components/pages/WpPageContent";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Metadata } from "next";

/** ISR: at most hourly — keeps Vercel Hobby ISR write limits sustainable */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  const url = `${getSiteUrl()}/about`;
  const title = page?.title ?? "About";
  const description = page?.excerpt ?? "Meet the author behind Her Beauty Hacks.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: page?.title ?? "About",
      description,
      url,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug("about");
  return (
    <div className="container container-wide px-3 sm:px-4 md:px-6 py-8 sm:py-10 mx-auto w-full space-y-10 sm:space-y-12 min-h-[50vh] bg-muted/20">
      <WpPageContent
        slug="about"
        initialPage={page}
        emptyMessage={
          <>
            <h1 className="text-3xl font-bold mb-8">About</h1>
            <p className="text-muted-foreground mb-8">Meet the author below.</p>
          </>
        }
      />
      <AboutContent />
    </div>
  );
}
