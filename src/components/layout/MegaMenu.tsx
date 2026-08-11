import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { ProductThumb } from "@/components/ProductThumb";
import { getProduct } from "@/lib/data/products";

export function MegaMenu({ onClose }: { onClose: () => void }) {
  const featured = getProduct("skubi-crest-tee");

  return (
    <div className="fixed inset-x-0 top-20 z-30 border-b border-line bg-cream shadow-[0_20px_40px_-20px_rgba(20,17,15,0.15)]">
      <Container>
        <div className="grid grid-cols-12 gap-10 py-10">
          <div className="col-span-7 grid grid-cols-2 gap-x-8 gap-y-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.slug}`}
                onClick={onClose}
                className="group"
              >
                <h3 className="font-display text-xl text-ink transition-colors group-hover:text-gold-deep">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-ink/50">{category.tagline}</p>
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={onClose}
              className="text-xs uppercase tracking-widest-plus text-gold-deep underline underline-offset-4"
            >
              View all products
            </Link>
          </div>
          <div className="col-span-5">
            {featured && (
              <Link
                href={`/product/${featured.slug}`}
                onClick={onClose}
                className="group relative block aspect-[16/9] overflow-hidden"
              >
                <ProductThumb
                  product={featured}
                  sizes="40vw"
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <p className="text-[11px] uppercase tracking-widest-plus text-cream/70">
                    Chapter I
                  </p>
                  <h4 className="mt-1 font-display text-2xl text-cream">
                    {featured.name}
                  </h4>
                </div>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
