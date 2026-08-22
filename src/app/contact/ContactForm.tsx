"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("topic"),
          message: data.get("message"),
        }),
      });
      const result = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        setError(result?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
        <input name="name" required placeholder="Full name" className="fld" />
        <input name="email" required type="email" placeholder="Email address" className="fld" />
      </div>
      <select name="topic" required defaultValue="" className="fld">
        <option value="" disabled>
          What&rsquo;s this about?
        </option>
        <option>Order Support</option>
        <option>Shipping &amp; Returns</option>
        <option>Sizing Question</option>
        <option>Press &amp; Collaborations</option>
        <option>Something Else</option>
      </select>
      <textarea name="message" required placeholder="Your message" rows={5} className="fld resize-none" />
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
      {error && <p className="text-xs text-red-700/80">{error}</p>}
    </form>
  );
}
