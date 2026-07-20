import { WpPageContent } from "@/components/pages/WpPageContent";
import { getSiteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Metadata } from "next";

export const revalidate = 43200;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about-emma");

  const url = `${getSiteUrl()}/about-emma`;

  const title = page?.title ?? "About Emma";

  const description =
    page?.excerpt ?? "Learn more about Emma from Her Beauty Hacks.";

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

export default async function AboutEmmaPage() {
  const page = await getPageBySlug("about-emma");

  return (
    <div className="container container-wide px-3 sm:px-4 md:px-6 py-8 sm:py-10 mx-auto w-full min-h-[50vh] bg-muted/20">
      <WpPageContent
        slug="about-emma"
        initialPage={page}
        emptyMessage={
          <>
            <h1 className="text-3xl font-bold mb-8">
              About Emma
            </h1>

            <p className="text-muted-foreground">
              Add an About Emma page in WordPress to display content here.
            </p>
          </>
        }
      />
    </div>
  );
}