import { CategoryArchive } from "@/components/blog/CategoryArchive";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryArchive slug={slug} />;
}
