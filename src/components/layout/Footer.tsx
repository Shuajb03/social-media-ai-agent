import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data/categories";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/NewsletterForm";
import { InstagramIcon, TikTokIcon, YouTubeIcon, FacebookIcon } from "@/components/icons/Social";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/skubiofficial/", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@skubiofficial", Icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/@SkubiBrand", Icon: YouTubeIcon },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591775911879",
    Icon: FacebookIcon,
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/brand/sk-mark-cream.png"
                alt=""
                width={471}
                height={495}
                className="h-9 w-auto"
              />
              <Image
                src="/brand/wordmark-cream.png"
                alt="SKUBI"
                width={702}
                height={197}
                className="h-4 w-auto"
              />
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Made slowly. Worn often. Kept longer. Join the Archive for founding-member
              access to Chapter I.
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
                  <Link href="/shipping-returns" className="text-sm text-cream/75 transition-colors hover:text-gold">
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
                <li>
                  <Link href="/privacy" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-cream/75 transition-colors hover:text-gold">
                    Terms of Service
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
