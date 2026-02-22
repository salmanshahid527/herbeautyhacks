import { WpPageContent } from "@/components/pages/WpPageContent";
import { getSiteUrl } from "@/lib/seo";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Metadata } from "next";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");
  const url = `${getSiteUrl()}/contact`;
  const title = page?.title ? `${page.title} | Her Beauty Hacks` : "Contact | Her Beauty Hacks";
  const description = page?.excerpt ?? "Get in touch with Her Beauty Hacks.";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: page?.title ?? "Contact", description, url, type: "website" },
  };
}

export default async function ContactPage() {
  const page = await getPageBySlug("contact");
  return (
    <div className="container container-wide px-4 py-10 mx-auto w-full min-h-[50vh] bg-muted/20">
      <WpPageContent
        slug="contact"
        initialPage={page}
        emptyMessage={
          <p className="text-muted-foreground">
            We&apos;d love to hear from you. Add a &quot;Contact&quot; page in WordPress to show
            your details here, or reach out via the &quot;Meet The Author&quot; section on the home page.
          </p>
        }
      />
    </div>
  );
}
