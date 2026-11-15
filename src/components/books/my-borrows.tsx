"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { getBorrows, returnBook, type Borrow } from "@/lib/borrows";

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    new Date(value),
  );
}

export function MyBorrows() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    getBorrows()
      .then((result) => {
        if (isMounted) {
          setBorrows(result);
        }
      })
      .catch((loadError: unknown) => {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Your borrowing history could not be loaded.",
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow.id);
    setError("");
    try {
      const returned = await returnBook(borrow.id);
      setBorrows((current) =>
        current.map((item) => (item.id === returned.id ? returned : item)),
      );
    } catch (returnError) {
      setError(
        returnError instanceof Error
          ? returnError.message
          : "The book could not be returned. Please try again.",
      );
    } finally {
      setReturningId(null);
    }
  };

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Your reading history
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
              My Borrows
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-muted">
              Keep track of books you have borrowed and return them when you are done.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand"
            href="/catalog"
          >
            Browse shared books
          </Link>
        </header>

        {error && (
          <p className="mt-6 rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#913f31]" role="alert">
            {error}
          </p>
        )}
        {isLoading ? (
          <p aria-live="polite" className="mt-10 text-muted">
            Loading your borrows...
          </p>
        ) : error && borrows.length === 0 ? null : borrows.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-line bg-white p-8 text-center sm:p-12">
            <h2 className="text-xl font-semibold text-brand-dark">
              No borrowed books yet
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Browse the shared catalog to find your next read.
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
              href="/catalog"
            >
              Explore the catalog
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {borrows.map((borrow) => (
              <article
                className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_70px_-48px_rgba(32,43,37,0.35)] sm:p-7"
                key={borrow.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-[#e9eee5] px-3 py-1 text-xs font-medium text-brand">
                      {borrow.book.category}
                    </span>
                    <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-brand-dark">
                      {borrow.book.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted">by {borrow.book.author}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      borrow.status === "active"
                        ? "bg-[#e9f2e9] text-brand"
                        : "bg-[#f0f1e9] text-muted"
                    }`}
                  >
                    {borrow.status === "active" ? "Borrowed" : "Returned"}
                  </span>
                </div>
                <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-muted">Borrowed</dt>
                    <dd className="mt-1 font-medium text-brand-dark">
                      {formatDate(borrow.borrowedAt)}
                    </dd>
                  </div>
                  {borrow.returnedAt && (
                    <div>
                      <dt className="text-muted">Returned</dt>
                      <dd className="mt-1 font-medium text-brand-dark">
                        {formatDate(borrow.returnedAt)}
                      </dd>
                    </div>
                  )}
                </dl>
                {borrow.status === "active" && (
                  <button
                    className="mt-6 min-h-11 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={returningId === borrow.id}
                    onClick={() => void handleReturn(borrow)}
                    type="button"
                  >
                    {returningId === borrow.id ? "Returning..." : "Return book"}
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
