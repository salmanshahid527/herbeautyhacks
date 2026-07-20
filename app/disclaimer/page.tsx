import { WpPageContent } from "@/components/pages/WpPageContent";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Metadata } from "next";

/** ISR: at most hourly — keeps Vercel Hobby ISR write limits sustainable */
export const revalidate = 43200;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("disclaimer");
  const url = `${getSiteUrl()}/disclaimer`;
  const title = page?.title ?? "Disclaimer";
  const description = page?.excerpt ?? "Disclaimer for Her Beauty Hacks.";
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

export default async function DisclaimerPage() {
  const page = await getPageBySlug("disclaimer");

  return (
    <div className="container container-wide px-3 sm:px-4 md:px-6 py-8 sm:py-10 mx-auto w-full min-h-[50vh] bg-muted/20">
      <WpPageContent
        slug="disclaimer"
        initialPage={page}
        emptyMessage={
          <>
            <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>
            <p className="text-muted-foreground">
              Add a Disclaimer page in WordPress to display your disclaimer here.
            </p>
          </>
        }
      />
    </div>
  );
}
