import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { Crown } from "@/components/icons/Crown";
import { NewsletterForm } from "@/components/NewsletterForm";
import { InstagramIcon, TikTokIcon, YouTubeIcon, FacebookIcon } from "@/components/icons/Social";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/skubi", Icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com/@skubi_brand", Icon: TikTokIcon },
  { label: "YouTube", href: "https://youtube.com/@skubi", Icon: YouTubeIcon },
  { label: "Facebook", href: "https://facebook.com/skubiofficial", Icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-2.5">
              <Crown className="h-6 w-8" />
              <span className="font-display text-2xl tracking-[0.18em]">SKUBI</span>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Heritage-sport premium, built quietly. Join the archive for early access
              to new chapters.
            </p>
            <NewsletterForm tone="cream" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="mb-4 text-[11px] uppercase tracking-widest-plus text-cream/40">
                Shop
              </h4>
              <ul className="space-y-3">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/shop/${c.slug}`}
                      className="text-sm text-cream/75 transition-colors hover:text-gold"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[11px] uppercase tracking-widest-plus text-cream/40">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[11px] uppercase tracking-widest-plus text-cream/40">
                Help
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Shipping &amp; Returns
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line-dark py-6 sm:flex-row">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} SKUBI. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-cream/60 transition-colors hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
