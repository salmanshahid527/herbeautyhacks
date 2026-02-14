"use client";

import { ContactForm } from "@/components/site/contact-form";
import { Container } from "@/components/site/container";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { SectionHeading } from "@/components/site/section-heading";

export const ContactPageClient = () => (
  <Container className="space-y-10 py-8 md:py-12">
    <SectionHeading
      title="Contact HerBeautyHacks"
      description="Questions, editorial feedback, partnerships, or collab ideas? Send us a note."
    />

    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="font-display text-2xl font-semibold text-zinc-950">Send a message</h2>
        <p className="mt-2 text-sm text-zinc-600">
          We usually respond within 2-3 business days. For press requests, please include timelines and context.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-xl font-semibold text-zinc-950">Editorial inquiries</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Email: hello@herbeautyhacks.com
            <br />
            Partnerships: partners@herbeautyhacks.com
          </p>
        </section>
        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="font-display text-xl font-semibold text-zinc-950">Join newsletter</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Get weekly editorial picks and practical routine upgrades.
          </p>
          <div className="mt-4">
            <NewsletterForm source="contact-sidebar" compact />
          </div>
        </section>
      </aside>
    </div>
  </Container>
);
