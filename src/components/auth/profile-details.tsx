"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import {
  getAuthenticatedUser,
  type AuthenticatedUser,
} from "@/lib/authenticated-api";
import { authClient } from "@/lib/auth-client";

type ApiIdentityState =
  | { status: "verified"; sessionUserId: string; user: AuthenticatedUser }
  | { status: "error"; sessionUserId: string; message: string }
  | null;

export function ProfileDetails() {
  const { data: session, isPending } = authClient.useSession();
  const [apiIdentity, setApiIdentity] = useState<ApiIdentityState>(null);

  useEffect(() => {
    if (!session?.user.id) {
      return;
    }

    let active = true;
    const sessionUserId = session.user.id;
    getAuthenticatedUser()
      .then((user) => {
        if (active) {
          setApiIdentity({ status: "verified", sessionUserId, user });
        }
      })
      .catch(() => {
        if (active) {
          setApiIdentity({
            status: "error",
            sessionUserId,
            message: "We couldn't confirm your profile with the BookNook API.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [session?.user.id]);

  const sessionUserId = session?.user.id;
  const currentIdentity =
    apiIdentity?.sessionUserId === sessionUserId ? apiIdentity : null;
  const isLoadingApiUser = Boolean(sessionUserId) && !currentIdentity;
  const apiUser =
    currentIdentity?.status === "verified" ? currentIdentity.user : null;
  const apiError =
    currentIdentity?.status === "error" ? currentIdentity.message : "";

  if (isPending) {
    return (
      <main className="flex flex-1 items-center py-16">
        <Container>
          <p aria-live="polite" className="text-muted">
            Loading your profile…
          </p>
        </Container>
      </main>
    );
  }

  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          Your BookNook
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
          Hello, {session?.user.name || "reader"}.
        </h1>
        <p className="mt-3 max-w-xl leading-7 text-muted">
          Your account is ready. Your personal reading space will grow with you.
        </p>

        <section className="mt-9 max-w-2xl rounded-3xl border border-line bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-brand-dark">Account details</h2>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                Name
              </dt>
              <dd className="mt-2 font-medium text-foreground">
                {session?.user.name || "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                Email
              </dt>
              <dd className="mt-2 break-all font-medium text-foreground">
                {session?.user.email || "Not available"}
              </dd>
            </div>
          </dl>
          <div className="mt-7 border-t border-line pt-5">
            <h3 className="text-sm font-semibold text-brand-dark">
              Express API identity
            </h3>
            {isLoadingApiUser ? (
              <p aria-live="polite" className="mt-2 text-sm text-muted">
                Verifying your signed-in identity…
              </p>
            ) : apiError ? (
              <p className="mt-2 text-sm text-[#913f31]" role="alert">
                {apiError}
              </p>
            ) : apiUser ? (
              <p className="mt-2 break-all text-sm text-muted">
                Verified user ID: <span className="font-mono">{apiUser.id}</span>
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted">
                Sign in to verify your API identity.
              </p>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}
