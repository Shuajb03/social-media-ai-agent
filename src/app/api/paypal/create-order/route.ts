import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data/products";
import { PAYPAL_API_BASE, getPayPalAccessToken } from "@/lib/paypal";

interface CheckoutLine {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const lines: CheckoutLine[] = Array.isArray(body?.lines) ? body.lines : [];

  if (lines.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  const hasUnavailableItem = lines.some((line) => {
    const product = products.find((p) => p.id === line.productId);
    return !product || product.available !== true;
  });
  if (hasUnavailableItem) {
    return NextResponse.json(
      { error: "One or more items in your bag are not yet available to order." },
      { status: 400 }
    );
  }

  let subtotal = 0;
  for (const line of lines) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) continue;
    subtotal += product.price * line.quantity;
  }

  if (subtotal <= 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  const shipping = subtotal >= 150 ? 0 : 12;
  const total = (subtotal + shipping).toFixed(2);

  const accessToken = await getPayPalAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { error: "PayPal isn't set up yet. Please try again later." },
      { status: 500 }
    );
  }

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "EUR", value: total } }],
    }),
  });

  if (!res.ok) {
    console.error("PayPal create order error:", await res.json().catch(() => null));
    return NextResponse.json(
      { error: "Something went wrong starting your PayPal payment." },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json({ id: data.id });
}
