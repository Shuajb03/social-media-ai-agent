import { Container } from "@/components/ui/Container";
import { Crown } from "@/components/icons/Crown";
import { NewsletterForm } from "@/components/NewsletterForm";

export function ChapterOneBanner() {
  return (
    <section className="mb-14 bg-ink py-14 text-cream sm:py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Crown className="mx-auto mb-5 h-7 w-9 text-gold" />
          <p className="mb-3 text-[11px] uppercase tracking-widest-plus text-gold">
            Chapter I
          </p>
          <h2 className="font-display text-2xl leading-tight text-balance sm:text-3xl">
            The first collection is on its way.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/65">
            Every piece below is real — we&rsquo;re just releasing slowly and
            deliberately, not rushing a launch to hit a date. Founding members of the
            Archive get first access when Chapter I opens.
          </p>
          <div className="mt-6 flex justify-center">
            <NewsletterForm tone="cream" />
          </div>
        </div>
      </Container>
    </section>
  );
}
