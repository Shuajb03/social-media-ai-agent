import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, getRelatedProducts } from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { ProductClient } from "@/components/product/ProductClient";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${formatPrice(product.price)}. ${product.description}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: "SKUBI" },
    ...(product.images?.length
      ? { image: product.images.map((src) => `https://skubiwear.com${src}`) }
      : {}),
    offers: {
      "@type": "Offer",
      url: `https://skubiwear.com/product/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Container>
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink/40">
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop/${category?.slug}`} className="hover:text-ink">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-ink/70">{product.name}</span>
        </nav>

        <ProductClient
          product={product}
          categoryPattern={category?.pattern ?? "grid"}
          categoryName={category?.name ?? ""}
        />

        {related.length > 0 && (
          <div className="mt-24">
            <SectionHeading eyebrow="You May Also Like" title="Complete the look" />
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
