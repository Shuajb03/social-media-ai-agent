import { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { journalPosts } from "@/lib/data/journal";

const BASE = "https://skubiwear.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/about", "/journal", "/contact"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE}/shop/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const journalRoutes = journalPosts.map((p) => ({
    url: `${BASE}/journal/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...journalRoutes];
}
