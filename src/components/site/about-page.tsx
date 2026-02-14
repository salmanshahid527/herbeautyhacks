import { Container } from "@/components/site/container";
import { NewsletterForm } from "@/components/site/newsletter-form";

export const AboutPage = () => (
  <Container className="space-y-10 py-8 md:py-12">
    <header className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">About HerBeautyHacks</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
        Beauty advice for real schedules and real life
      </h1>
      <p className="max-w-3xl text-base leading-7 text-zinc-600">
        HerBeautyHacks is an editorial destination focused on practical beauty systems. We blend product literacy,
        routine frameworks, and trend insights to help readers build routines that are both modern and sustainable.
      </p>
    </header>

    <section className="grid gap-6 md:grid-cols-3">
      <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-zinc-950">Our editorial lens</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          We prioritize clarity over hype, emphasizing routine design and category-level education.
        </p>
      </article>
      <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-zinc-950">How we test ideas</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Recommendations are built around repeatability, skin comfort, and day-to-day usability.
        </p>
      </article>
      <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-zinc-950">Who we serve</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Busy readers who want effective beauty guidance without overwhelm or unrealistic complexity.
        </p>
      </article>
    </section>

    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="font-display text-2xl font-semibold text-zinc-950">Join the HerBeautyHacks newsletter</h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">
        Receive weekly beauty workflows, deep dives, and curated picks from our editors.
      </p>
      <div className="mt-5">
        <NewsletterForm source="about-page" />
      </div>
    </section>
  </Container>
);
