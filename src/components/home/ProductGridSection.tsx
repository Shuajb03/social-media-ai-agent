import Link from "next/link";
import { Product } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ProductCard";

export function ProductGridSection({
  eyebrow,
  title,
  products,
  viewAllHref,
}: {
  eyebrow: string;
  title: string;
  products: Product[];
  viewAllHref: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <Link
            href={viewAllHref}
            className="hidden shrink-0 text-xs uppercase tracking-widest-plus text-gold-deep underline underline-offset-4 sm:block"
          >
            View all
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <Link
            href={viewAllHref}
            className="text-xs uppercase tracking-widest-plus text-gold-deep underline underline-offset-4"
          >
            View all
          </Link>
        </div>
      </Container>
    </section>
  );
}
