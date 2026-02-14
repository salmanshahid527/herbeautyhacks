interface SectionHeadingProps {
  title: string;
  description?: string;
}

export const SectionHeading = ({ title, description }: SectionHeadingProps) => (
  <div className="mb-6 flex flex-col gap-2">
    <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">{title}</h2>
    {description ? <p className="max-w-3xl text-sm text-zinc-600 md:text-base">{description}</p> : null}
  </div>
);
