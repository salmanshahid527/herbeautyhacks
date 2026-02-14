"use client";

import { FormEvent, useState } from "react";

import { useNewsletterMutation } from "@/lib/hooks/useContent";

interface NewsletterFormProps {
  source?: string;
  compact?: boolean;
}

export const NewsletterForm = ({ source = "site", compact = false }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const mutation = useNewsletterMutation();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(
      { email, source },
      {
        onSuccess: () => {
          setEmail("");
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit} className={`grid gap-3 ${compact ? "max-w-md" : "max-w-xl"}`}>
      <label htmlFor={`newsletter-email-${source}`} className="text-sm font-medium text-zinc-700">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`newsletter-email-${source}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-rose-400"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? "Joining..." : "Join newsletter"}
        </button>
      </div>
      {mutation.isError ? (
        <p className="text-sm text-red-600">{mutation.error instanceof Error ? mutation.error.message : "Request failed."}</p>
      ) : null}
      {mutation.isSuccess ? <p className="text-sm text-emerald-700">{mutation.data.message}</p> : null}
    </form>
  );
};
