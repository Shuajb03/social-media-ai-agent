import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "outerwear",
    slug: "outerwear",
    name: "Outerwear",
    tagline: "Built for the long game",
    pattern: "quilt",
  },
  {
    id: "knitwear",
    slug: "knitwear",
    name: "Knitwear",
    tagline: "Quiet luxury, close to the skin",
    pattern: "rib",
  },
  {
    id: "tops",
    slug: "tops",
    name: "Tops",
    tagline: "The everyday, elevated",
    pattern: "weave",
  },
  {
    id: "bottoms",
    slug: "bottoms",
    name: "Bottoms",
    tagline: "Tailored ease",
    pattern: "herringbone",
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing signature",
    pattern: "grid",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
