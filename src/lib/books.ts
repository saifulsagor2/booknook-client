import { API_BASE_URL } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export type BookInput = {
  title: string;
  author: string;
  category: string;
  description: string;
  availableCopies: number;
  isShared: boolean;
};

export type Book = BookInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
  canBorrow: boolean;
};

async function requestBooks(path: string, init?: RequestInit) {
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new Error("Your session could not be verified. Please sign in again.");
  }

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  if (init?.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}/api/books${path}`, {
    ...init,
    headers,
  });
  if (!response.ok) {
    const result = (await response.json()) as { message?: string };
    throw new Error(result.message || "The book request could not be completed.");
  }
  return response;
}

export async function getBooks(): Promise<Book[]> {
  const response = await requestBooks("");
  const result = (await response.json()) as { books?: Book[] };
  if (!Array.isArray(result.books)) {
    throw new Error("The BookNook API returned an invalid book list.");
  }
  return result.books;
}

export async function getCatalogBooks(): Promise<Book[]> {
  const response = await requestBooks("/catalog");
  const result = (await response.json()) as { books?: Book[] };
  if (!Array.isArray(result.books)) {
    throw new Error("The BookNook API returned an invalid catalog.");
  }
  return result.books;
}

export async function getCatalogBook(id: string): Promise<Book> {
  const response = await requestBooks(`/catalog/${encodeURIComponent(id)}`);
  const result = (await response.json()) as { book?: Book };
  if (!result.book?.id) {
    throw new Error("The BookNook API returned an invalid book.");
  }
  return result.book;
}

export async function createBook(input: BookInput): Promise<Book> {
  const response = await requestBooks("", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const result = (await response.json()) as { book?: Book };
  if (!result.book?.id) {
    throw new Error("The BookNook API returned an invalid book.");
  }
  return result.book;
}

export async function updateBook(id: string, input: BookInput): Promise<Book> {
  const response = await requestBooks(`/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  const result = (await response.json()) as { book?: Book };
  if (!result.book?.id) {
    throw new Error("The BookNook API returned an invalid book.");
  }
  return result.book;
}

export async function removeBook(id: string): Promise<void> {
  await requestBooks(`/${encodeURIComponent(id)}`, { method: "DELETE" });
}
