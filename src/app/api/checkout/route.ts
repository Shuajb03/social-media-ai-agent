import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/sendEmail";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CheckoutLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const address = typeof body?.address === "string" ? body.address.trim() : "";
  const city = typeof body?.city === "string" ? body.city.trim() : "";
  const postalCode = typeof body?.postalCode === "string" ? body.postalCode.trim() : "";
  const country = typeof body?.country === "string" ? body.country.trim() : "";
  const payment = body?.payment === "bank-transfer" ? "bank-transfer" : "cod";
  const lines: CheckoutLine[] = Array.isArray(body?.lines) ? body.lines : [];

  if (
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

  const html = `
    <h2>New order ${orderNumber}</h2>
    <p><strong>Payment method:</strong> ${payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}</p>
    <table style="border-collapse:collapse;width:100%;max-width:480px;">
      ${rows}
      <tr><td style="padding:8px 12px;font-weight:bold;">Shipping</td><td style="padding:8px 12px;text-align:right;">${shipping === 0 ? "Free" : formatPrice(shipping)}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;">Total</td><td style="padding:8px 12px;text-align:right;font-weight:bold;">${formatPrice(subtotal + shipping)}</td></tr>
    </table>
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

  const sent = await sendNotificationEmail(`New order ${orderNumber} — SKUBI`, html);

  if (!sent) {
    return NextResponse.json(
      { error: "Something went wrong placing your order. Please try again or contact us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, orderNumber });
}
