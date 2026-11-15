import { Container } from "@/components/ui/container";

type ProtectedPageProps = {
  title: string;
  description: string;
};

export function ProtectedPage({ title, description }: ProtectedPageProps) {
  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          Your reading space
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl leading-7 text-muted">{description}</p>
        <div className="mt-8 max-w-2xl rounded-3xl border border-line bg-white p-6 text-sm leading-6 text-muted sm:p-8">
          This space is ready for the next BookNook phase.
        </div>
      </Container>
    </main>
  );
}
