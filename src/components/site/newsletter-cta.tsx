import { NewsletterForm } from "@/components/site/newsletter-form";

export const NewsletterCta = () => (
  <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-rose-100 via-white to-orange-100 p-6 md:p-8">
    <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">Stay in the loop</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-zinc-950">
          Weekly beauty insights, no fluff
        </h2>
        <p className="max-w-2xl text-sm text-zinc-600">
          Get curated routines, trend breakdowns, and practical product picks from the HerBeautyHacks editorial team.
        </p>
      </div>
      <NewsletterForm source="newsletter-cta" />
    </div>
  </section>
);
