import { authClient } from "@/lib/auth-client";

export type Borrow = {
  id: string;
  bookId: string;
  book: {
    title: string;
    author: string;
    category: string;
    description: string;
  };
  status: "active" | "returned";
  borrowedAt: string;
  returnedAt: string | null;
};

async function requestBorrows(path: string, init?: RequestInit): Promise<Response> {
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new Error("Your session could not be verified. Please sign in again.");
  }

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  if (init?.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`/api/borrows${path}`, {
    ...init,
    headers,
  });
  if (!response.ok) {
    const result = (await response.json()) as { message?: string };
    throw new Error(result.message || "The borrowing request could not be completed.");
  }
  return response;
}

export async function getBorrows(): Promise<Borrow[]> {
  const response = await requestBorrows("");
  const result = (await response.json()) as { borrows?: Borrow[] };
  if (!Array.isArray(result.borrows)) {
    throw new Error("The BookNook API returned an invalid borrow list.");
  }
  return result.borrows;
}

export async function borrowBook(bookId: string): Promise<Borrow> {
  const response = await requestBorrows("", {
    method: "POST",
    body: JSON.stringify({ bookId }),
  });
  const result = (await response.json()) as { borrow?: Borrow };
  if (!result.borrow?.id) {
    throw new Error("The BookNook API returned an invalid borrow record.");
  }
  return result.borrow;
}

export async function returnBook(id: string): Promise<Borrow> {
  const response = await requestBorrows(`/${encodeURIComponent(id)}/return`, {
    method: "PATCH",
  });
  const result = (await response.json()) as { borrow?: Borrow };
  if (!result.borrow?.id) {
    throw new Error("The BookNook API returned an invalid borrow record.");
  }
  return result.borrow;
}
