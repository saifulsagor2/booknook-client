"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ retry }: ErrorPageProps) {
  return (
    <main className="grid flex-1 place-items-center px-5 py-20 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          A page-turning pause
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
          Something went wrong.
        </h1>
        <p className="mt-4 leading-7 text-muted">
          We couldn&apos;t load this page just now. Give it another try, or head
          back to the BookNook shelves.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            onClick={retry}
            type="button"
          >
            Try again
          </button>
          <Link
            className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-brand transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            href="/"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
