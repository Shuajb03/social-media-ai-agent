"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export function NewsletterForm({ tone = "cream" }: { tone?: "cream" | "ink" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  const isCream = tone === "cream";

  if (submitted) {
    return (
      <p className={clsx("text-sm", isCream ? "text-cream" : "text-ink")}>
        You&rsquo;re on the list. Welcome to the archive.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-0">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className={clsx(
          "w-full border-b bg-transparent py-2.5 text-sm placeholder:opacity-50 focus:outline-none",
          isCream ? "border-cream/30 text-cream placeholder:text-cream" : "border-ink/30 text-ink placeholder:text-ink"
        )}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className={clsx(
          "flex shrink-0 items-center gap-1 border-b py-2.5 pl-3 text-xs uppercase tracking-widest-plus",
          isCream ? "border-cream/30 text-cream" : "border-ink/30 text-ink"
        )}
      >
        Join
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </form>
  );
}
