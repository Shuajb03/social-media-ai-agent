import { Product } from "@/lib/types";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const INK = { name: "Archive Ink", hex: "#14110f" };
const GOLD = { name: "Signature Gold", hex: "#c8924a" };
const STONE = { name: "Quarry Stone", hex: "#9c9285" };

export const products: Product[] = [
  {
    id: "p07",
    slug: "skubi-crest-tee",
    name: "SKUBI Crest Tee",
    category: "tops",
    price: 65,
    colors: [INK],
    sizes: SIZES,
    description:
      "An oversized 240gsm cotton tee finished with the SK crest at the chest and mirrored large across the back. Heavyweight, boxy, built to be lived in.",
    details: [
      "100% heavyweight cotton, 240gsm, oversized fit",
      "Chest crest + full-back print",
      "Garment-washed for softness",
    ],
    sku: "SKB-TP-001",
    isNew: true,
    tag: "Chapter I",
    images: [
      "/products/skubi-crest-tee-front.jpg",
      "/products/skubi-crest-tee-back.jpg",
      "/products/skubi-crest-tee-detail.jpg",
    ],
    tone: "ink",
  },
  {
    id: "p10",
    slug: "founders-hoodie",
    name: "Founder's Hoodie",
    category: "tops",
    price: 135,
    colors: [INK, STONE, GOLD],
    sizes: SIZES,
    description:
      "450gsm loopback cotton, garment-dyed and heavily brushed inside. The hoodie the rest of the wardrobe is built around.",
    details: [
      "100% loopback cotton, 450gsm",
      "Kangaroo pocket, ribbed hem",
      "Machine wash cold, inside out",
    ],
    sku: "SKB-TP-004",
    tone: "gold",
  },
  {
    id: "p18",
    slug: "quiet-flexer-cap",
    name: "Quiet Flexer Cap",
    category: "accessories",
    price: 60,
    colors: [INK, STONE],
    sizes: ["One Size"],
    description:
      "A six-panel cap with a single debossed leather patch. No shouting, just correct proportions.",
    details: [
      "100% cotton twill",
      "Debossed leather patch",
      "Adjustable strap",
    ],
    sku: "SKB-AC-005",
    tone: "ink",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tag?.toLowerCase().includes(q)
  );
}
