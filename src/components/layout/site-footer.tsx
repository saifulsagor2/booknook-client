import Link from "next/link";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark py-12 text-white sm:py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-sm">
            <Link
              className="inline-flex items-center gap-3 text-xl font-semibold tracking-[-0.04em]"
              href="/"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10"
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
              BookNook
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/65">
              A welcoming corner for curious readers and the stories that stay
              with us.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75">
            <Link className="transition hover:text-white" href="/#discover">
              Discover
            </Link>
            <Link className="transition hover:text-white" href="/#about">
              About BookNook
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t border-white/15 pt-5 text-xs text-white/55">
          © BookNook. Made for the love of reading.
        </div>
      </Container>
    </footer>
  );
}
