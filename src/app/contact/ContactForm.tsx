"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex items-start gap-3 border border-line bg-cream-soft p-6">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
        <p className="text-sm text-ink/70">
          Message received. We typically reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input required placeholder="Full name" className="fld" />
        <input required type="email" placeholder="Email address" className="fld" />
      </div>
      <select required defaultValue="" className="fld">
        <option value="" disabled>
          What&rsquo;s this about?
        </option>
        <option>Order Support</option>
        <option>Shipping &amp; Returns</option>
        <option>Sizing Question</option>
        <option>Press &amp; Collaborations</option>
        <option>Something Else</option>
      </select>
      <textarea required placeholder="Your message" rows={5} className="fld resize-none" />
      <Button type="submit" size="lg">
        Send Message
      </Button>
    </form>
  );
}
