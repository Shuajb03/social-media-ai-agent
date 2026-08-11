import Image from "next/image";
import clsx from "clsx";
import { Product } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { ProductVisual } from "@/components/ProductVisual";

export function ProductThumb({
  product,
  className,
  imageIndex = 0,
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  product: Product;
  className?: string;
  imageIndex?: number;
  sizes?: string;
}) {
  if (product.images && product.images.length > 0) {
    return (
      <Image
        src={product.images[imageIndex] ?? product.images[0]}
        alt={product.name}
        fill
        sizes={sizes}
        className={clsx("object-cover", className)}
      />
    );
  }

  const category = getCategory(product.category);
  return (
    <ProductVisual
      pattern={category?.pattern ?? "grid"}
      tone={product.tone}
      label="Coming Soon"
      className={className ?? "h-full w-full"}
    />
  );
}
