import Link from "next/link";
import { PostCard } from "./PostCard";
import type { Post } from "@/hooks/usePosts";
import type { Category } from "@/lib/wp/categories";
import { cn } from "@/lib/utils";

interface BlogPostListProps {
  posts: Post[];
  categories: Category[];
  categorySlug?: string;
}

export function BlogPostList({ posts, categories, categorySlug }: BlogPostListProps) {
  const categoryLinks = categories
    .filter((c) => c.slug && c.slug.toLowerCase() !== "uncategorized")
    .slice(0, 24);

  return (
    <div className="space-y-8">
      <nav aria-label="Browse posts by category" className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            !categorySlug
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
          )}
        >
          All
        </Link>
        {categoryLinks.map((cat) => (
          <Link
            key={cat._id}
            href={`/blog?category=${encodeURIComponent(cat.slug)}`}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors capitalize",
              categorySlug === cat.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {cat.title}
          </Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post._id} post={post} priority={index < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
