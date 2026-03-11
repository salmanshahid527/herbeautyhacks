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
    <section className="section-spacing w-full border-t border-primary/20 bg-accent/50">
      <div className="container container-wide px-3 sm:px-4 md:px-6 mx-auto">
        <h2 className="section-title section-title-center text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground animate-fade-in-up">
          Posts you just can&apos;t miss!
        </h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post, index) => (
            <div
              key={post._id}
              className="group relative animate-slide-in-bottom opacity-0"
              style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
            >
              {/* Card link */}
              <Link href={`/blog/${post.slug}`}>
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
                  <CardContent className="p-3 sm:p-5">
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

              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                <button
                  onClick={() =>
                    window.open("https://www.pinterest.com/Herbeauty_hacks/", "_blank")
                  }
                  className="bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.372 0 0 5.373 0 12c0 5.084 3.163 9.406 7.622 11.095-.105-.945-.2-2.395.042-3.429.218-.936 1.404-5.964 1.404-5.964s-.358-.716-.358-1.775c0-1.662.964-2.902 2.165-2.902 1.02 0 1.512.767 1.512 1.684 0 1.026-.654 2.558-.99 3.981-.283 1.196.602 2.17 1.784 2.17 2.14 0 3.786-2.257 3.786-5.516 0-2.878-2.066-4.886-5.019-4.886-3.426 0-5.44 2.568-5.44 5.224 0 1.034.397 2.145.893 2.747.098.119.112.223.083.344-.09.374-.293 1.193-.331 1.361-.052.22-.17.268-.396.162-1.482-.687-2.406-2.843-2.406-4.58 0-3.731 2.71-7.159 7.814-7.159 4.096 0 7.281 2.92 7.281 6.811 0 4.063-2.561 7.337-6.11 7.337-1.194 0-2.316-.62-2.7-1.352l-.735 2.805c-.265 1.012-.985 2.283-1.467 3.057C9.72 23.947 10.847 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}