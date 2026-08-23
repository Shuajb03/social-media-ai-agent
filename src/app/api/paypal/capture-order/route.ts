import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail, sendCustomerEmail } from "@/lib/sendEmail";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { PAYPAL_API_BASE, getPayPalAccessToken } from "@/lib/paypal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CheckoutLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const orderID = typeof body?.orderID === "string" ? body.orderID : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const address = typeof body?.address === "string" ? body.address.trim() : "";
  const city = typeof body?.city === "string" ? body.city.trim() : "";
  const postalCode = typeof body?.postalCode === "string" ? body.postalCode.trim() : "";
  const country = typeof body?.country === "string" ? body.country.trim() : "";
  const lines: CheckoutLine[] = Array.isArray(body?.lines) ? body.lines : [];

  if (
    !orderID ||
    !name ||
    !EMAIL_RE.test(email) ||
    !phone ||
    !address ||
    !city ||
    !postalCode ||
    !country ||
    lines.length === 0
  ) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const accessToken = await getPayPalAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { error: "PayPal isn't set up yet. Please try again later." },
      { status: 500 }
    );
  }

  const captureRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const captureData = await captureRes.json().catch(() => null);

  if (!captureRes.ok || captureData?.status !== "COMPLETED") {
    console.error("PayPal capture error:", captureData);
    return NextResponse.json(
      { error: "Your PayPal payment could not be completed. Please try again." },
      { status: 502 }
    );
  }

  const orderNumber = `SKB-${Math.floor(100000 + Math.random() * 900000)}`;

  let subtotal = 0;
  const rows = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      const lineTotal = product.price * line.quantity;
      subtotal += lineTotal;
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${product.name} (${line.color}, ${line.size}) &times; ${line.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(lineTotal)}</td>
      </tr>`;
    })
    .filter(Boolean)
    .join("");

  const shipping = subtotal >= 150 ? 0 : 12;

  const summaryTable = `
    <table style="border-collapse:collapse;width:100%;max-width:480px;">
      ${rows}
      <tr><td style="padding:8px 12px;font-weight:bold;">Shipping</td><td style="padding:8px 12px;text-align:right;">${shipping === 0 ? "Free" : formatPrice(shipping)}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;">Total</td><td style="padding:8px 12px;text-align:right;font-weight:bold;">${formatPrice(subtotal + shipping)}</td></tr>
    </table>
  `;

  const ownerHtml = `
    <h2>New order ${orderNumber} — Paid via PayPal</h2>
    <p><strong>PayPal order ID:</strong> ${orderID}</p>
    ${summaryTable}
    <h3>Customer</h3>
    <p>
      ${name}<br>
      ${email}<br>
      ${phone}
    </p>
    <h3>Shipping Address</h3>
    <p>
      ${address}<br>
      ${city}, ${postalCode}<br>
      ${country}
    </p>
  `;

  const sent = await sendNotificationEmail(`New order ${orderNumber} — SKUBI (PayPal)`, ownerHtml);
  if (!sent) {
    console.error(`Order ${orderNumber} captured on PayPal but the notification email failed to send.`);
  }

  const customerHtml = `
    <h2>Thanks for your order, ${name}!</h2>
    <p>Order <strong>${orderNumber}</strong> has been paid via PayPal — your payment has been received.</p>
    ${summaryTable}
    <p>We'll prepare your order for delivery. Questions in the meantime? Just reply to this email.</p>
  `;

  const customerSent = await sendCustomerEmail(email, `Your SKUBI order ${orderNumber}`, customerHtml);
  if (!customerSent) {
    console.error(`Order ${orderNumber} captured on PayPal but the customer confirmation email failed to send.`);
  }

  return NextResponse.json({ ok: true, orderNumber });
}
