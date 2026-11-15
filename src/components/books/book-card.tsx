type BookCardProps = {
  title: string;
  author: string;
  category: string;
  theme: "forest" | "clay" | "gold";
  coverLine: string;
};

const coverThemes = {
  forest: "bg-[#315c4a] text-[#f2e9cf]",
  clay: "bg-[#b96e54] text-[#fff0df]",
  gold: "bg-[#d5ae63] text-[#48381f]",
};

export function BookCard({
  title,
  author,
  category,
  theme,
  coverLine,
}: BookCardProps) {
  return (
    <article className="group">
      <div
        aria-label={`Illustrated cover for ${title}`}
        className={`relative flex aspect-[4/4.7] items-center justify-center overflow-hidden rounded-2xl p-5 ${coverThemes[theme]}`}
        role="img"
      >
        <span
          aria-hidden="true"
          className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-current/20"
        />
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-4 h-28 w-28 rounded-full border border-current/20"
        />
        <span className="relative z-10 flex h-full w-full flex-col items-center justify-center border border-current/35 px-4 text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] opacity-80">
            A BookNook pick
          </span>
          <span className="mt-5 max-w-[13rem] font-serif text-2xl leading-tight tracking-[-0.03em] sm:text-3xl">
            {title}
          </span>
          <span className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] opacity-80">
            {coverLine}
          </span>
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h3 className="font-semibold tracking-[-0.02em] text-brand-dark">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted">{author}</p>
        </div>
        <span className="mt-0.5 shrink-0 rounded-full bg-[#e9eee5] px-3 py-1 text-[11px] font-medium text-brand">
          {category}
        </span>
      </div>
    </article>
  );
}
