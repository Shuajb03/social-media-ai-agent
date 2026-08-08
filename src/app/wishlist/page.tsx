"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { useWishlistStore } from "@/lib/store/wishlist";
import { products } from "@/lib/data/products";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="py-14">
      <Container>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Wishlist</h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-5 text-center">
            <p className="text-sm text-ink/60">Nothing saved yet.</p>
            <Button href="/shop">Explore the Archive</Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
