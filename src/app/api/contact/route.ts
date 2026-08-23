import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail, sendCustomerEmail } from "@/lib/sendEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const topic = typeof body?.topic === "string" ? body.topic.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !EMAIL_RE.test(email) || !topic || !message) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  const ownerHtml = `
    <h2>New contact message — ${topic}</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `;

  const sent = await sendNotificationEmail(`Contact form: ${topic}`, ownerHtml);

  if (!sent) {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 }
    );
  }

  const customerHtml = `
    <h2>We got your message, ${name}</h2>
    <p>Thanks for reaching out about <strong>${topic}</strong> — we typically reply within one business day.</p>
    <p>For your records, here's what you sent:</p>
    <p style="color:#666;">${message.replace(/\n/g, "<br>")}</p>
  `;

  const customerSent = await sendCustomerEmail(email, "We got your message — SKUBI", customerHtml);
  if (!customerSent) {
    console.error("Contact form notified but the customer auto-reply failed to send.");
  }

  return NextResponse.json({ ok: true });
}
