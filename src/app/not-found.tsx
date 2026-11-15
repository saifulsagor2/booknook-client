import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-5 py-20 text-center">
      <div className="max-w-lg">
        <p className="font-serif text-7xl italic text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
          This page is off the shelf.
        </h1>
        <p className="mt-4 leading-7 text-muted">
          We couldn&apos;t find the page you were looking for. Let&apos;s find
          our way back to the stories.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          href="/"
        >
          Return to BookNook
        </Link>
      </div>
    </main>
  );
}
