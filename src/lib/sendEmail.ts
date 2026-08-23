const FROM_ADDRESS = "SKUBI <support@skubiwear.com>";

async function sendViaResend(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Email sending is missing RESEND_API_KEY.");
    return false;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
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

export async function sendNotificationEmail(subject: string, html: string) {
  const to = process.env.STORE_NOTIFICATION_EMAIL;

  if (!to) {
    console.error("Email notifications are missing STORE_NOTIFICATION_EMAIL.");
    return false;
  }

  return sendViaResend(to, subject, html);
}

export async function sendCustomerEmail(to: string, subject: string, html: string) {
  return sendViaResend(to, subject, html);
}
