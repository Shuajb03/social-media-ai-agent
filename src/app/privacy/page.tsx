import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SKUBI collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">Legal</p>
          <h1 className="mb-4 font-display text-4xl text-ink sm:text-5xl">Privacy Policy</h1>
          <p className="mb-10 text-xs text-ink/40">Last updated August 2026.</p>

          <div className="space-y-8 text-sm leading-relaxed text-ink/70">
            <p>
              SKUBI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates skubiwear.com. This page explains
              what personal data we collect when you use the site, why we collect it, and the
              choices you have.
            </p>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">What we collect</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="text-ink">Newsletter sign-up:</span> your email address, stored
                  with our email provider, Mailchimp, so we can send you updates about new releases.
                </li>
                <li>
                  <span className="text-ink">Orders:</span> your name, email, phone number, and
                  delivery address, used only to fulfil and communicate about your order.
                </li>
                <li>
                  <span className="text-ink">Contact form:</span> your name, email, and message,
                  used only to reply to your enquiry.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">What we don&rsquo;t do</h2>
              <p>
                We don&rsquo;t sell your data to third parties, and we don&rsquo;t run third-party
                advertising trackers on this site. Your information is used only for the purposes
                described above.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Your rights</h2>
              <p>
                You can ask us at any time what data we hold about you, ask us to correct or delete
                it, or unsubscribe from our mailing list (every email includes an unsubscribe link).
                To make any of these requests, email{" "}
                <a href="mailto:support@skubiwear.com" className="text-ink underline underline-offset-4">
                  support@skubiwear.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-xl text-ink">Changes to this policy</h2>
              <p>
                If this policy changes, we&rsquo;ll update this page and change the date above. If
                you have questions, reach out any time.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
