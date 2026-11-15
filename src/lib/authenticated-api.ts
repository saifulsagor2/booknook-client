import { authClient } from "@/lib/auth-client";

export type AuthenticatedUser = {
  id: string;
  email: string | null;
  name: string | null;
};

export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Your session could not be verified. Please sign in again.");
  }

  const response = await fetch("/api/me", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("The BookNook API could not verify your session.");
  }

  const result = (await response.json()) as { user?: AuthenticatedUser };
  if (!result.user?.id) {
    throw new Error("The BookNook API returned an invalid user profile.");
  }

  return result.user;
}
