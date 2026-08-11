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
  const firstPieces = products.filter((p) => p.isNew).slice(0, 4);
  const selectedPieces = products.filter((p) => !p.isNew).slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee />
      <CategoryStrip />
      <ProductGridSection
        eyebrow="Chapter I"
        title="The first pieces"
        products={firstPieces}
        viewAllHref="/shop"
      />
      <FeaturedDrop />
      <ProductGridSection
        eyebrow="The Edit"
        title="Selected pieces"
        products={selectedPieces}
        viewAllHref="/shop"
      />
      <StoryTeaser />
      <JournalTeaser />
      <NewsletterBand />
    </>
  );
}
