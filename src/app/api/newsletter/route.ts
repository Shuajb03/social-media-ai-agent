import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    console.error("Newsletter signup is missing Mailchimp environment variables.");
    return NextResponse.json(
      { error: "Newsletter signup isn't set up yet. Please try again later." },
      { status: 500 }
    );
  }

  // Upsert by subscriber hash (MD5 of lowercased email) so a repeat signup
  // updates the existing record instead of erroring, and new signups go
  // straight to "subscribed" — no double opt-in confirmation email needed.
  const subscriberHash = createHash("md5").update(email.toLowerCase()).digest("hex");

  const res = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
      }),
    }
  );

  if (res.ok) {
    return NextResponse.json({ ok: true });
  }

  const data = await res.json().catch(() => null);
  console.error("Mailchimp signup error:", data);
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
}
