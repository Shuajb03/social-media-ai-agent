import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductVisual } from "@/components/ProductVisual";

const TONE_CYCLE: Array<"ink" | "cream" | "gold"> = ["ink", "cream", "gold", "ink", "cream"];

export function CategoryStrip() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Shop by Category" title="Five categories. No noise." />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, i) => (
            <Link key={category.id} href={`/shop/${category.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ProductVisual
                  pattern={category.pattern}
                  tone={TONE_CYCLE[i % TONE_CYCLE.length]}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 font-display text-lg text-ink">{category.name}</h3>
              <p className="text-xs text-ink/50">{category.tagline}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
