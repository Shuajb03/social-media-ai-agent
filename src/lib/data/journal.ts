import { JournalPost } from "@/lib/types";

export const journalPosts: JournalPost[] = [
  {
    slug: "the-skubi-story",
    title: "The SKUBI Story: Chapter I",
    excerpt:
      "Every archive starts with one piece worth keeping. This is how ours began.",
    category: "Brand Lore",
    readTime: "6 min read",
    date: "2026-01-14",
    pattern: "quilt",
    tone: "ink",
    body: [
      "Most brands start with a logo. We started with a frustration: too much of premium fashion was either shouting for attention or hiding behind a price tag with nothing underneath it.",
      "SKUBI was built as a third option — a house in the lane of heritage-sport premium, closer to the quiet confidence of Ralph Lauren or Lacoste than to logo-first streetwear. A crown mark, not a wordmark maximized for visibility. Something you notice on the second look, not the first.",
      "Chapter I is the first collection in what we intend to be a long archive, not a single drop. Every piece carries the same instruction: nothing borrowed, nothing rushed, nothing that won't earn its place in a wardrobe for years.",
      "This is the story we'll keep adding to, one honest chapter at a time.",
    ],
  },
  {
    slug: "the-quiet-signature",
    title: "The Quiet Signature: Why We Hide the Logo",
    excerpt:
      "Real luxury has never needed to shout. A short case for restraint.",
    category: "Luxury Branding",
    readTime: "4 min read",
    date: "2026-02-02",
    pattern: "grid",
    tone: "gold",
    body: [
      "Look closely at the houses that have lasted a century, and a pattern shows up: the mark gets smaller, not bigger, as the brand matures. True fashion-luxury hides its signature. It doesn't need the logo doing the talking.",
      "We chose restraint as our starting point, not something to grow into. One neutral, one accent — our warm ink and signature gold — and a crown mark that shows up mid-motion, never as the whole point of the piece.",
      "That's a deliberate lane, not a compromise. Illustrative marks like ours signal heritage-sport premium the way a wordmark-only house signals old-money fashion luxury. Different rooms, same standard.",
      "If you're looking for a brand that whispers instead of shouts, you're in the right place.",
    ],
  },
  {
    slug: "the-collector",
    title: "Notes on The Collector",
    excerpt: "For the ones who buy for the craft, not the hype cycle.",
    category: "Fashion Storytelling",
    readTime: "5 min read",
    date: "2026-03-11",
    pattern: "rib",
    tone: "cream",
    body: [
      "There's a customer we design for who doesn't chase drops. They're tired of fake scarcity — the countdown timers, the manufactured queues, the '3 left in stock' banners that reset every Monday.",
      "We call this person The Collector. They value rarity that comes from craftsmanship, not from artificial pressure. A piece earns its place in their wardrobe because of how it's made, not because it sold out in four minutes.",
      "Everything about how we build SKUBI — small batches, honest materials, no reprints just to chase a trend — is designed with The Collector in mind. If that's you, welcome home.",
    ],
  },
  {
    slug: "styling-the-overcoat",
    title: "Three Ways We're Designing the Chapter I Overcoat to Be Worn",
    excerpt: "One coat, designed to move through three completely different rooms.",
    category: "Fashion Storytelling",
    readTime: "3 min read",
    date: "2026-04-22",
    pattern: "weave",
    tone: "ink",
    body: [
      "The Chapter I Wool Overcoat is being built to do more than one job. Here's how we're designing it to move through three completely different rooms.",
      "The Boardroom: worn over the Founder's Cable Crewneck and Tailored Wool Trouser, built to be the loudest thing in the room by being the quietest.",
      "The Weekend: paired with Archive Denim and a Crown Tee, left open — structured on top, relaxed underneath. That contrast is the whole outfit.",
      "The Evening: Provenance Oxford Shirt buttoned to the top, no tie, coat fully closed. Old rules, worn new.",
    ],
  },
  {
    slug: "craftsmanship-over-scarcity",
    title: "Craftsmanship Over Fake Scarcity",
    excerpt:
      "We'll never manufacture a queue. We'll always manufacture quality.",
    category: "Brand Lore",
    readTime: "5 min read",
    date: "2026-05-30",
    pattern: "herringbone",
    tone: "gold",
    body: [
      "Fake scarcity is easy: cap the stock number artificially, add a countdown clock, and watch people panic-buy something they'd otherwise think twice about.",
      "We won't do that. When something sells out, it's because we made a considered amount, not because we engineered a shortage. The line between the two matters more than it sounds.",
      "What we will always do is manufacture quality — better wool, better construction, better finishing, one release at a time. That's a harder promise to keep than a countdown timer, and it's the only one we're interested in making.",
    ],
  },
  {
    slug: "the-quiet-flexer",
    title: "Notes on The Quiet Flexer",
    excerpt:
      "Understated quality, worn by people who don't need the room to notice.",
    category: "Fashion Storytelling",
    readTime: "4 min read",
    date: "2026-06-18",
    pattern: "grid",
    tone: "cream",
    body: [
      "The second customer we design for is The Quiet Flexer — someone frustrated by logo-mania, who'd rather the fabric and the fit do the talking than a wordmark plastered across the chest.",
      "For The Quiet Flexer, understated isn't a lack of confidence. It's a different kind of confidence — the kind that doesn't need external validation to know a piece is good.",
      "Every tonal crest, every hidden monogram lining, every piece finished the same on the inside as the outside, is built for exactly this person. If you know, you know.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}
