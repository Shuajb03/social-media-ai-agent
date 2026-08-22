export async function sendNotificationEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.STORE_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    console.error("Email notifications are missing RESEND_API_KEY or STORE_NOTIFICATION_EMAIL.");
    return false;
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
    return false;
  }

  return true;
}
