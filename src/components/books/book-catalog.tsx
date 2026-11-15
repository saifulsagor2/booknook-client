"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { getCatalogBooks, type Book } from "@/lib/books";

export function BookCatalog() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    getCatalogBooks()
      .then((result) => {
        if (isMounted) {
          setBooks(result);
        }
      })
      .catch((loadError: unknown) => {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "The borrow catalog could not be loaded.",
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

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          Shared by readers
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
          Borrow books
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-muted">
          Explore books that readers have chosen to share with the community.
        </p>

        {error && (
          <p className="mt-8 rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#913f31]" role="alert">
            {error}
          </p>
        )}
        {isLoading ? (
          <p aria-live="polite" className="mt-10 text-muted">
            Loading shared books...
          </p>
        ) : error && books.length === 0 ? null : books.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-line bg-white p-8 text-center sm:p-12">
            <h2 className="text-xl font-semibold text-brand-dark">
              No books have been shared yet
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Add a book to your shelf and opt in to share it with other readers.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                className="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-[0_24px_70px_-48px_rgba(32,43,37,0.35)]"
                key={book.id}
              >
                <span className="w-fit rounded-full bg-[#e9eee5] px-3 py-1 text-xs font-medium text-brand">
                  {book.category}
                </span>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-brand-dark">
                  {book.title}
                </h2>
                <p className="mt-1 text-sm text-muted">by {book.author}</p>
                {book.description && (
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">
                    {book.description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="text-sm font-medium text-muted">
                    {book.availableCopies === 0
                      ? "Currently unavailable"
                      : `${book.availableCopies} available`}
                  </span>
                  <Link
                    className="inline-flex min-h-10 items-center rounded-full border border-line px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand"
                    href={`/books/${encodeURIComponent(book.id)}`}
                  >
                    Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
