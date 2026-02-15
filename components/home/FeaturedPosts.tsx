"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { useFeaturedPosts } from "@/hooks/useFeaturedPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export function FeaturedPosts() {
  const { data: posts = [] } = useFeaturedPosts();

  if (posts.length === 0) return null;

  return (
    <section className="section-spacing w-full bg-background">
      <div className="container container-wide px-4 mx-auto">
        <h2 className="section-title section-title-center text-2xl md:text-3xl font-bold text-center mb-12 text-foreground animate-fade-in-up">
          Posts you just can&apos;t miss!
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post, index) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group block h-full animate-slide-in-bottom opacity-0"
              style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
            >
              <Card className="overflow-hidden h-full rounded-2xl border border-border/60 bg-card shadow-card hover:shadow-card-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <SafeImage
                    src={post.featuredImage ?? "/placeholder.svg"}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-5">
                  {post.category && (
                    <Badge className="mb-2 text-xs bg-primary/15 text-primary border-primary/30 hover:bg-primary/25 shadow-sm">
                      {post.category.title}
                    </Badge>
                  )}
                  <h3 className="font-semibold line-clamp-2 text-foreground">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
