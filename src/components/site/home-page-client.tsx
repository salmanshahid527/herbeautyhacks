"use client";

import { AuthorBlock } from "@/components/site/author-block";
import { Container } from "@/components/site/container";
import { HeroSection } from "@/components/site/hero-section";
import { LoadingState } from "@/components/site/loading-state";
import { NewsletterCta } from "@/components/site/newsletter-cta";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { TopicCard } from "@/components/site/topic-card";
import { useHomePageData } from "@/lib/hooks/useContent";

export const HomePageClient = () => {
  const { data, isLoading, isError, error } = useHomePageData();

  if (isLoading) {
    return <LoadingState label="Loading homepage..." />;
  }

  if (isError || !data) {
    return <LoadingState label={error instanceof Error ? error.message : "Failed to load homepage."} />;
  }

  return (
    <Container className="space-y-16 py-8 md:py-12">
      <HeroSection post={data.heroPost} />

      <section>
        <SectionHeading
          title="Pick your topic"
          description="Jump into editor-curated beauty pillars built for practical routines."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.topicCards.map((category) => (
            <TopicCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title="Trending now"
          description="Most-read stories this week across skincare, makeup, wellness, and routines."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {data.trendingPosts.map((post) => (
            <PostCard key={post.id} post={post} compact />
          ))}
        </div>
      </section>

      {data.editorialSections.map((section) => (
        <section key={section.category.id}>
          <SectionHeading title={section.category.name} description={section.category.description} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {section.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ))}

      <section>
        <SectionHeading
          title="Latest from the editorial desk"
          description="Freshly published stories to keep your routine current and intentional."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.latestPosts.map((post) => (
            <PostCard key={post.id} post={post} compact />
          ))}
        </div>
      </section>

      <AuthorBlock author={data.authorSpotlight} />
      <NewsletterCta />
    </Container>
  );
};
