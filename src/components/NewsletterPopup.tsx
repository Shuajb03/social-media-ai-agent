"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Crown } from "@/components/icons/Crown";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  hasNewsletterPopupBeenDismissed,
  markNewsletterPopupDismissed,
} from "@/lib/newsletterPopup";

const EXCLUDED_PATHS = ["/cart", "/checkout"];
const DELAY_MS = 20000;
const SCROLL_TRIGGER_RATIO = 0.5;

export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const excluded = EXCLUDED_PATHS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (excluded || dismissed || hasNewsletterPopupBeenDismissed()) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    const timer = setTimeout(trigger, DELAY_MS);

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER_RATIO) {
        trigger();
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [excluded, dismissed]);

  function close() {
    setOpen(false);
    setDismissed(true);
    markNewsletterPopupDismissed();
  }

  if (excluded) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[60] sm:inset-0 sm:flex sm:items-center sm:justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="relative mx-auto w-full max-w-md bg-cream p-8 text-center sm:p-10">
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="absolute right-4 top-4 text-ink/50 hover:text-ink"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>

              <Crown className="mx-auto mb-5 h-7 w-9 text-gold-deep" />
              <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">
                Chapter I is coming
              </p>
              <h2 className="font-display text-2xl leading-tight text-balance text-ink sm:text-3xl">
                Join the Archive before it opens.
              </h2>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-ink/65">
                Founding members get first access when Chapter I launches. No discount
                games — just being first.
              </p>

              <div className="mt-6 flex justify-center">
                <NewsletterForm tone="ink" onSuccess={() => setTimeout(close, 2000)} />
              </div>

              <button
                type="button"
                onClick={close}
                className="mt-5 text-[11px] uppercase tracking-widest-plus text-ink/40 hover:text-ink"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
