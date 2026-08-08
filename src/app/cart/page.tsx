"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ProductVisual";
import { useCartStore } from "@/lib/store/cart";
import { products } from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotal = useCartStore((s) => s.subtotal());

  const shippingEstimate = subtotal >= 150 || subtotal === 0 ? 0 : 12;

  return (
    <div className="py-14">
      <Container>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Your Bag</h1>

        {lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-5 text-center">
            <p className="text-sm text-ink/60">Your bag is currently empty.</p>
            <Button href="/shop">Continue Shopping</Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ul className="divide-y divide-line border-y border-line">
                {lines.map((line) => {
                  const product = products.find((p) => p.id === line.productId);
                  if (!product) return null;
                  const category = getCategory(product.category);
                  return (
                    <li
                      key={`${line.productId}-${line.size}-${line.color}`}
                      className="flex gap-5 py-6"
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative h-36 w-28 shrink-0 overflow-hidden sm:h-40 sm:w-32"
                      >
                        <ProductVisual
                          pattern={category?.pattern ?? "grid"}
                          tone={product.tone}
                          className="h-full w-full"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link href={`/product/${product.slug}`}>
                              <h3 className="font-display text-lg text-ink">{product.name}</h3>
                            </Link>
                            <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                              {category?.name}
                            </p>
                            <p className="mt-1 text-sm text-ink/60">
                              {line.color} &middot; {line.size}
                            </p>
                          </div>
                          <span className="shrink-0 text-sm font-medium text-ink">
                            {formatPrice(product.price * line.quantity)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 border border-line px-3 py-2">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                setQuantity(line.productId, line.size, line.color, line.quantity - 1)
                              }
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                            <span className="w-4 text-center text-sm">{line.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                setQuantity(line.productId, line.size, line.color, line.quantity + 1)
                              }
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-xs uppercase tracking-widest-plus text-ink/40 underline underline-offset-4 hover:text-ink"
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

            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-line p-6">
                <h2 className="font-display text-xl text-ink">Order Summary</h2>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-ink/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink/70">
                    <span>Shipping</span>
                    <span>{shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}</span>
                  </div>
                </div>
                <div className="mt-5 flex justify-between border-t border-line pt-5 text-base font-medium text-ink">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shippingEstimate)}</span>
                </div>
                <Button href="/checkout" className="mt-6 w-full">
                  Proceed to Checkout
                </Button>
                <p className="mt-4 text-center text-[11px] text-ink/40">
                  Cash on Delivery available in Kosovo. Taxes calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
