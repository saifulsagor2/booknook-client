"use client";

import { useState, type FormEvent } from "react";
import type { BookInput } from "@/lib/books";

type BookFormProps = {
  initialValues?: BookInput;
  submitLabel: string;
  onCancel?: () => void;
  onSubmit: (values: BookInput) => Promise<void>;
};

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-line bg-[#fcfcfa] px-4 font-normal text-foreground outline-none transition placeholder:text-[#9aa39b] focus:border-brand focus:ring-2 focus:ring-brand/15";

export function BookForm({
  initialValues,
  submitLabel,
  onCancel,
  onSubmit,
}: BookFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const values: BookInput = {
      title: String(formData.get("title")).trim(),
      author: String(formData.get("author")).trim(),
      category: String(formData.get("category")).trim(),
      description: String(formData.get("description")).trim(),
      availableCopies: Number(formData.get("availableCopies")),
      isShared: formData.get("isShared") === "on",
    };

    try {
      await onSubmit(values);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "The book could not be saved. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-[0_24px_70px_-48px_rgba(32,43,37,0.35)] sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-brand-dark">
          Title
          <input
            autoComplete="off"
            className={fieldClassName}
            maxLength={150}
            name="title"
            placeholder="Book title"
            required
            defaultValue={initialValues?.title ?? ""}
          />
        </label>
        <label className="block text-sm font-medium text-brand-dark">
          Author
          <input
            autoComplete="off"
            className={fieldClassName}
            maxLength={100}
            name="author"
            placeholder="Author name"
            required
            defaultValue={initialValues?.author ?? ""}
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-brand-dark">
        Category
        <input
          autoComplete="off"
          className={fieldClassName}
          maxLength={60}
          name="category"
          placeholder="Fiction, memoir, adventure..."
          required
          defaultValue={initialValues?.category ?? ""}
        />
      </label>
      <label className="block text-sm font-medium text-brand-dark">
        Description <span className="font-normal text-muted">(optional)</span>
        <textarea
          className={`${fieldClassName} min-h-32 resize-y py-3`}
          maxLength={1200}
          name="description"
          placeholder="What makes this book worth sharing?"
          defaultValue={initialValues?.description ?? ""}
        />
      </label>
      <div className="grid gap-5 rounded-2xl bg-[#f8f7f2] p-4 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-center">
        <label className="flex items-start gap-3 text-sm font-medium text-brand-dark">
          <input
            className="mt-1 h-4 w-4 accent-[#315c4a]"
            name="isShared"
            type="checkbox"
            defaultChecked={initialValues?.isShared ?? false}
          />
          <span>
            Share in the borrow catalog
            <span className="mt-1 block font-normal leading-6 text-muted">
              Your book stays private unless you enable sharing.
            </span>
          </span>
        </label>
        <label className="block text-sm font-medium text-brand-dark">
          Available copies
          <input
            className={fieldClassName}
            max={10000}
            min={0}
            name="availableCopies"
            required
            type="number"
            defaultValue={initialValues?.availableCopies ?? 1}
          />
        </label>
      </div>

      {error && (
        <p className="rounded-xl bg-[#fff0ed] px-4 py-3 text-sm text-[#913f31]" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            className="min-h-12 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-brand-dark transition hover:bg-[#f8f7f2] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        )}
        <button
          className="min-h-12 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
