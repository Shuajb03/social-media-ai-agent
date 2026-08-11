import { Category } from "@/lib/types";

export const categories: Category[] = [
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
    tagline: "Built to move",
    pattern: "herringbone",
  },
  {
    id: "sets",
    slug: "sets",
    name: "Sets",
    tagline: "Matched, not matchy",
    pattern: "quilt",
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
