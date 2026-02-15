import { AboutContent } from "@/components/pages/AboutContent";
import { WpPageContent } from "@/components/pages/WpPageContent";
import { getPageBySlug } from "@/lib/wp/pages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  return {
    title: page?.title ? `${page.title} | Her Beauty Hacks` : "About | Her Beauty Hacks",
    description: page?.excerpt ?? "Meet the author behind Her Beauty Hacks.",
  };
}

export default function AboutPage() {
  return (
    <div className="container container-wide px-4 py-10 mx-auto w-full space-y-12 min-h-[50vh] bg-muted/20">
      <WpPageContent
        slug="about"
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
