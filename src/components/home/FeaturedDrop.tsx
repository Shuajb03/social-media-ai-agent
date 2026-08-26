import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductThumb } from "@/components/ProductThumb";
import { getProduct } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

export function FeaturedDrop() {
  const product = getProduct("skubi-crest-tee");
  if (!product) return null;

  return (
    <section className="bg-ink py-20 text-cream sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden lg:order-2">
            <ProductThumb product={product} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
          </div>
          <div className="lg:order-1">
            <p className="mb-4 text-[11px] uppercase tracking-widest-plus text-gold">
              Featured &middot; {product.tag}
            </p>
            <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/65">
              {product.description}
            </p>
            <p className="mt-6 text-2xl font-medium">{formatPrice(product.price)}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`/product/${product.slug}`} variant="secondary" size="lg">
                {product.available === true ? "Shop This Piece" : "View This Piece"}
              </Button>
              <Button href="/shop/tops" variant="outline-cream" size="lg">
                View Tops
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
