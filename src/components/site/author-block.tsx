import Image from "next/image";
import Link from "next/link";

import type { Author } from "@/lib/types/content";

interface AuthorBlockProps {
  author: Author;
}

export const AuthorBlock = ({ author }: AuthorBlockProps) => (
  <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
    <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-center">
      <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full md:h-40 md:w-40">
        <Image src={author.avatar} alt={author.name} fill className="object-cover" sizes="160px" />
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">Author Spotlight</p>
        <h2 className="font-display text-2xl font-semibold text-zinc-950">{author.name}</h2>
        <p className="text-sm font-medium text-zinc-600">{author.role}</p>
        <p className="text-sm leading-6 text-zinc-600">{author.bio}</p>
        <div className="flex flex-wrap gap-3">
          {author.socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);
