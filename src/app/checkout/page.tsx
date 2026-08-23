"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/cart";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { PayPalCheckoutButton } from "@/components/checkout/PayPalCheckoutButton";
import { BANK_DETAILS, bankDetailsConfigured } from "@/lib/bankDetails";

type PaymentMethod = "cod" | "bank-transfer" | "paypal";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function CheckoutPage() {
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const shippingEstimate = subtotal >= 150 || subtotal === 0 ? 0 : 12;

  function handlePayPalSuccess(newOrderNumber: string) {
    setOrderNumber(newOrderNumber);
    setOrderTotal(subtotal + shippingEstimate);
    setPlaced(true);
    clear();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || payment === "paypal") return;
    setSubmitting(true);
    setError("");

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          city: data.get("city"),
          postalCode: data.get("postalCode"),
          country: data.get("country"),
          payment,
          lines,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        setOrderNumber(result.orderNumber);
        setOrderTotal(subtotal + shippingEstimate);
        setPlaced(true);
        clear();
      } else {
        setError(result?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <div className="py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold">
              <Check className="h-6 w-6 text-ink" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-3xl text-ink">Order Received</h1>
            <p className="mt-4 text-sm leading-relaxed text-ink/60">
              Order <span className="text-ink">{orderNumber}</span> has been placed via{" "}
              {payment === "cod" ? "Cash on Delivery" : payment === "paypal" ? "PayPal" : "Bank Transfer"}
              .{" "}
              {payment === "bank-transfer"
                ? "Please complete the transfer below — we'll confirm and prepare your order once it's received."
                : payment === "paypal"
                  ? "Your payment has been received — we'll prepare your order for delivery."
                  : "We'll reach out within 24 hours to confirm details and delivery."}
            </p>
            {payment === "bank-transfer" && (
              <div className="mt-6 border border-line bg-cream-soft p-6 text-left">
                <p className="mb-4 text-[11px] uppercase tracking-widest-plus text-ink/50">
                  Bank Transfer Details
                </p>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/50">Amount</dt>
                    <dd className="text-right text-ink">{formatPrice(orderTotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/50">Bank</dt>
                    <dd className="text-right text-ink">{BANK_DETAILS.bankName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/50">Account Holder</dt>
                    <dd className="text-right text-ink">{BANK_DETAILS.accountHolder}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/50">IBAN</dt>
                    <dd className="text-right text-ink">{BANK_DETAILS.iban}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/50">SWIFT/BIC</dt>
                    <dd className="text-right text-ink">{BANK_DETAILS.swift}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/50">Reference</dt>
                    <dd className="text-right text-ink">{orderNumber}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-ink/50">
                  Please use your order number as the payment reference, and send proof of
                  payment to{" "}
                  <a href="mailto:support@skubiwear.com" className="underline underline-offset-4">
                    support@skubiwear.com
                  </a>{" "}
                  so we can confirm and ship your order.
                </p>
              </div>
            )}
            <Button href="/shop" className="mt-8">
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="py-24 text-center">
        <Container>
          <p className="text-sm text-ink/60">Your bag is empty.</p>
          <Button href="/shop" className="mt-6">
            Continue Shopping
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-14">
      <Container>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Checkout</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <section>
              <h2 className="mb-5 text-xs uppercase tracking-widest-plus text-ink/50">
                Contact
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Full name" className="fld" />
                <input name="email" required type="email" placeholder="Email address" className="fld" />
                <input name="phone" required type="tel" placeholder="Phone number" className="fld sm:col-span-2" />
              </div>
            </section>

            <section>
              <h2 className="mb-5 text-xs uppercase tracking-widest-plus text-ink/50">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input name="address" required placeholder="Address" className="fld sm:col-span-2" />
                <input name="city" required placeholder="City" className="fld" />
                <input name="postalCode" required placeholder="Postal code" className="fld" />
                <select name="country" required defaultValue="" className="fld sm:col-span-2">
                  <option value="" disabled>
                    Country
                  </option>
                  <option>Kosovo</option>
                  <option>Albania</option>
                  <option>Germany</option>
                  <option>Switzerland</option>
                  <option>Other EU</option>
                </select>
              </div>
            </section>

            <section>
              <h2 className="mb-5 text-xs uppercase tracking-widest-plus text-ink/50">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label
                  className={clsx(
                    "flex cursor-pointer items-center justify-between border p-4",
                    payment === "cod" ? "border-ink" : "border-line"
                  )}
                >
                  <span className="flex items-center gap-3 text-sm text-ink">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      className="accent-gold"
                    />
                    Cash on Delivery
                  </span>
                  <span className="text-xs text-ink/40">Kosovo only</span>
                </label>
                {bankDetailsConfigured && (
                  <label
                    className={clsx(
                      "flex cursor-pointer items-center justify-between border p-4",
                      payment === "bank-transfer" ? "border-ink" : "border-line"
                    )}
                  >
                    <span className="flex items-center gap-3 text-sm text-ink">
                      <input
                        type="radio"
                        name="payment"
                        checked={payment === "bank-transfer"}
                        onChange={() => setPayment("bank-transfer")}
                        className="accent-gold"
                      />
                      Bank Transfer
                    </span>
                    <span className="text-xs text-ink/40">Details shown after checkout</span>
                  </label>
                )}
                {PAYPAL_CLIENT_ID && (
                  <label
                    className={clsx(
                      "flex cursor-pointer items-center justify-between border p-4",
                      payment === "paypal" ? "border-ink" : "border-line"
                    )}
                  >
                    <span className="flex items-center gap-3 text-sm text-ink">
                      <input
                        type="radio"
                        name="payment"
                        checked={payment === "paypal"}
                        onChange={() => setPayment("paypal")}
                        className="accent-gold"
                      />
                      PayPal
                    </span>
                    <span className="text-xs text-ink/40">Card or PayPal balance</span>
                  </label>
                )}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 border border-line p-6">
              <h2 className="font-display text-xl text-ink">Order Summary</h2>
              <ul className="mt-5 space-y-3">
                {lines.map((line) => {
                  const product = products.find((p) => p.id === line.productId);
                  if (!product) return null;
                  return (
                    <li
                      key={`${line.productId}-${line.size}-${line.color}`}
                      className="flex justify-between text-sm text-ink/70"
                    >
                      <span>
                        {product.name} &times; {line.quantity}
                      </span>
                      <span>{formatPrice(product.price * line.quantity)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Shipping</span>
                  <span>{shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}</span>
                </div>
              </div>
              <div className="mt-5 flex justify-between border-t border-line pt-5 text-base font-medium text-ink">
                <span>Total</span>
                <span>{formatPrice(subtotal + shippingEstimate)}</span>
              </div>
              {payment === "paypal" && PAYPAL_CLIENT_ID ? (
                <div className="mt-6">
                  <PayPalCheckoutButton
                    clientId={PAYPAL_CLIENT_ID}
                    lines={lines}
                    formRef={formRef}
                    onSuccess={handlePayPalSuccess}
                    onError={setError}
                  />
                </div>
              ) : (
                <Button type="submit" disabled={submitting} className="mt-6 w-full">
                  {submitting ? "Placing Order..." : "Place Order"}
                </Button>
              )}
              {error && (
                <p className="mt-3 text-center text-xs text-red-700/80">{error}</p>
              )}
              <p className="mt-4 text-center text-[11px] text-ink/40">
                By placing this order you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4">
                  terms
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
