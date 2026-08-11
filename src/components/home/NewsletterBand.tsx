import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/NewsletterForm";

export function NewsletterBand() {
  return (
    <section className="bg-ink py-20 text-cream">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-[11px] uppercase tracking-widest-plus text-gold">
            Founding Members
          </p>
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl">
            First access to Chapter I
          </h2>
          <p className="max-w-md text-sm text-cream/60">
            No spam, no shouting, no discount games. Join now and you&rsquo;re a
            founding member of the Archive — first to know when Chapter I opens.
          </p>
          <NewsletterForm tone="cream" />
        </div>
      </Container>
    </section>
  );
}
