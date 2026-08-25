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
  {
    id: "p02",
    slug: "long-sleeve-heritage-tee",
    name: "Long-Sleeve Heritage Tee",
    category: "tops",
    price: 75,
    colors: [INK, STONE],
    sizes: SIZES,
    description:
      "220gsm combed cotton with a tonal SK crest at the chest and the Archive Seal tonal-printed at the back neck. Cut close to the body, long in the sleeve.",
    details: [
      "100% combed cotton, 220gsm",
      "Tonal embroidered chest crest, 26cm tonal Archive Seal at back neck",
      "Ribbed cuffs, garment-washed",
    ],
    sku: "SKB-TP-002",
    tag: "Chapter I",
    tone: "cream",
  },
  {
    id: "p03",
    slug: "founders-crewneck",
    name: "Founder's Crewneck",
    category: "tops",
    price: 120,
    colors: [INK, STONE, GOLD],
    sizes: SIZES,
    description:
      "400gsm brushed-back fleece with the same tonal detailing as the Founder's Hoodie, minus the hood. Ribbed collar, cuffs, and hem for a cleaner silhouette.",
    details: [
      "100% brushed-back fleece, 400gsm",
      "Tonal embroidered chest crest, 26cm tonal Archive Seal on back",
      "Ribbed collar, cuffs, and hem",
    ],
    sku: "SKB-TP-003",
    tag: "Chapter I",
    tone: "gold",
  },
  {
    id: "p05",
    slug: "signature-polo",
    name: "Signature Polo",
    category: "tops",
    price: 95,
    colors: [INK, STONE],
    sizes: SIZES,
    description:
      "A heavyweight cotton piqué polo with a tonal embroidered crest at the chest. Clean back, no branding — the quietest piece in the collection.",
    details: [
      "100% cotton piqué, 260gsm",
      "Tonal embroidered chest crest, mother-of-pearl buttons",
      "Ribbed polo collar and cuffs",
    ],
    sku: "SKB-TP-005",
    tag: "Chapter I",
    tone: "cream",
  },
  {
    id: "p06",
    slug: "heritage-quarter-zip",
    name: "Heritage Quarter-Zip",
    category: "tops",
    price: 125,
    colors: [INK, STONE, GOLD],
    sizes: SIZES,
    description:
      "380gsm brushed fleece quarter-zip with a tonal chest crest and the Archive Seal tonal-printed at the back neck. Rib-knit collar and half-zip placket in matte hardware.",
    details: [
      "100% brushed fleece, 380gsm",
      "Tonal embroidered chest crest, 26cm tonal Archive Seal at back neck",
      "Matte half-zip hardware, rib-knit collar",
    ],
    sku: "SKB-TP-006",
    tag: "Chapter I",
    tone: "ink",
  },
  {
    id: "p11",
    slug: "signature-sweatpants",
    name: "Signature Sweatpants",
    category: "bottoms",
    price: 110,
    colors: [INK, STONE],
    sizes: SIZES,
    description:
      "450gsm loopback cotton joggers cut to match the Founder's Hoodie. A small tonal crest sits at the left leg — no back branding.",
    details: [
      "100% loopback cotton, 450gsm",
      "Tonal embroidered crest at left leg hem",
      "Elasticated waistband with internal drawcord, tapered leg",
    ],
    sku: "SKB-BT-001",
    tag: "Chapter I",
    tone: "ink",
  },
  {
    id: "p12",
    slug: "heritage-shorts",
    name: "Heritage Shorts",
    category: "bottoms",
    price: 80,
    colors: [INK, STONE],
    sizes: SIZES,
    description:
      "320gsm heavyweight cotton twill shorts with a small tonal crest at the left leg. Plain back — no seal, no print.",
    details: [
      "100% cotton twill, 320gsm",
      "Tonal embroidered crest at left leg hem",
      "Side seam pockets, elasticated waistband",
    ],
    sku: "SKB-BT-002",
    tag: "Chapter I",
    tone: "cream",
  },
  {
    id: "p13",
    slug: "relaxed-trouser",
    name: "Relaxed Trouser",
    category: "bottoms",
    price: 130,
    colors: [INK, STONE],
    sizes: SIZES,
    description:
      "A tailored-relaxed cotton-twill trouser with a tapered leg and a tonal crest tab at the waistband. Dresses up or down.",
    details: [
      "98% cotton, 2% elastane twill, 300gsm",
      "Tonal woven crest tab at inner waistband",
      "Tapered leg, side seam pockets, belt loops",
    ],
    sku: "SKB-BT-003",
    tag: "Chapter I",
    tone: "gold",
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
