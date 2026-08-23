import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you order from SKUBI.",
};

export default function TermsPage() {
  return (
    <div className="py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">Legal</p>
          <h1 className="mb-4 font-display text-4xl text-ink sm:text-5xl">Terms of Service</h1>
          <p className="mb-10 text-xs text-ink/40">Last updated August 2026.</p>

          <div className="space-y-8 text-sm leading-relaxed text-ink/70">
            <p>
              These terms apply whenever you order from skubiwear.com. By placing an order, you
              agree to them.
            </p>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Orders &amp; payment</h2>
              <p>
                We currently accept Cash on Delivery (Kosovo only) and Bank Transfer (Kosovo and
                the wider EU). Prices are shown in Euros and include VAT where applicable. We
                reserve the right to decline or cancel an order &mdash; for example if a piece is
                out of stock &mdash; in which case we&rsquo;ll contact you directly.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Shipping</h2>
              <p>
                We ship across Kosovo and the wider EU. Estimated delivery times and shipping costs
                are shown at checkout. See our{" "}
                <a href="/shipping-returns" className="text-ink underline underline-offset-4">
                  Shipping &amp; Returns
                </a>{" "}
                page for details.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Returns &amp; right of withdrawal</h2>
              <p>
                If you&rsquo;re an EU consumer, you have a legal right to cancel your order within
                14 days of receiving it, without giving a reason. We go further than that: we
                accept returns within 30 days on unworn pieces with original tags attached. Full
                details are on our{" "}
                <a href="/shipping-returns" className="text-ink underline underline-offset-4">
                  Shipping &amp; Returns
                </a>{" "}
                page.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Product information</h2>
              <p>
                We describe every piece as accurately as we can, including sizing in centimeters on
                each product page. Colors may vary slightly from photos depending on your screen.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Contact</h2>
              <p>
                Questions about these terms, an order, or anything else &mdash; reach us at{" "}
                <a href="mailto:support@skubiwear.com" className="text-ink underline underline-offset-4">
                  support@skubiwear.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
