import { Product } from "@/lib/types";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const INK = { name: "Archive Ink", hex: "#14110f" };
const CREAM = { name: "Warm Ink", hex: "#f3eee3" };
const GOLD = { name: "Signature Gold", hex: "#c8924a" };
const OLIVE = { name: "Field Olive", hex: "#5c5a45" };
const NAVY = { name: "Dusk Navy", hex: "#232a35" };
const STONE = { name: "Quarry Stone", hex: "#9c9285" };

export const products: Product[] = [
  {
    id: "p01",
    slug: "chapter-i-wool-overcoat",
    name: "Chapter I Wool Overcoat",
    category: "outerwear",
    price: 420,
    colors: [INK, STONE, NAVY],
    sizes: SIZES,
    description:
      "A full-length overcoat cut from double-faced wool. Built the way a house builds its first true statement piece — nothing borrowed, nothing rushed.",
    details: [
      "92% wool, 8% cashmere blend",
      "Horn-effect buttons, hand-finished lapel",
      "Interior monogram lining",
      "Dry clean only",
    ],
    sku: "SKB-OC-001",
    isNew: true,
    tag: "Chapter I",
    tone: "ink",
  },
  {
    id: "p02",
    slug: "crest-quilted-field-jacket",
    name: "Crest Quilted Field Jacket",
    category: "outerwear",
    price: 285,
    colors: [OLIVE, INK],
    sizes: SIZES,
    description:
      "Diamond-quilted insulation under a brushed cotton shell. Quiet in the room, built for the walk there.",
    details: [
      "Brushed cotton shell, recycled-fill insulation",
      "Corozo buttons",
      "Interior security pocket",
      "Machine wash cold",
    ],
    sku: "SKB-OC-002",
    tone: "cream",
  },
  {
    id: "p03",
    slug: "regency-wax-trench",
    name: "Regency Wax Trench",
    category: "outerwear",
    price: 365,
    compareAtPrice: 410,
    colors: [STONE, INK],
    sizes: SIZES,
    description:
      "Waxed cotton trench with a storm bridge and belted waist. Weather is not an excuse to look unfinished.",
    details: [
      "100% waxed cotton",
      "Detachable belt, storm bridge",
      "Wipe clean, re-wax annually",
    ],
    sku: "SKB-OC-003",
    tag: "Restock",
    tone: "gold",
  },
  {
    id: "p04",
    slug: "founders-cable-crewneck",
    name: "Founder's Cable Crewneck",
    category: "knitwear",
    price: 145,
    colors: [CREAM, OLIVE, INK],
    sizes: SIZES,
    description:
      "A heavyweight cable knit built from merino wool. The kind of piece that gets better with every wear, not worse.",
    details: [
      "100% merino wool",
      "Ribbed cuffs and hem",
      "Hand wash cold, lay flat to dry",
    ],
    sku: "SKB-KN-001",
    isNew: true,
    tone: "cream",
  },
  {
    id: "p05",
    slug: "quiet-mark-half-zip",
    name: "Quiet Mark Half-Zip",
    category: "knitwear",
    price: 165,
    colors: [NAVY, STONE],
    sizes: SIZES,
    description:
      "A fine-gauge half-zip with a single tonal monogram at the chest. The logo you notice on the second look, not the first.",
    details: [
      "70% wool, 30% silk blend",
      "Matte horn zip pull",
      "Dry clean recommended",
    ],
    sku: "SKB-KN-002",
    tone: "ink",
  },
  {
    id: "p06",
    slug: "heritage-shawl-cardigan",
    name: "Heritage Shawl Cardigan",
    category: "knitwear",
    price: 195,
    colors: [OLIVE, CREAM],
    sizes: SIZES,
    description:
      "Shawl-collar cardigan in a heavy lambswool. Layer it over everything or let it be the whole outfit.",
    details: [
      "100% lambswool",
      "Horn buttons",
      "Hand wash cold, lay flat to dry",
    ],
    sku: "SKB-KN-003",
    tone: "gold",
  },
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
    images: [
      "/products/skubi-crest-tee-front.jpg",
      "/products/skubi-crest-tee-back.jpg",
      "/products/skubi-crest-tee-detail.jpg",
    ],
    tone: "ink",
  },
  {
    id: "p08",
    slug: "provenance-oxford-shirt",
    name: "Provenance Oxford Shirt",
    category: "tops",
    price: 115,
    colors: [CREAM, NAVY],
    sizes: SIZES,
    description:
      "A button-down oxford with mother-of-pearl buttons and a hand-finished collar. Old rules, worn new.",
    details: [
      "100% cotton oxford",
      "Mother-of-pearl buttons",
      "Machine wash cold",
    ],
    sku: "SKB-TP-002",
    tone: "cream",
  },
  {
    id: "p09",
    slug: "long-form-mock-neck",
    name: "Long Form Mock Neck",
    category: "tops",
    price: 85,
    colors: [INK, OLIVE],
    sizes: SIZES,
    description:
      "A second-skin mock neck in a compact cotton-elastane jersey. Wears clean under anything you put over it.",
    details: [
      "94% cotton, 6% elastane",
      "Flatlock seams",
      "Machine wash cold",
    ],
    sku: "SKB-TP-003",
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
    tag: "Bestseller",
    tone: "gold",
  },
  {
    id: "p11",
    slug: "tailored-wool-trouser",
    name: "Tailored Wool Trouser",
    category: "bottoms",
    price: 175,
    colors: [INK, STONE, NAVY],
    sizes: ["28", "30", "32", "34", "36", "38"],
    description:
      "A relaxed-through-the-leg trouser in Italian wool. Tailoring, without the formality tax.",
    details: [
      "100% Italian wool",
      "Side-adjuster waistband",
      "Dry clean only",
    ],
    sku: "SKB-BT-001",
    tone: "ink",
  },
  {
    id: "p12",
    slug: "field-cargo-pant",
    name: "Field Cargo Pant",
    category: "bottoms",
    price: 155,
    colors: [OLIVE, INK],
    sizes: ["28", "30", "32", "34", "36", "38"],
    description:
      "Cotton-ripstop cargo with a tapered leg and reinforced knee. Utility that still knows how to dress up.",
    details: [
      "100% cotton ripstop",
      "Tapered leg, reinforced knee panels",
      "Machine wash cold",
    ],
    sku: "SKB-BT-002",
    isNew: true,
    tone: "cream",
  },
  {
    id: "p13",
    slug: "archive-denim-straight",
    name: "Archive Denim, Straight",
    category: "bottoms",
    price: 145,
    colors: [INK, STONE],
    sizes: ["28", "30", "32", "34", "36", "38"],
    description:
      "13oz Japanese selvedge denim in a straight cut. Raw now, yours in six months.",
    details: [
      "100% cotton selvedge denim, 13oz",
      "Leather patch, brass hardware",
      "Wash cold, inside out, minimal",
    ],
    sku: "SKB-BT-003",
    tone: "gold",
  },
  {
    id: "p14",
    slug: "crest-wool-scarf",
    name: "Crest Wool Scarf",
    category: "accessories",
    price: 95,
    colors: [OLIVE, CREAM, INK],
    sizes: ["One Size"],
    description:
      "A lambswool scarf with a woven crest at each end. Small enough to be quiet, sharp enough to be seen.",
    details: ["100% lambswool", "Fringed edge", "Dry clean only"],
    sku: "SKB-AC-001",
    tone: "cream",
  },
  {
    id: "p15",
    slug: "signature-leather-belt",
    name: "Signature Leather Belt",
    category: "accessories",
    price: 85,
    colors: [INK, STONE],
    sizes: ["S", "M", "L"],
    description:
      "Full-grain leather with a brushed brass crest buckle. Built to outlast the trousers it holds up.",
    details: [
      "Full-grain leather",
      "Brushed brass buckle",
      "Wipe clean, condition twice a year",
    ],
    sku: "SKB-AC-002",
    tone: "ink",
  },
  {
    id: "p16",
    slug: "founders-wool-beanie",
    name: "Founder's Wool Beanie",
    category: "accessories",
    price: 55,
    colors: [INK, GOLD, STONE],
    sizes: ["One Size"],
    description:
      "Ribbed merino beanie with a tonal woven crest. The last thing you put on before you leave.",
    details: ["100% merino wool", "Tonal woven crest", "Hand wash cold"],
    sku: "SKB-AC-003",
    isNew: true,
    tone: "gold",
  },
  {
    id: "p17",
    slug: "provenance-card-holder",
    name: "Provenance Card Holder",
    category: "accessories",
    price: 65,
    colors: [INK, STONE],
    sizes: ["One Size"],
    description:
      "Vegetable-tanned leather card holder, debossed with the archive mark. Ages into something better than new.",
    details: [
      "Vegetable-tanned leather",
      "Debossed archive mark",
      "Wipe clean",
    ],
    sku: "SKB-AC-004",
    tone: "cream",
  },
  {
    id: "p18",
    slug: "quiet-flexer-cap",
    name: "Quiet Flexer Cap",
    category: "accessories",
    price: 60,
    colors: [INK, OLIVE, CREAM],
    sizes: ["One Size"],
    description:
      "A six-panel cap with a single debossed leather patch. No shouting, just correct proportions.",
    details: [
      "100% cotton twill",
      "Debossed leather patch",
      "Adjustable strap",
    ],
    sku: "SKB-AC-005",
    tag: "Bestseller",
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
