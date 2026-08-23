import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/sendEmail";

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

  const html = `
    <h2>New contact message — ${topic}</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `;

  const sent = await sendNotificationEmail(`Contact form: ${topic}`, html);

  if (!sent.ok) {
    // TEMPORARY debug field — remove once the Resend integration is confirmed working.
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again.", debug: sent.reason },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
