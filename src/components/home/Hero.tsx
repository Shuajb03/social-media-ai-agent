"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ProductVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <ProductVisual pattern="quilt" tone="ink" className="absolute inset-0 h-full w-full opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/40 to-ink" />
      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-[1440px] flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src="/brand/sk-mark-cream.png"
            alt=""
            width={471}
            height={495}
            className="mx-auto mb-6 h-14 w-auto"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mb-5 text-[11px] uppercase tracking-widest-plus text-gold"
        >
          Chapter I &middot; The Archive
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-display text-5xl leading-[1.05] text-balance text-cream sm:text-6xl lg:text-7xl"
        >
          Heritage, worn quietly.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mx-auto mt-6 max-w-lg text-balance text-base leading-relaxed text-cream/70"
        >
          Considered outerwear, knitwear, and essentials for people who buy for the
          craft, not the hype cycle.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/shop" variant="secondary" size="lg">
            Shop the Archive
          </Button>
          <Button href="/about" variant="outline-cream" size="lg">
            Our Story
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
