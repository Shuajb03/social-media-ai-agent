"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { useUIStore } from "@/lib/store/ui";
import { Crown } from "@/components/icons/Crown";

export function MobileMenu() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-cream lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex h-20 items-center justify-between border-b border-line px-5">
              <div className="flex items-center gap-2 text-ink">
                <Crown className="h-5 w-6" />
                <span className="font-display text-xl tracking-[0.18em]">SKUBI</span>
              </div>
              <button type="button" aria-label="Close menu" onClick={close}>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <p className="mb-3 text-[11px] uppercase tracking-widest-plus text-ink/40">
                Shop
              </p>
              <ul className="mb-6 space-y-4">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/shop/${category.slug}`}
                      onClick={close}
                      className="font-display text-2xl text-ink"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mb-6 border-t border-line" />
              <ul className="space-y-4">
                {[
                  { label: "About", href: "/about" },
                  { label: "Journal", href: "/journal" },
                  { label: "Contact", href: "/contact" },
                  { label: "Wishlist", href: "/wishlist" },
                  { label: "Account", href: "/account/login" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className="text-sm uppercase tracking-widest-plus text-ink/70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
