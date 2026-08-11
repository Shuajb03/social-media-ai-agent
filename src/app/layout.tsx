import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { NewsletterPopup } from "@/components/NewsletterPopup";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skubiwear.com"),
  title: {
    default: "SKUBI — Heritage, Worn Quietly",
    template: "%s — SKUBI",
  },
  description:
    "SKUBI is a premium heritage-sport clothing house. Minimal, considered sportswear, built for people who don't need the room to notice.",
  openGraph: {
    title: "SKUBI — Heritage, Worn Quietly",
    description:
      "Minimal, premium sportswear from SKUBI. Quality over volume, always.",
    url: "https://skubiwear.com",
    siteName: "SKUBI",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream text-ink antialiased">
        <AnnouncementBar />
        <Header />
        <MobileMenu />
        <CartDrawer />
        <SearchOverlay />
        <NewsletterPopup />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
