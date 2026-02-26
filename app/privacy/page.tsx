import { WpPageContent } from "@/components/pages/WpPageContent";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Metadata } from "next";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("privacy-policy");
  const url = `${getSiteUrl()}/privacy`;
  const title = page?.title
    ? `${page.title} | Her Beauty Hacks`
    : "Privacy Policy | Her Beauty Hacks";
  const description = page?.excerpt ?? "Privacy policy for Her Beauty Hacks.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: page?.title ?? "Privacy Policy",
      description,
      url,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function PrivacyPage() {
  const page = await getPageBySlug("privacy-policy");
  return (
    <div className="container container-wide px-3 sm:px-4 md:px-6 py-8 sm:py-10 mx-auto w-full min-h-[50vh] bg-muted/20">
      <WpPageContent
        slug="privacy-policy"
        initialPage={page}
        emptyMessage={
          <>
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Add a Privacy Policy page in WordPress to display your policy here.
            </p>
          </>
        }
      />
    </div>
  );
}
