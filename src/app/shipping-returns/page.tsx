import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping times, costs, and our returns policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">Help</p>
          <h1 className="mb-10 font-display text-4xl text-ink sm:text-5xl">Shipping &amp; Returns</h1>

          <div className="space-y-8 text-sm leading-relaxed text-ink/70">
            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Where we ship</h2>
              <p>
                We ship across Kosovo and the wider EU. Cash on Delivery is available for Kosovo
                orders; Bank Transfer is available everywhere we ship, with details sent by email
                after you place your order.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Shipping cost &amp; timing</h2>
              <p>
                Shipping is free on orders over &euro;150; otherwise a flat &euro;12 applies,
                calculated at checkout. Orders are typically prepared within 1&ndash;2 business
                days and delivered within 3&ndash;7 business days depending on destination.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Returns</h2>
              <p>
                We accept returns within 30 days of delivery on unworn pieces with original tags
                still attached. To start a return, email{" "}
                <a href="mailto:hello@skubiwear.com" className="text-ink underline underline-offset-4">
                  hello@skubiwear.com
                </a>{" "}
                with your order number and we&rsquo;ll send return instructions. Once we receive
                and inspect the piece, we&rsquo;ll issue a refund to your original payment method
                (or arrange a bank transfer refund for Cash on Delivery orders).
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Exchanges</h2>
              <p>
                Need a different size? Let us know in the same email &mdash; we&rsquo;ll arrange an
                exchange where the size is in stock.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Damaged or incorrect items</h2>
              <p>
                If something arrives damaged or isn&rsquo;t what you ordered, contact us within 7
                days of delivery with a photo and your order number, and we&rsquo;ll sort it out at
                no cost to you.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
