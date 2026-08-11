"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { markNewsletterPopupDismissed } from "@/lib/newsletterPopup";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  tone = "cream",
  onSuccess,
}: {
  tone?: "cream" | "ink";
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        markNewsletterPopupDismissed();
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const isCream = tone === "cream";

  if (status === "success") {
    return (
      <p className={clsx("text-sm", isCream ? "text-cream" : "text-ink")}>
        Almost there — check your inbox to confirm your email.
      </p>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-0">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          disabled={status === "loading"}
          className={clsx(
            "w-full border-b bg-transparent py-2.5 text-sm placeholder:opacity-50 focus:outline-none disabled:opacity-60",
            isCream ? "border-cream/30 text-cream placeholder:text-cream" : "border-ink/30 text-ink placeholder:text-ink"
          )}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
          className={clsx(
            "flex shrink-0 items-center gap-1 border-b py-2.5 pl-3 text-xs uppercase tracking-widest-plus disabled:opacity-60",
            isCream ? "border-cream/30 text-cream" : "border-ink/30 text-ink"
          )}
        >
          {status === "loading" ? "Joining..." : "Join"}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </form>
      {status === "error" && (
        <p className={clsx("mt-2 text-xs", isCream ? "text-gold" : "text-red-700/80")}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
