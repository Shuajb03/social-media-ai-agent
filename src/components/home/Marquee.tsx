const ITEMS = [
  "Small batches, no reprints",
  "Quality over volume",
  "No fake scarcity",
  "Heritage-sport premium",
  "Designed with intent",
];

export function Marquee() {
  const line = ITEMS.join("   •   ");
  return (
    <div className="overflow-hidden border-y border-line bg-cream-soft py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="px-4 font-display text-lg italic text-ink/70">
          {line}
          {"   •   "}
        </span>
        <span className="px-4 font-display text-lg italic text-ink/70" aria-hidden="true">
          {line}
          {"   •   "}
        </span>
      </div>
    </div>
  );
}
