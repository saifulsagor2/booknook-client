"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { PasswordInput } from "@/components/ui/password-input";

type AuthFormProps = {
  mode: "login" | "register";
};

function getCallbackPath() {
  const defaultPath = "/profile";
  const callbackURL = new URLSearchParams(window.location.search).get(
    "callbackURL",
  );
  if (!callbackURL) {
    return defaultPath;
  }

  try {
    const url = new URL(callbackURL, window.location.origin);
    if (url.origin !== window.location.origin) {
      return defaultPath;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return defaultPath;
  }
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  const showError = (errorMessage: string) => {
    setMessageType("error");
    setMessage(errorMessage);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    const callbackPath = getCallbackPath();
    const callbackURL = new URL(callbackPath, window.location.origin).href;

    if (isRegister) {
      const name = String(formData.get("name")).trim();
      const confirmPassword = String(formData.get("confirmPassword"));

      if (password !== confirmPassword) {
        showError("Your passwords do not match.");
        return;
      }

      setIsLoading(true);
      try {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL,
        });
        if (error) {
          showError(error.message || "We couldn't create your account.");
          return;
        }

        setMessageType("success");
        setMessage("Your account is ready. Taking you there…");
        router.replace(callbackPath);
        router.refresh();
      } catch {
        showError("We couldn't create your account. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL,
      });
      if (error) {
        showError(error.message || "We couldn't sign you in.");
        return;
      }

      setMessageType("success");
      setMessage("Welcome back. Taking you there…");
      router.replace(callbackPath);
      router.refresh();
    } catch {
      showError("We couldn't sign you in. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setMessage("");
    setIsLoading(true);
    const callbackURL = new URL(
      getCallbackPath(),
      window.location.origin,
    ).href;

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
      if (error) {
        showError(error.message || "Google sign-in is unavailable.");
        setIsLoading(false);
      }
    } catch {
      showError("Google sign-in is unavailable. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-[0_24px_70px_-48px_rgba(32,43,37,0.55)] sm:p-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          {isRegister ? "Join the nook" : "Welcome back"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark">
          {isRegister ? "Create your account" : "Sign in to BookNook"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          {isRegister
            ? "Save your place and make room for more good stories."
            : "Your next favorite story is right where you left it."}
        </p>
      </div>

      <button
        className="mt-7 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-line px-4 text-sm font-semibold text-brand-dark transition hover:bg-[#f8f7f2] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        type="button"
      >
        <svg aria-hidden="true" height="18" viewBox="0 0 48 48" width="18">
          <path
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z"
            fill="#4285F4"
          />
          <path
            d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4 1.9-6.8 1.9-5.2 0-9.6-3.5-11.2-8.2H5.9v5.2A20 20 0 0 0 24 44Z"
            fill="#34A853"
          />
          <path
            d="M12.8 27.7a12 12 0 0 1 0-7.4v-5.2H5.9a20 20 0 0 0 0 17.8l6.9-5.2Z"
            fill="#FBBC05"
          />
          <path
            d="M24 12.1c3 0 5.7 1 7.8 3.1l5.9-5.9A19.7 19.7 0 0 0 24 4 20 20 0 0 0 5.9 15.1l6.9 5.2c1.6-4.7 6-8.2 11.2-8.2Z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          or use email
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {isRegister && (
          <label className="block text-sm font-medium text-brand-dark">
            Name
            <input
              autoComplete="name"
              className="mt-2 min-h-12 w-full rounded-xl border border-line bg-[#fcfcfa] px-4 font-normal outline-none transition placeholder:text-[#9aa39b] focus:border-brand focus:ring-2 focus:ring-brand/15"
              maxLength={80}
              minLength={2}
              name="name"
              placeholder="Your name"
              required
            />
          </label>
        )}
        <label className="block text-sm font-medium text-brand-dark">
          Email
          <input
            autoComplete="email"
            className="mt-2 min-h-12 w-full rounded-xl border border-line bg-[#fcfcfa] px-4 font-normal outline-none transition placeholder:text-[#9aa39b] focus:border-brand focus:ring-2 focus:ring-brand/15"
            maxLength={254}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>
        <div>
          <label
            className="block text-sm font-medium text-brand-dark"
            htmlFor="password"
          >
            Password
          </label>
          <PasswordInput
            autoComplete={isRegister ? "new-password" : "current-password"}
            id="password"
            maxLength={128}
            minLength={8}
            name="password"
            placeholder="At least 8 characters"
            required
            visibilityLabel="password"
          />
        </div>
        {isRegister && (
          <div>
            <label
              className="block text-sm font-medium text-brand-dark"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <PasswordInput
              autoComplete="new-password"
              id="confirmPassword"
              maxLength={128}
              minLength={8}
              name="confirmPassword"
              placeholder="Enter your password again"
              required
              visibilityLabel="confirm password"
            />
          </div>
        )}

        {message && (
          <p
            className={`rounded-xl px-4 py-3 text-sm ${
              messageType === "success"
                ? "bg-[#e9f2e9] text-brand-dark"
                : "bg-[#fff0ed] text-[#913f31]"
            }`}
            role={messageType === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        )}

        <button
          className="min-h-12 w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading
            ? "Please wait…"
            : isRegister
              ? "Create account"
              : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {isRegister ? "Already have an account?" : "New to BookNook?"}{" "}
        <Link
          className="font-semibold text-brand underline-offset-4 hover:underline"
          href={isRegister ? "/login" : "/register"}
          onClick={(event) => {
            event.preventDefault();
            const callbackPath = getCallbackPath();
            const search = new URLSearchParams({ callbackURL: callbackPath });
            router.push(
              `${isRegister ? "/login" : "/register"}?${search.toString()}`,
            );
          }}
        >
          {isRegister ? "Log in" : "Create an account"}
        </Link>
      </p>
    </section>
  );
}
