# SKUBI — skubiwear.com

Premium heritage-sport clothing storefront for SKUBI, built with Next.js (App
Router), TypeScript, Tailwind CSS v4, Framer Motion, and Zustand.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## What's in here

A full storefront front-end, styled to SKUBI's brand system (warm ink
`#14110f`, cream `#f3eee3`, signature gold `#c8924a`; Cormorant Garamond
display / Inter body):

- **Home** — hero, category strip, new arrivals, featured drop, bestsellers,
  brand positioning, journal teaser, newsletter
- **Shop** (`/shop`, `/shop/[category]`) — filterable, sortable product grid
- **Product detail** (`/product/[slug]`) — gallery, size/color selection,
  size guide, add to bag, wishlist, related products
- **Cart & checkout** (`/cart`, `/checkout`) — client-side cart with
  persistence, order form supporting Cash on Delivery (Kosovo) and bank
  transfer
- **Wishlist** (`/wishlist`) — persisted via localStorage
- **Journal** (`/journal`, `/journal/[slug]`) — brand storytelling / editorial
- **About** (`/about`) — brand story and positioning
- **Contact** (`/contact`) — inquiry form + FAQ
- **Account** (`/account/login`, `/account/register`) — UI shells, no auth
  backend yet

## Notes for whoever picks this up next

- **Product data** lives in `src/lib/data/products.ts` (mock catalog — swap
  in a real CMS/PIM or hardcode real inventory when ready).
- **Product imagery** is placeholder art (`src/components/ProductVisual.tsx`)
  — an abstract SVG pattern system in brand tones, since there's no product
  photography yet. Swap in real photos via `next/image` once shoots are
  ready; the component signature (`pattern`, `tone`) can just be replaced
  with an `src`.
- **Cart / wishlist** are client-only (Zustand + localStorage). There's no
  backend, inventory, or payment gateway wired up.
- **Checkout** is a UI-only flow (Cash on Delivery / Bank Transfer) — Kosovo
  doesn't have direct Stripe/PayPal support, so a real integration would
  likely go through Raiffeisen Bank Kosovo, ProCredit Bank Kosovo, or Stripe
  Atlas (US entity route). None of that is wired up here.
- **Newsletter/contact forms** show a success state locally; they don't send
  anywhere yet.
