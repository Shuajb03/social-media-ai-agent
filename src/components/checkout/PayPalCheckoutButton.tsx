"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { CartLine } from "@/lib/types";

interface PayPalButtonsActions {
  reject: () => void;
  resolve: () => void;
}

interface PayPalNamespace {
  Buttons: (config: {
    onClick: (data: unknown, actions: PayPalButtonsActions) => void;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onError: (err: unknown) => void;
  }) => { render: (container: HTMLElement) => void };
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

export function PayPalCheckoutButton({
  clientId,
  lines,
  formRef,
  onSuccess,
  onError,
}: {
  clientId: string;
  lines: CartLine[];
  formRef: RefObject<HTMLFormElement | null>;
  onSuccess: (orderNumber: string) => void;
  onError: (message: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(() => typeof window !== "undefined" && Boolean(window.paypal));

  useEffect(() => {
    if (ready) return;
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
    script.addEventListener("load", () => setReady(true));
    script.addEventListener("error", () => onError("Could not load PayPal. Please try again."));
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  useEffect(() => {
    if (!ready || !window.paypal || !containerRef.current) return;
    containerRef.current.innerHTML = "";

    window.paypal
      .Buttons({
        onClick: (_data, actions) => {
          const form = formRef.current;
          if (form && !form.reportValidity()) {
            return actions.reject();
          }
          return actions.resolve();
        },
        createOrder: async () => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lines }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.error || "Could not start PayPal checkout.");
          return data.id;
        },
        onApprove: async (data) => {
          const form = formRef.current;
          const formData = form ? new FormData(form) : new FormData();
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID: data.orderID,
              name: formData.get("name"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              address: formData.get("address"),
              city: formData.get("city"),
              postalCode: formData.get("postalCode"),
              country: formData.get("country"),
              lines,
            }),
          });
          const result = await res.json();
          if (res.ok) {
            onSuccess(result.orderNumber);
          } else {
            onError(result?.error || "Something went wrong completing your PayPal payment.");
          }
        },
        onError: () => {
          onError("Something went wrong with PayPal. Please try again.");
        },
      })
      .render(containerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return <div ref={containerRef} className="mt-4" />;
}
