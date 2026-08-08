import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { ShopClient } from "@/components/shop/ShopClient";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Shop SKUBI ${category.name} — ${category.tagline.toLowerCase()}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.category === category.id);

  return (
    <div className="py-14 sm:py-16">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">
            {category.tagline}
          </p>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{category.name}</h1>
        </div>
        <ShopClient products={categoryProducts} lockedCategory={category.id} />
      </Container>
    </div>
  );
}
