import { DynamicResolverClient } from "@/components/site/dynamic-resolver-client";

interface SlugPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function SlugResolverPage({ params }: SlugPageProps) {
  const { slug } = await params;
  return <DynamicResolverClient slugSegments={slug} />;
}
