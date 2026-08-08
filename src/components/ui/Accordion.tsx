"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export function Accordion({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left text-sm uppercase tracking-widest-plus text-ink"
            >
              {item.title}
              <ChevronDown
                className={clsx("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                strokeWidth={1.5}
              />
            </button>
            {isOpen && (
              <div className="pb-5 text-sm leading-relaxed text-ink/65">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
