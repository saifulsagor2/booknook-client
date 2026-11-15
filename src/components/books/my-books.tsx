"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookForm } from "@/components/books/book-form";
import { Container } from "@/components/ui/container";
import { getBooks, removeBook, updateBook, type Book, type BookInput } from "@/lib/books";

export function MyBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [confirmingBookId, setConfirmingBookId] = useState<string | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getBooks()
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
              : "Your books could not be loaded. Please try again.",
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

  const handleUpdate = async (id: string, values: BookInput) => {
    const updatedBook = await updateBook(id, values);
    setBooks((currentBooks) =>
      currentBooks.map((book) => (book.id === id ? updatedBook : book)),
    );
    setEditingBookId(null);
    setNotice("Book updated.");
  };

  const handleDelete = async (book: Book) => {
    setDeletingBookId(book.id);
    setError("");
    setNotice("");
    try {
      await removeBook(book.id);
      setBooks((currentBooks) => currentBooks.filter((item) => item.id !== book.id));
      setNotice("Book removed from your shelf.");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "The book could not be removed. Please try again.",
      );
    } finally {
      setDeletingBookId(null);
    }
  };

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Your reading space
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
              My books
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-muted">
              Keep your favorite reads together and update your shelf whenever you like.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            href="/add-book"
          >
            Add a book
          </Link>
        </header>

        {notice && (
          <p className="mt-6 rounded-xl bg-[#e9f2e9] px-4 py-3 text-sm text-brand-dark" role="status">
            {notice}
          </p>
        )}
        {error && (
          <p className="mt-6 rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#913f31]" role="alert">
            {error}
          </p>
        )}

        {isLoading ? (
          <p aria-live="polite" className="mt-10 text-muted">
            Loading your books...
          </p>
        ) : books.length === 0 && !error ? (
          <div className="mt-10 rounded-3xl border border-line bg-white p-8 text-center sm:p-12">
            <h2 className="text-xl font-semibold text-brand-dark">Your shelf is waiting</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Add a book to start building your personal collection.
            </p>
            <Link
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand"
              href="/add-book"
            >
              Add your first book
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {books.map((book) => (
              <article
                className="rounded-3xl border border-line bg-white p-6 shadow-[0_24px_70px_-48px_rgba(32,43,37,0.35)] sm:p-7"
                key={book.id}
              >
                {editingBookId === book.id ? (
                  <BookForm
                    initialValues={{
                      title: book.title,
                      author: book.author,
                      category: book.category,
                      description: book.description,
                      availableCopies: book.availableCopies,
                      isShared: book.isShared,
                    }}
                    onCancel={() => setEditingBookId(null)}
                    onSubmit={(values) => handleUpdate(book.id, values)}
                    submitLabel="Save changes"
                  />
                ) : (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <span className="rounded-full bg-[#e9eee5] px-3 py-1 text-xs font-medium text-brand">
                          {book.category}
                        </span>
                        <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-brand-dark">
                          {book.title}
                        </h2>
                        <p className="mt-1 text-sm text-muted">by {book.author}</p>
                        <p className="mt-3 text-xs font-medium text-muted">
                          {book.isShared
                            ? `Shared in catalog · ${book.availableCopies} available`
                            : "Private · not in the borrow catalog"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="min-h-10 rounded-full border border-line px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={deletingBookId === book.id}
                          onClick={() => {
                            setNotice("");
                            setEditingBookId(book.id);
                          }}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="min-h-10 rounded-full border border-[#f0d7d1] px-4 py-2 text-sm font-semibold text-[#913f31] transition hover:bg-[#fff0ed] disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={deletingBookId === book.id}
                          onClick={() => {
                            setError("");
                            setNotice("");
                            setConfirmingBookId(book.id);
                          }}
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {book.description && (
                      <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-muted">
                        {book.description}
                      </p>
                    )}
                    {confirmingBookId === book.id && (
                      <div
                        aria-labelledby={`remove-book-${book.id}`}
                        className="mt-6 rounded-2xl border border-[#f0d7d1] bg-[#fff8f6] p-4"
                        role="group"
                      >
                        <p
                          className="text-sm font-medium text-brand-dark"
                          id={`remove-book-${book.id}`}
                        >
                          Remove &quot;{book.title}&quot; from your shelf?
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            className="min-h-10 rounded-full border border-line px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-white"
                            onClick={() => setConfirmingBookId(null)}
                            type="button"
                          >
                            Keep book
                          </button>
                          <button
                            className="min-h-10 rounded-full bg-[#913f31] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#783428] disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={deletingBookId === book.id}
                            onClick={() => void handleDelete(book)}
                            type="button"
                          >
                            {deletingBookId === book.id ? "Removing..." : "Remove book"}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
