"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useUIStore } from "@/lib/store/ui";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { MegaMenu } from "@/components/layout/MegaMenu";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const openCart = useUIStore((s) => s.openCart);
  const openSearch = useUIStore((s) => s.openSearch);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const cartCount = useCartStore((s) => s.totalQuantity());
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              type="button"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-widest-plus text-ink transition-colors hover:text-gold-deep"
                >
                  Shop
                </Link>
                {shopOpen && <MegaMenu onClose={() => setShopOpen(false)} />}
              </div>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest-plus text-ink transition-colors hover:text-gold-deep"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" className="flex items-center gap-3" aria-label="SKUBI home">
            <Image
              src="/brand/sk-mark-ink.png"
              alt=""
              width={471}
              height={495}
              priority
              className="h-9 w-auto"
            />
            <Image
              src="/brand/wordmark-ink.png"
              alt="SKUBI"
              width={702}
              height={197}
              priority
              className="hidden h-4 w-auto sm:block"
            />
          </Link>

          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Search"
              onClick={openSearch}
              className="text-ink transition-colors hover:text-gold-deep"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              href="/account/login"
              aria-label="Account"
              className="hidden text-ink transition-colors hover:text-gold-deep sm:block"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-ink transition-colors hover:text-gold-deep"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-ink">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Cart"
              onClick={openCart}
              className="relative text-ink transition-colors hover:text-gold-deep"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-ink">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
