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
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryStrip />
      <ProductGridSection
        eyebrow="Chapter I"
        title="The first pieces"
        products={products}
        viewAllHref="/shop"
      />
      <FeaturedDrop />
      <StoryTeaser />
      <JournalTeaser />
      <NewsletterBand />
    </>
  );
}
