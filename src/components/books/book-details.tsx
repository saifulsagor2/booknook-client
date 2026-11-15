"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { borrowBook } from "@/lib/borrows";
import { getCatalogBook, type Book } from "@/lib/books";

type BookDetailsProps = {
  bookId: string;
};

export function BookDetails({ bookId }: BookDetailsProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let isMounted = true;
    getCatalogBook(bookId)
      .then((result) => {
        if (isMounted) {
          setBook(result);
        }
      })
      .catch((loadError: unknown) => {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Book details could not be loaded.",
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
  }, [bookId]);

  const handleBorrow = async () => {
    if (!book || book.availableCopies === 0 || !book.canBorrow) {
      return;
    }

    setIsBorrowing(true);
    setError("");
    try {
      await borrowBook(book.id);
      setBook((current) =>
        current
          ? { ...current, availableCopies: current.availableCopies - 1 }
          : current,
      );
      setIsModalOpen(false);
      setNotice("This book is now in My Borrows.");
    } catch (borrowError) {
      setError(
        borrowError instanceof Error
          ? borrowError.message
          : "The book could not be borrowed. Please try again.",
      );
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <Link
          className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
          href="/catalog"
        >
          Back to borrow books
        </Link>

        {isLoading ? (
          <p aria-live="polite" className="mt-8 text-muted">
            Loading book details...
          </p>
        ) : error && !book ? (
          <p className="mt-8 rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#913f31]" role="alert">
            {error}
          </p>
        ) : book ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
            <article className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_70px_-48px_rgba(32,43,37,0.35)] sm:p-9">
              <span className="rounded-full bg-[#e9eee5] px-3 py-1 text-xs font-medium text-brand">
                {book.category}
              </span>
              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
                {book.title}
              </h1>
              <p className="mt-2 text-base text-muted">by {book.author}</p>
              {book.description && (
                <p className="mt-7 border-t border-line pt-6 leading-7 text-muted">
                  {book.description}
                </p>
              )}
            </article>

            <aside className="h-fit rounded-3xl border border-line bg-[#f0f1e9] p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                Availability
              </p>
              <p className="mt-3 text-2xl font-semibold text-brand-dark">
                {book.availableCopies === 0
                  ? "No copies available"
                  : `${book.availableCopies} ${book.availableCopies === 1 ? "copy" : "copies"}`}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Borrow one copy at a time. Your loan will appear in My Borrows.
              </p>
              {notice && (
                <p className="mt-4 rounded-xl bg-[#e9f2e9] px-4 py-3 text-sm text-brand-dark" role="status">
                  {notice}
                </p>
              )}
              {error && (
                <p className="mt-4 rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#913f31]" role="alert">
                  {error}
                </p>
              )}
              {book.canBorrow ? (
                <button
                  className="mt-6 min-h-12 w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={book.availableCopies === 0}
                  onClick={() => setIsModalOpen(true)}
                  type="button"
                >
                  {book.availableCopies === 0 ? "Unavailable" : "Borrow this book"}
                </button>
              ) : (
                <p className="mt-6 rounded-xl bg-white px-4 py-3 text-sm text-muted">
                  This is your shared book.
                </p>
              )}
            </aside>
          </div>
        ) : null}
      </Container>

      {isModalOpen && book && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#17241d]/55 p-4">
          <section
            aria-describedby="borrow-confirmation-description"
            aria-labelledby="borrow-confirmation-title"
            aria-modal="true"
            className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            role="dialog"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              Borrow confirmation
            </p>
            <h2
              className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-brand-dark"
              id="borrow-confirmation-title"
            >
              Borrow this book?
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted" id="borrow-confirmation-description">
              You are borrowing one available copy of <strong>{book.title}</strong> by{" "}
              {book.author}. It will be added to your My Borrows list.
            </p>
            <p className="mt-4 rounded-xl bg-[#f0f1e9] px-4 py-3 text-sm text-brand-dark">
              {book.availableCopies} {book.availableCopies === 1 ? "copy" : "copies"} available
            </p>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="min-h-11 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-[#f8f7f2] disabled:opacity-60"
                disabled={isBorrowing}
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="min-h-11 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isBorrowing || book.availableCopies === 0}
                onClick={() => void handleBorrow()}
                type="button"
              >
                {isBorrowing ? "Borrowing..." : "Confirm borrow"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
