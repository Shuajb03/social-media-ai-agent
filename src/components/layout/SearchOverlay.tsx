"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";
import { searchProducts } from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { formatPrice } from "@/lib/format";
import { ProductVisual } from "@/components/ProductVisual";
import { Container } from "@/components/ui/Container";

export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");
  const results = searchProducts(query);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container>
            <div className="flex h-20 items-center justify-between border-b border-line">
              <div className="flex flex-1 items-center gap-4">
                <Search className="h-5 w-5 text-ink/40" strokeWidth={1.5} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="w-full bg-transparent font-display text-xl text-ink placeholder:text-ink/30 focus:outline-none"
                />
              </div>
              <button type="button" aria-label="Close search" onClick={close}>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="py-10">
              {query.trim() === "" ? (
                <p className="text-sm text-ink/50">
                  Try &ldquo;Overcoat&rdquo;, &ldquo;Knitwear&rdquo;, or &ldquo;Bestseller&rdquo;.
                </p>
              ) : results.length === 0 ? (
                <p className="text-sm text-ink/50">No results for &ldquo;{query}&rdquo;.</p>
              ) : (
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                  {results.map((product) => {
                    const category = getCategory(product.category);
                    return (
                      <Link key={product.id} href={`/product/${product.slug}`} onClick={close}>
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <ProductVisual
                            pattern={category?.pattern ?? "grid"}
                            tone={product.tone}
                            className="h-full w-full"
                          />
                        </div>
                        <h3 className="mt-3 font-display text-base text-ink">{product.name}</h3>
                        <p className="mt-1 text-sm text-ink/60">{formatPrice(product.price)}</p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
