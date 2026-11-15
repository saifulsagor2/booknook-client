import { FeaturedBooks } from "@/components/books/featured-books";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const readingNotes = [
  {
    number: "01",
    title: "Find a feeling",
    description: "Start with the mood you want, then follow a story there.",
  },
  {
    number: "02",
    title: "Meet your next read",
    description: "Explore thoughtful picks from a shelf made for the curious.",
  },
  {
    number: "03",
    title: "Make room for wonder",
    description: "Keep a little space in your day for a really good book.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#e8eee4] blur-3xl"
        />
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9e3d8] bg-white/70 px-4 py-2 text-sm font-medium text-brand">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              A little nook for big imaginations
            </p>
            <h1 className="text-5xl font-semibold leading-[1.06] tracking-[-0.055em] text-brand-dark sm:text-6xl lg:text-7xl">
              Stories make
              <br />
              <span className="font-serif font-normal italic text-brand">
                room for wonder.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
              Find a quieter moment, meet a new favorite, and let the next
              chapter take you somewhere lovely.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                href="#discover"
              >
                Explore the shelves
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-brand transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                href="#about"
              >
                Get to know us
              </a>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-line pt-6">
              <div aria-hidden="true" className="flex -space-x-2">
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#f8f7f2] bg-[#d6aa83] text-xs font-semibold text-white">
                  A
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#f8f7f2] bg-[#708875] text-xs font-semibold text-white">
                  M
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#f8f7f2] bg-[#a77768] text-xs font-semibold text-white">
                  J
                </span>
              </div>
              <p className="text-sm text-muted">
                Made for readers who love{" "}
                <span className="font-medium text-foreground">getting lost.</span>
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-x-8 bottom-4 top-8 rotate-[-5deg] rounded-[2rem] bg-[#e5e9dd]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[#e9ede3] p-5 shadow-[0_30px_90px_-45px_rgba(32,43,37,0.42)] sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    The Sunday shelf
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    A good place to begin
                  </p>
                </div>
                <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-brand">
                  Vol. 01
                </span>
              </div>
              <div
                aria-label="A small stack of illustrated books"
                className="mt-8 flex h-64 items-end justify-center gap-3 sm:h-80 sm:gap-4"
                role="img"
              >
                <div className="relative h-[70%] w-[27%] -rotate-6 rounded-t-lg rounded-b-sm bg-[#bf7858] p-3 text-[#fff3dc] shadow-xl sm:p-4">
                  <span className="block h-full border border-[#f3c9a5]/50 p-2 text-xs font-medium leading-tight sm:p-3 sm:text-sm">
                    THE
                    <br />
                    TIDELINE
                    <span className="mt-4 block text-[9px] font-normal uppercase tracking-[0.15em] sm:text-[10px]">
                      stories of home
                    </span>
                  </span>
                </div>
                <div className="relative z-10 h-[88%] w-[31%] rounded-t-lg rounded-b-sm bg-[#345f4c] p-3 text-[#f3e8c9] shadow-2xl sm:p-4">
                  <span className="block h-full border border-[#f3e8c9]/40 p-2 text-center text-xs font-medium leading-tight sm:p-3 sm:text-sm">
                    A GARDEN
                    <br />
                    OF SMALL
                    <br />
                    THINGS
                    <span className="mt-5 block text-[9px] font-normal uppercase tracking-[0.15em] sm:text-[10px]">
                      a field guide
                    </span>
                  </span>
                </div>
                <div className="relative h-[76%] w-[27%] rotate-6 rounded-t-lg rounded-b-sm bg-[#d3a75d] p-3 text-[#4c3922] shadow-xl sm:p-4">
                  <span className="block h-full border border-[#725b36]/40 p-2 text-xs font-medium leading-tight sm:p-3 sm:text-sm">
                    THE
                    <br />
                    LONG WAY
                    <br />
                    HOME
                    <span className="mt-4 block text-[9px] font-normal uppercase tracking-[0.15em] sm:text-[10px]">
                      notes from a walk
                    </span>
                  </span>
                </div>
              </div>
              <div className="mt-7 flex items-center justify-between border-t border-[#cbd3c5] pt-5">
                <p className="text-sm font-medium text-brand-dark">
                  Stories worth slowing down for
                </p>
                <span aria-hidden="true" className="text-xl text-brand">
                  ✳
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24" id="discover">
        <Container>
          <SectionHeading
            eyebrow="A few good places to start"
            title="Stories for your kind of day"
            description="A small collection of thoughtful reads for curious minds and slow afternoons."
          />
          <div className="mt-10">
            <FeaturedBooks />
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-[#f0f1e9] py-20 sm:py-24" id="about">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                The BookNook feeling
              </p>
              <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.04em] text-brand-dark sm:text-4xl">
                Less scrolling.
                <br />
                More turning pages.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {readingNotes.map((note) => (
                <article key={note.number} className="border-t border-[#cbd3c5] pt-5">
                  <p className="text-sm font-medium text-accent">{note.number}</p>
                  <h3 className="mt-4 text-lg font-semibold text-brand-dark">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {note.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
