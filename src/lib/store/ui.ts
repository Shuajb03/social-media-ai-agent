"use client";

import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  openCart: () => set({ cartOpen: true, searchOpen: false, mobileMenuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  openSearch: () => set({ searchOpen: true, cartOpen: false, mobileMenuOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen, cartOpen: false, searchOpen: false })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  closeAll: () => set({ cartOpen: false, searchOpen: false, mobileMenuOpen: false }),
}));
