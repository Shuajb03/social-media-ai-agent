"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Check } from "lucide-react";
import clsx from "clsx";
import { Product, PatternId } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductVisual } from "@/components/ProductVisual";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { NewsletterForm } from "@/components/NewsletterForm";

const VIEW_TONES: Array<"ink" | "cream" | "gold"> = ["ink", "cream", "gold"];

export function ProductClient({
  product,
  categoryPattern,
  categoryName,
}: {
  product: Product;
  categoryPattern: PatternId;
  categoryName: string;
}) {
  const [activeView, setActiveView] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const addLine = useCartStore((s) => s.addLine);
  const openCart = useUIStore((s) => s.openCart);
  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const hasRealImages = Boolean(product.images && product.images.length > 0);
  const viewCount = hasRealImages ? product.images!.length : VIEW_TONES.length;
  const isAvailable = product.available === true;

  function handleAddToCart() {
    if (!size) {
      setSizeError(true);
      return;
    }
    addLine(product.id, size, color, quantity);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden">
          {hasRealImages ? (
            <Image
              src={product.images![activeView]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ProductVisual
              pattern={categoryPattern}
              tone={VIEW_TONES[activeView]}
              label="Coming Soon"
              className="h-full w-full"
            />
          )}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {Array.from({ length: viewCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveView(i)}
              className={clsx(
                "relative aspect-[4/5] overflow-hidden border-2 transition-colors",
                activeView === i ? "border-gold" : "border-transparent"
              )}
            >
              {hasRealImages ? (
                <Image
                  src={product.images![i]}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  sizes="16vw"
                  className="object-cover"
                />
              ) : (
                <ProductVisual
                  pattern={categoryPattern}
                  tone={VIEW_TONES[i]}
                  className="h-full w-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-widest-plus text-ink/40">
          {categoryName} &middot; {product.sku}
        </p>
        <h1 className="font-display text-3xl leading-tight text-balance text-ink sm:text-4xl">
          {product.name}
        </h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-medium text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70">{product.description}</p>

        {isAvailable ? (
          <>
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-widest-plus text-ink/50">
                Color &mdash; {color}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    title={c.name}
                    onClick={() => setColor(c.name)}
                    className={clsx(
                      "h-8 w-8 rounded-full border transition-shadow",
                      color === c.name
                        ? "ring-2 ring-gold ring-offset-2 ring-offset-cream"
                        : "border-line"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest-plus text-ink/50">
                  Size {size && `— ${size}`}
                </p>
                <SizeGuideModal />
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    className={clsx(
                      "min-w-[3rem] border px-3 py-2.5 text-xs",
                      size === s
                        ? "border-ink bg-ink text-cream"
                        : "border-line text-ink hover:border-ink"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-2 text-xs text-red-700/80">Please select a size to continue.</p>
              )}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-4 border border-line px-3 py-3">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
                <span className="w-4 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                {added ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={1.5} /> Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </Button>
              <button
                type="button"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggleWishlist(product.id)}
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-line hover:border-ink"
              >
                <Heart
                  className={clsx("h-4 w-4", wishlisted ? "fill-gold text-gold" : "text-ink")}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8 border border-line bg-cream-soft p-6">
            <p className="mb-2 text-xs uppercase tracking-widest-plus text-gold-deep">
              Coming Soon
            </p>
            <p className="mb-5 text-sm leading-relaxed text-ink/70">
              This piece is still being developed &mdash; not manufactured yet, so it&rsquo;s
              not available to order. Join the list and we&rsquo;ll let you know the moment
              it&rsquo;s ready.
            </p>
            <NewsletterForm tone="ink" />
          </div>
        )}

        <div className="mt-12">
          <Accordion
            items={[
              {
                title: "Details & Composition",
                content: (
                  <ul className="list-disc space-y-1.5 pl-4">
                    {product.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Shipping & Returns",
                content: (
                  <p>
                    Free shipping across Kosovo and the EU on orders over &euro;150.
                    Cash on delivery available in Kosovo. 30-day returns on unworn
                    pieces with original tags.{" "}
                    <Link href="/contact" className="underline underline-offset-4">
                      Contact us
                    </Link>{" "}
                    for a return label.
                  </p>
                ),
              },
              {
                title: "Care Instructions",
                content: <p>See garment label for full care instructions specific to this piece.</p>,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
