export async function sendNotificationEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.STORE_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    const reason = "Missing RESEND_API_KEY or STORE_NOTIFICATION_EMAIL.";
    console.error(reason);
    return { ok: false as const, reason };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "SKUBI Website <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    console.error("Resend email error:", data);
    return { ok: false as const, reason: JSON.stringify(data) };
  }

  return { ok: true as const };
}
