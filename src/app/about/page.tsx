import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/ProductVisual";
import { Crown } from "@/components/icons/Crown";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "SKUBI is a heritage-sport premium clothing house built on restraint, craftsmanship, and quiet quality — designed with intent from Kosovo.",
};

const VALUES = [
  {
    title: "Craftsmanship Over Scarcity",
    body: "We'll never manufacture a queue. Every piece is made to a standard, not a countdown timer.",
  },
  {
    title: "Restraint Is the Signal",
    body: "One neutral, one accent, a mark you notice on the second look. That's the luxury we believe in.",
  },
  {
    title: "Built to Be Kept",
    body: "Clothes that earn their place in a wardrobe for years, not a single season.",
  },
];

const PERSONAS = [
  {
    name: "The Collector",
    body: "Buys for the craft, not the hype cycle. Values rarity that comes from quality, not from a fake countdown.",
  },
  {
    name: "The Quiet Flexer",
    body: "Understated by choice. Frustrated by logo-mania, drawn to pieces that speak only to those paying attention.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink py-28 text-cream sm:py-36">
        <ProductVisual pattern="grid" tone="ink" className="absolute inset-0 h-full w-full opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 to-ink" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Image
              src="/brand/sk-mark-cream.png"
              alt=""
              width={471}
              height={495}
              className="mx-auto mb-6 h-12 w-auto"
            />
            <p className="mb-4 text-[11px] uppercase tracking-widest-plus text-gold">
              Chapter I
            </p>
            <h1 className="font-display text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl">
              Heritage-sport premium, built quietly.
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/products/skubi-crest-tee-detail.jpg"
                alt="SK crest detail on the SKUBI Crest Tee"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-widest-plus text-gold-deep">
                The Beginning
              </p>
              <h2 className="font-display text-3xl leading-tight text-balance text-ink sm:text-4xl">
                Every archive starts with one piece worth keeping.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-ink/70">
                SKUBI began with a simple frustration: too much of premium fashion is
                either shouting for attention or hiding behind a price tag with
                nothing underneath it. We wanted a third option &mdash; a house in the
                lane of heritage-sport premium, closer to Ralph Lauren or Lacoste than
                to logo-first streetwear. A crown mark, not a wordmark. Worn quietly,
                built to last.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Designed with intent from Kosovo, for anyone who&rsquo;d rather own one
                honest piece than three disposable ones.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream-soft py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">What We Stand For</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <Crown className="mx-auto mb-4 h-6 w-8 text-gold-deep" />
                <h3 className="font-display text-xl text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-4 text-[11px] uppercase tracking-widest-plus text-gold-deep">
              Who We Design For
            </p>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Two kinds of quiet</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PERSONAS.map((persona) => (
              <div key={persona.name} className="border border-line p-8">
                <h3 className="font-display text-2xl text-ink">{persona.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">{persona.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-center text-cream">
        <Container>
          <h2 className="font-display text-3xl sm:text-4xl">Ready to see the archive?</h2>
          <div className="mt-8">
            <Button href="/shop" variant="secondary" size="lg">
              Shop the Collection
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
