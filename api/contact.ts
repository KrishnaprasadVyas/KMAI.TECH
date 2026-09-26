// Serverless Contact Form Endpoint for Vercel / Node
// Integrates with Resend API to deliver project inquiries directly to Kmai.tech.support@gmail.com

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
  // CORS support
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse body safely
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  } else if (!body && typeof req.json === 'function') {
    try {
      body = await req.json();
    } catch {
      body = {};
    }
  }

  const { name, email, message } = body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  const sanitizedName = name.trim();
  const sanitizedEmail = email.trim();
  const sanitizedMessage = typeof message === 'string' ? message.trim() : '';

  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'Kmai.tech.support@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'KMAI Studio <onboarding@resend.dev>';

  if (!apiKey) {
    console.warn('[API/Contact] RESEND_API_KEY environment variable is not configured.');
    return res.status(500).json({
      error: 'Email service is not yet configured. Please reach out directly to Kmai.tech.support@gmail.com.',
    });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: sanitizedEmail,
        subject: `[KMAI Project Inquiry] ${sanitizedName}`,
        text: `New Studio Project Inquiry\n\nName: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nProject Scope & Message:\n${sanitizedMessage || '(No scope details provided)'}\n\n---\nDispatched via KMAI Studio automated pipeline (kmai.tech)`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #07090E; color: #F5F5F7; border-radius: 8px;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #216BFF; font-weight: 700;">// INCOMING STUDIO INQUIRY</span>
              <h1 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin: 6px 0 0 0; letter-spacing: -0.02em;">New Client Conversation</h1>
            </div>

            <div style="background-color: #0E131F; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #8E939E; width: 80px;">Client</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 600; color: #FFFFFF;">${escapeHtml(sanitizedName)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #8E939E;">Email</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 600; color: #216BFF;">
                    <a href="mailto:${escapeHtml(sanitizedEmail)}" style="color: #216BFF; text-decoration: none;">${escapeHtml(sanitizedEmail)}</a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 28px;">
              <h2 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8E939E; margin: 0 0 10px 0;">Project Scope &amp; Goals</h2>
              <div style="font-size: 15px; line-height: 1.6; color: #E5E7EB; white-space: pre-wrap; background: #0E131F; padding: 18px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                ${escapeHtml(sanitizedMessage || '(No message content provided)')}
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
              <p style="font-size: 12px; color: #6B7280; margin: 0; line-height: 1.5;">
                This message was submitted via the contact form on <a href="https://www.kmai.tech" style="color: #8E939E;">kmai.tech</a>.<br/>
                Replying to this email will respond directly to <strong>${escapeHtml(sanitizedEmail)}</strong>.
              </p>
            </div>
          </div>
        `,
      }),
    });

    const data = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error('[API/Contact] Resend API error response:', data);
      return res.status(resendResponse.status).json({
        error: data.message || 'Failed to dispatch email via Resend.',
      });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('[API/Contact] Network or internal error communicating with Resend:', error);
    return res.status(500).json({ error: 'Server error processing contact inquiry.' });
  }
}
