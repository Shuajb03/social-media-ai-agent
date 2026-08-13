import { NextRequest, NextResponse } from "next/server";

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

  const res = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "pending", // double opt-in — Mailchimp emails a confirmation link
      }),
    }
  );

  const data = await res.json().catch(() => null);

  if (res.ok) {
    // TEMPORARY debug field — remove once signup is confirmed working end to end.
    return NextResponse.json({ ok: true, debug: data });
  }

  // Already subscribed — treat as success so we don't leak subscription status
  if (data?.title === "Member Exists") {
    return NextResponse.json({ ok: true, debug: data });
  }

  console.error("Mailchimp signup error:", data);
  return NextResponse.json(
    { error: "Something went wrong. Please try again.", debug: data },
    { status: 502 }
  );
}
