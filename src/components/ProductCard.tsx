"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { ProductThumb } from "@/components/ProductThumb";
import { formatPrice } from "@/lib/format";
import { useWishlistStore } from "@/lib/store/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductThumb
            product={product}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-cream px-2.5 py-1 text-[10px] uppercase tracking-widest-plus text-ink">
                New
              </span>
            )}
            {product.tag && !product.isNew && (
              <span className="bg-gold px-2.5 py-1 text-[10px] uppercase tracking-widest-plus text-ink">
                {product.tag}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggle(product.id)}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-cream/90 backdrop-blur-sm transition-colors hover:bg-cream"
      >
        <Heart
          className={clsx("h-4 w-4", wishlisted ? "fill-gold text-gold" : "text-ink")}
          strokeWidth={1.5}
        />
      </button>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display text-lg leading-tight text-ink">{product.name}</h3>
          </Link>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
            {category?.name}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-sm font-medium text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="ml-1.5 text-xs text-ink/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
