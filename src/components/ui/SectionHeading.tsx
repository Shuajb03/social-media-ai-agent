import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  tone = "ink",
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    <div className={clsx(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p
          className={clsx(
            "mb-3 text-[11px] uppercase tracking-widest-plus",
            tone === "ink" ? "text-gold-deep" : "text-gold"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] text-balance",
          tone === "ink" ? "text-ink" : "text-cream"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
