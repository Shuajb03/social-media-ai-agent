"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine } from "@/lib/types";
import { products } from "@/lib/data/products";

interface CartState {
  lines: CartLine[];
  addLine: (productId: string, size: string, color: string, quantity?: number) => void;
  removeLine: (productId: string, size: string, color: string) => void;
  setQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
  totalQuantity: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addLine: (productId, size, color, quantity = 1) => {
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === productId && l.size === size && l.color === color
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + quantity } : l
              ),
            };
          }
          return { lines: [...state.lines, { productId, size, color, quantity }] };
        });
      },
      removeLine: (productId, size, color) => {
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.size === size && l.color === color)
          ),
        }));
      },
      setQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.productId === productId && l.size === size && l.color === color
                ? { ...l, quantity }
                : l
            )
            .filter((l) => l.quantity > 0),
        }));
      },
      clear: () => set({ lines: [] }),
      totalQuantity: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: () =>
        get().lines.reduce((sum, l) => {
          const product = products.find((p) => p.id === l.productId);
          return sum + (product?.price ?? 0) * l.quantity;
        }, 0),
    }),
    { name: "skubi-cart" }
  )
);
