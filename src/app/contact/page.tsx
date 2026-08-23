import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SKUBI — order support, shipping and returns, sizing, and press inquiries.",
};

const FAQ = [
  {
    q: "Where do you ship?",
    a: "We ship across Kosovo and the wider EU, with Cash on Delivery available for Kosovo orders and bank transfer everywhere else.",
  },
  {
    q: "What's your returns policy?",
    a: "30 days on unworn pieces with original tags attached. Reach out and we'll send return instructions.",
  },
  {
    q: "How do I find my size?",
    a: "Every product page includes a full size guide with chest, waist, and length measurements in centimeters.",
  },
];

export default function ContactPage() {
  return (
    <div className="py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">
              Get in Touch
            </p>
            <h1 className="mb-6 font-display text-4xl text-ink sm:text-5xl">Contact Us</h1>
            <p className="mb-10 max-w-md text-sm leading-relaxed text-ink/65">
              Questions about an order, sizing, or a piece you&rsquo;re thinking
              about? Send a note and we&rsquo;ll get back to you personally &mdash;
              no bots, no ticket numbers.
            </p>
            <ContactForm />
          </div>

          <div className="lg:pl-8">
            <div className="mb-12">
              <h2 className="mb-4 text-xs uppercase tracking-widest-plus text-ink/50">
                Direct
              </h2>
              <p className="text-sm text-ink/70">
                Email:{" "}
                <a href="mailto:support@skubiwear.com" className="text-ink underline underline-offset-4">
                  support@skubiwear.com
                </a>
              </p>
              <p className="mt-1 text-sm text-ink/70">Based in Kosovo &middot; Shipping to the EU</p>
            </div>

            <div>
              <h2 className="mb-4 text-xs uppercase tracking-widest-plus text-ink/50">
                Frequently Asked
              </h2>
              <div className="divide-y divide-line border-y border-line">
                {FAQ.map((item) => (
                  <div key={item.q} className="py-5">
                    <h3 className="text-sm font-medium text-ink">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
