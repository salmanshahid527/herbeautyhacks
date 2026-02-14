import Link from "next/link";

export const NotFoundState = () => (
  <section className="mx-auto my-16 max-w-2xl rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">404</p>
    <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950">Page not found</h1>
    <p className="mt-3 text-sm leading-6 text-zinc-600">
      The page you requested does not exist or may have moved. Browse our latest editorial stories instead.
    </p>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Link
        href="/"
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Go home
      </Link>
      <Link
        href="/blogs"
        className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
      >
        Browse blogs
      </Link>
    </div>
  </section>
);
