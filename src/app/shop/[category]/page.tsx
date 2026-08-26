import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { ShopClient } from "@/components/shop/ShopClient";
import { ChapterOneBanner } from "@/components/shop/ChapterOneBanner";
import { CategoryComingSoon } from "@/components/shop/CategoryComingSoon";

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
  const hasComingSoon = categoryProducts.some((p) => p.available !== true);

  return (
    <div className="pb-14 sm:pb-16">
      {hasComingSoon && <ChapterOneBanner />}
      <Container className={hasComingSoon ? "" : "pt-14 sm:pt-16"}>
        <div className="mb-10">
          <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">
            {category.tagline}
          </p>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{category.name}</h1>
        </div>
        {categoryProducts.length === 0 ? (
          <CategoryComingSoon categoryName={category.name} />
        ) : (
          <ShopClient products={categoryProducts} lockedCategory={category.id} />
        )}
      </Container>
    </div>
  );
}
