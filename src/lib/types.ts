export type PatternId = "quilt" | "rib" | "weave" | "herringbone" | "grid";

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  pattern: PatternId;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  colors: ColorOption[];
  sizes: string[];
  description: string;
  details: string[];
  sku: string;
  isNew?: boolean;
  tag?: string;
  tone: "ink" | "cream" | "gold";
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  pattern: PatternId;
  tone: "ink" | "cream" | "gold";
  body: string[];
}

export interface CartLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}
