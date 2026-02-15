import { CategoryArchive } from "@/components/blog/CategoryArchive";

/** ISR: revalidate at most every 60 seconds */
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryArchive slug={slug} />;
}
