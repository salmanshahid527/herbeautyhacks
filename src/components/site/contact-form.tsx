"use client";

import { FormEvent, useState } from "react";

import { useContactMutation } from "@/lib/hooks/useContent";

interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const ContactForm = () => {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const mutation = useContactMutation();

  const setField = (field: keyof ContactValues, value: string) =>
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(values, {
      onSuccess: () => {
        setValues(initialValues);
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="contact-name" className="text-sm font-medium text-zinc-700">
            Name
          </label>
          <input
            id="contact-name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
            placeholder="Your name"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="contact-email"
            required
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-subject" className="text-sm font-medium text-zinc-700">
          Subject
        </label>
        <input
          id="contact-subject"
          required
          value={values.subject}
          onChange={(event) => setField("subject", event.target.value)}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
          placeholder="How can we help?"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-zinc-700">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400"
          placeholder="Tell us about your question or collaboration idea."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-500">
          By submitting this form, you agree to our privacy and communication policies.
        </p>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending ? "Sending..." : "Send message"}
        </button>
      </div>

      {mutation.isError ? (
        <p className="text-sm text-red-600">{mutation.error instanceof Error ? mutation.error.message : "Request failed."}</p>
      ) : null}
      {mutation.isSuccess ? <p className="text-sm text-emerald-700">{mutation.data.message}</p> : null}
    </form>
  );
};
