type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-dark sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        {description}
      </p>
    </div>
  );
}
