import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

/** Legacy `/blog/{slug}` links → WordPress-style `/{slug}`. */
export default async function LegacyBlogPostRedirect({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/${slug}`);
}
