import clsx from "clsx";
import { PatternId } from "@/lib/types";
import { Crown } from "@/components/icons/Crown";

const TONE_BG: Record<string, string> = {
  ink: "bg-ink",
  cream: "bg-cream-soft",
  gold: "bg-gold",
};

const TONE_LINE: Record<string, string> = {
  ink: "stroke-cream/[0.14]",
  cream: "stroke-ink/[0.14]",
  gold: "stroke-ink/[0.16]",
};

const TONE_MARK: Record<string, string> = {
  ink: "text-cream/[0.22]",
  cream: "text-ink/[0.18]",
  gold: "text-ink/[0.2]",
};

function Pattern({ id, className }: { id: PatternId; className: string }) {
  const patternId = `p-${id}`;
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        {id === "quilt" && (
          <pattern id={patternId} width="42" height="42" patternUnits="userSpaceOnUse">
            <path
              d="M0 21 L21 0 M21 42 L42 21"
              className={className}
              fill="none"
              strokeWidth="1"
            />
          </pattern>
        )}
        {id === "rib" && (
          <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="2" y1="0" x2="2" y2="10" className={className} strokeWidth="1" />
          </pattern>
        )}
        {id === "weave" && (
          <pattern id={patternId} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0 H14 M0 7 H14" className={className} strokeWidth="1" />
            <path d="M0 0 V14 M7 0 V14" className={className} strokeWidth="0.5" />
          </pattern>
        )}
        {id === "herringbone" && (
          <pattern id={patternId} width="24" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 12 L12 0 L24 12" className={className} fill="none" strokeWidth="1" />
          </pattern>
        )}
        {id === "grid" && (
          <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className={className} fill="currentColor" stroke="none" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function ProductVisual({
  pattern,
  tone,
  className,
}: {
  pattern: PatternId;
  tone: "ink" | "cream" | "gold";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden grain",
        TONE_BG[tone],
        tone === "ink" ? "text-cream" : "text-ink",
        className
      )}
    >
      <Pattern id={pattern} className={TONE_LINE[tone]} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Crown className={clsx("h-16 w-20 sm:h-20 sm:w-24", TONE_MARK[tone])} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </div>
  );
}
