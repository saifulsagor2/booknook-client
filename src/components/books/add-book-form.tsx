"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookForm } from "@/components/books/book-form";
import { Container } from "@/components/ui/container";
import { createBook } from "@/lib/books";

export function AddBookForm() {
  const router = useRouter();

  const handleSubmit = async (values: Parameters<typeof createBook>[0]) => {
    await createBook(values);
    router.replace("/my-books");
    router.refresh();
  };

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <div className="mb-8">
          <Link
            className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
            href="/my-books"
          >
            Back to my books
          </Link>
          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Your reading space
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
            Add a book
          </h1>
          <p className="mt-4 max-w-xl leading-7 text-muted">
            Add a favorite to your personal shelf.
          </p>
        </div>
        <div className="max-w-3xl">
          <BookForm submitLabel="Add book" onSubmit={handleSubmit} />
        </div>
      </Container>
    </main>
  );
}
