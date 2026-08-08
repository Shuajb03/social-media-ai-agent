import { Metadata } from "next";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse the full SKUBI archive — outerwear, knitwear, tops, bottoms, and accessories.",
};

export default function ShopPage() {
  return (
    <div className="py-14 sm:py-16">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">
            The Archive
          </p>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Shop All</h1>
        </div>
        <ShopClient products={products} />
      </Container>
    </div>
  );
}
