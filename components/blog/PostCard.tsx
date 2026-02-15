"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/hooks/usePosts";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="overflow-hidden h-full rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-card-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
        {post.featuredImage && (
          <div className="relative aspect-video bg-muted overflow-hidden">
            <SafeImage
              src={post.featuredImage}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        <CardContent className="p-4">
          {post.category && (
            <Badge className="mb-2 text-xs bg-primary/15 text-primary border-primary/30">
              {post.category.title}
            </Badge>
          )}
          <h3 className="font-semibold line-clamp-2">{post.title}</h3>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
