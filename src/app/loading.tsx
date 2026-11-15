import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <main
      aria-label="Loading BookNook"
      aria-live="polite"
      className="flex flex-1 items-center py-16 sm:py-24"
    >
      <Container>
        <div className="h-4 w-44 animate-pulse rounded-full bg-[#e4e6dc]" />
        <div className="mt-6 h-12 max-w-xl animate-pulse rounded-xl bg-[#e4e6dc]" />
        <div className="mt-3 h-12 max-w-md animate-pulse rounded-xl bg-[#e4e6dc]" />
        <div className="mt-5 h-5 max-w-lg animate-pulse rounded-full bg-[#e4e6dc]" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              aria-hidden="true"
              className="aspect-[4/4.7] animate-pulse rounded-2xl bg-[#e4e6dc]"
              key={item}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
