"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { authClient } from "@/lib/auth-client";

const navigation = [
  { href: "/#discover", label: "Discover" },
  { href: "/catalog", label: "Borrow books" },
  { href: "/#about", label: "Our nook" },
];

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 place-items-center rounded-2xl bg-brand text-white"
    >
      <svg fill="none" height="22" viewBox="0 0 24 24" width="22">
        <path
          d="M4.5 5.5c2.8-.9 5.3-.5 7.5 1.2v12c-2.2-1.7-4.7-2.1-7.5-1.2v-12Zm15 0c-2.8-.9-5.3-.5-7.5 1.2v12c2.2-1.7 4.7-2.1 7.5-1.2v-12Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    </span>
  );
}

export function SiteNavbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setSignOutError("");

    try {
      const { error } = await authClient.signOut();
      if (error) {
        setSignOutError("We couldn't sign you out. Please try again.");
        return;
      }

      setMobileMenuOpen(false);
      setProfileMenuOpen(false);
      router.replace("/");
      router.refresh();
    } catch {
      setSignOutError("We couldn't sign you out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  const accountLinks = session ? (
    <>
      <div className="relative">
        <button
          aria-controls="profile-menu"
          aria-expanded={profileMenuOpen}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-brand hover:bg-[#edf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          onClick={() => setProfileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {session.user.name || session.user.email}
          <svg
            aria-hidden="true"
            className={`h-4 w-4 transition-transform ${profileMenuOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </button>
        {profileMenuOpen && (
          <div
            aria-label="Profile options"
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-xl"
            id="profile-menu"
          >
            <div className="border-b border-line px-3 py-3">
              <p className="font-semibold text-brand-dark">
                {session.user.name || "BookNook reader"}
              </p>
              <p className="mt-1 break-all text-xs text-muted">
                {session.user.email}
              </p>
            </div>
            <Link
              className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-[#f0f1e9]"
              href="/profile"
              onClick={() => setProfileMenuOpen(false)}
            >
              My profile
            </Link>
            <button
              className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-brand hover:bg-[#f0f1e9] disabled:opacity-60"
              disabled={isSigningOut}
              onClick={handleSignOut}
              type="button"
            >
              {isSigningOut ? "Signing out…" : "Log out"}
            </button>
            {signOutError && (
              <p className="px-3 py-2 text-sm text-red-700" role="alert">
                {signOutError}
              </p>
            )}
          </div>
        )}
      </div>
      <Link
        className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-[#edf0e9] hover:text-brand"
        href="/my-books"
      >
        My books
      </Link>
      <Link
        className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-[#edf0e9] hover:text-brand"
        href="/my-borrows"
      >
        My borrows
      </Link>
    </>
  ) : (
    <>
      <Link
        className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:text-brand"
        href="/login"
      >
        Log in
      </Link>
      <Link
        className="rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        href="/register"
      >
        Create account
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[#f8f7f2]/90 backdrop-blur-xl">
      <Container className="flex h-[4.75rem] items-center justify-between">
        <Link
          aria-label="BookNook home"
          className="flex items-center gap-3"
          href="/"
        >
          <BrandMark />
          <span>
            <span className="block text-lg font-semibold leading-tight tracking-[-0.04em] text-brand-dark">
              BookNook
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:block">
              find your next favorite
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-3 lg:flex">
          {navigation.map((item) => (
            <Link
              className="text-sm font-medium text-muted transition hover:text-brand"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
          {isPending ? (
            <span aria-live="polite" className="text-sm text-muted">
              Checking session…
            </span>
          ) : (
            accountLinks
          )}
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-line text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
            <svg
              aria-hidden="true"
              className={mobileMenuOpen ? "hidden" : "block"}
              fill="none"
              height="21"
              viewBox="0 0 24 24"
              width="21"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.7"
              />
            </svg>
            <svg
              aria-hidden="true"
              className={mobileMenuOpen ? "block" : "hidden"}
              fill="none"
              height="21"
              viewBox="0 0 24 24"
              width="21"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.7"
              />
            </svg>
        </button>
      </Container>
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-line bg-white py-3 lg:hidden"
          id="mobile-navigation"
        >
          <Container className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-[#f0f1e9]"
                href={item.href}
                key={item.label}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {session && (
              <>
                <Link
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-[#f0f1e9]"
                  href="/my-books"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My books
                </Link>
                <Link
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-[#f0f1e9]"
                  href="/my-borrows"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My borrows
                </Link>
                <Link
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-[#f0f1e9]"
                  href="/add-book"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add a book
                </Link>
              </>
            )}
            {isPending ? (
              <p aria-live="polite" className="px-4 py-3 text-sm text-muted">
                Checking session…
              </p>
            ) : session ? (
              <>
                <div className="px-4 py-3">
                  <p className="font-semibold text-brand-dark">{session.user.name}</p>
                  <p className="mt-1 text-sm text-muted">{session.user.email}</p>
                </div>
                <Link
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-[#f0f1e9]"
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My profile
                </Link>
                <button
                  className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-brand hover:bg-[#f0f1e9] disabled:opacity-60"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  type="button"
                >
                  {isSigningOut ? "Signing out…" : "Log out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-[#f0f1e9]"
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  className="rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white"
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create account
                </Link>
              </>
            )}
            {signOutError && (
              <p className="px-4 py-2 text-sm text-red-700" role="alert">
                {signOutError}
              </p>
            )}
          </Container>
        </nav>
      )}
    </header>
  );
}
