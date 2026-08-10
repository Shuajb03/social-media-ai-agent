import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function StoryTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src="/brand/sk-mark-ink.png"
            alt=""
            width={471}
            height={495}
            className="mx-auto mb-6 h-12 w-auto"
          />
          <p className="mb-4 text-[11px] uppercase tracking-widest-plus text-gold-deep">
            Our Position
          </p>
          <blockquote className="font-display text-3xl italic leading-snug text-balance text-ink sm:text-4xl">
            &ldquo;Real luxury has never needed to shout. We build for the Collector
            and the Quiet Flexer &mdash; people who don&rsquo;t need the room to
            notice.&rdquo;
          </blockquote>
          <div className="mt-10">
            <Button href="/about" variant="ghost" size="md">
              Read Our Story
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
