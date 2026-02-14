import { Container } from "@/components/site/container";

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}

export const LegalPage = ({ title, updatedAt, intro, sections }: LegalPageProps) => (
  <Container className="max-w-4xl space-y-8 py-8 md:py-12">
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">Legal</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{title}</h1>
      <p className="text-sm text-zinc-500">Last updated: {updatedAt}</p>
      <p className="text-sm leading-6 text-zinc-600">{intro}</p>
    </header>

    <div className="space-y-7 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      {sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="font-display text-2xl font-semibold text-zinc-950">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-zinc-700">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  </Container>
);
