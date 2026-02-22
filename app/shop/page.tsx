import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WpPageContent } from "@/components/pages/WpPageContent";
import { getSiteUrl } from "@/lib/seo";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Metadata } from "next";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("shop");
  const url = `${getSiteUrl()}/shop`;
  const title = page?.title ? `${page.title} | Her Beauty Hacks` : "Shop | Her Beauty Hacks";
  const description = page?.excerpt ?? "Shop Her Beauty Hacks.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: page?.title ?? "Shop", description, url, type: "website" },
  };
}

export default async function ShopPage() {
  const page = await getPageBySlug("shop");
  return (
    <div className="container container-wide px-4 py-10 mx-auto w-full space-y-8 min-h-[50vh] bg-muted/20">
      <WpPageContent
        slug="shop"
        initialPage={page}
        emptyMessage={
          <>
            <p className="text-muted-foreground mb-8">
              Shop is coming soon. For now, explore our blog for beauty and lifestyle tips.
            </p>
            <Button asChild>
              <Link href="/blog">Explore Blog</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
