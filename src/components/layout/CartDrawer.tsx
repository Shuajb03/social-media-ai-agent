"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";
import { useCartStore } from "@/lib/store/cart";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { ProductThumb } from "@/components/ProductThumb";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const close = useUIStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex h-20 items-center justify-between border-b border-line px-6">
              <h2 className="font-display text-xl text-ink">
                Your Bag {lines.length > 0 && `(${lines.length})`}
              </h2>
              <button type="button" aria-label="Close cart" onClick={close}>
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-sm text-ink/60">Your bag is currently empty.</p>
                <Button href="/shop" onClick={close} size="sm">
                  Continue shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-6">
                    {lines.map((line) => {
                      const product = products.find((p) => p.id === line.productId);
                      if (!product) return null;
                      return (
                        <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-4">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={close}
                            className="relative h-28 w-24 shrink-0 overflow-hidden"
                          >
                            <ProductThumb product={product} sizes="96px" className="h-full w-full" />
                          </Link>
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <Link href={`/product/${product.slug}`} onClick={close}>
                                  <h3 className="font-display text-base leading-tight text-ink">
                                    {product.name}
                                  </h3>
                                </Link>
                                <span className="shrink-0 text-sm text-ink">
                                  {formatPrice(product.price * line.quantity)}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-ink/50">
                                {line.color} &middot; {line.size}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 border border-line px-2 py-1">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() =>
                                    setQuantity(line.productId, line.size, line.color, line.quantity - 1)
                                  }
                                >
                                  <Minus className="h-3 w-3" strokeWidth={1.5} />
                                </button>
                                <span className="w-4 text-center text-xs">{line.quantity}</span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    setQuantity(line.productId, line.size, line.color, line.quantity + 1)
                                  }
                                >
                                  <Plus className="h-3 w-3" strokeWidth={1.5} />
                                </button>
                              </div>
                              <button
                                type="button"
                                className="text-[11px] uppercase tracking-widest-plus text-ink/40 underline underline-offset-4 hover:text-ink"
                                onClick={() => removeLine(line.productId, line.size, line.color)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="border-t border-line px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <Button href="/cart" onClick={close} className="w-full">
                    View bag &amp; checkout
                  </Button>
                  <p className="mt-3 text-center text-[11px] text-ink/40">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
