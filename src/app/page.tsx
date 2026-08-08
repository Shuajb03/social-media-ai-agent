import { products } from "@/lib/data/products";
import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { Marquee } from "@/components/home/Marquee";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { FeaturedDrop } from "@/components/home/FeaturedDrop";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { NewsletterBand } from "@/components/home/NewsletterBand";

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestsellers = products
    .filter((p) => p.tag === "Bestseller" || p.tag === "Restock")
    .concat(products.filter((p) => !p.tag))
    .slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee />
      <CategoryStrip />
      <ProductGridSection
        eyebrow="Just In"
        title="New arrivals"
        products={newArrivals}
        viewAllHref="/shop"
      />
      <FeaturedDrop />
      <ProductGridSection
        eyebrow="Most Wanted"
        title="Bestsellers"
        products={bestsellers}
        viewAllHref="/shop"
      />
      <StoryTeaser />
      <JournalTeaser />
      <NewsletterBand />
    </>
  );
}
