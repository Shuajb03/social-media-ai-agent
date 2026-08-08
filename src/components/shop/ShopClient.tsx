"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import clsx from "clsx";
import { Product } from "@/lib/types";
import { categories } from "@/lib/data/categories";
import { ProductCard } from "@/components/ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

const SORT_LABELS: Record<Sort, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

export function ShopClient({
  products,
  lockedCategory,
}: {
  products: Product[];
  lockedCategory?: string;
}) {
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    lockedCategory ? [lockedCategory] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => a.length - b.length || a.localeCompare(b));
  }, [products]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map.entries());
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedSizes.length && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
      if (selectedColors.length && !p.colors.some((c) => selectedColors.includes(c.name)))
        return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        break;
    }
    return list;
  }, [products, selectedCategories, selectedSizes, selectedColors, sort]);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const activeFilterCount = selectedSizes.length + selectedColors.length +
    (lockedCategory ? 0 : selectedCategories.length);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between border-b border-line pb-5">
        <button
          type="button"
          onClick={() => setOpenFilters(true)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest-plus text-ink"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
          Filter
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] text-ink">
              {activeFilterCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-ink/40 sm:inline">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </span>
          <label className="flex items-center gap-2 text-xs uppercase tracking-widest-plus text-ink">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-line bg-cream px-2 py-1.5 text-xs uppercase tracking-wide text-ink focus:outline-none"
            >
              {Object.entries(SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-ink/50">
          No pieces match those filters yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div
        className={clsx(
          "fixed inset-0 z-40 bg-ink/40 transition-opacity",
          openFilters ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpenFilters(false)}
      />
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-full max-w-sm overflow-y-auto bg-cream transition-transform duration-300",
          openFilters ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-6">
          <h2 className="font-display text-xl text-ink">Filter</h2>
          <button type="button" aria-label="Close filters" onClick={() => setOpenFilters(false)}>
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="space-y-8 px-6 py-6">
          {!lockedCategory && (
            <div>
              <h3 className="mb-3 text-[11px] uppercase tracking-widest-plus text-ink/40">
                Category
              </h3>
              <ul className="space-y-2.5">
                {categories.map((c) => (
                  <li key={c.id}>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(c.id)}
                        onChange={() => toggle(selectedCategories, c.id, setSelectedCategories)}
                        className="h-3.5 w-3.5 accent-gold"
                      />
                      {c.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="mb-3 text-[11px] uppercase tracking-widest-plus text-ink/40">Size</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggle(selectedSizes, size, setSelectedSizes)}
                  className={clsx(
                    "border px-3 py-1.5 text-xs",
                    selectedSizes.includes(size)
                      ? "border-ink bg-ink text-cream"
                      : "border-line text-ink hover:border-ink"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-[11px] uppercase tracking-widest-plus text-ink/40">Color</h3>
            <div className="flex flex-wrap gap-3">
              {allColors.map(([name, hex]) => (
                <button
                  key={name}
                  type="button"
                  aria-label={name}
                  title={name}
                  onClick={() => toggle(selectedColors, name, setSelectedColors)}
                  className={clsx(
                    "h-7 w-7 rounded-full border transition-shadow",
                    selectedColors.includes(name)
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-cream"
                      : "border-line"
                  )}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedSizes([]);
              setSelectedColors([]);
              if (!lockedCategory) setSelectedCategories([]);
            }}
            className="text-xs uppercase tracking-widest-plus text-ink/50 underline underline-offset-4 hover:text-ink"
          >
            Clear all
          </button>
        </div>
        <div className="sticky bottom-0 border-t border-line bg-cream px-6 py-4">
          <button
            type="button"
            onClick={() => setOpenFilters(false)}
            className="w-full bg-ink py-3.5 text-xs uppercase tracking-widest-plus text-cream hover:bg-gold hover:text-ink"
          >
            Show {filtered.length} results
          </button>
        </div>
      </div>
    </div>
  );
}
