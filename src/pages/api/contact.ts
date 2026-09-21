import type { APIRoute } from 'astro';
import { z } from 'astro/zod';

export const prerender = false;

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.email().max(320),
  company: z.string().min(1).max(200),
  service: z.string().min(1).max(100),
  message: z.string().min(1).max(5000),
});

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Please fill in every field correctly.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, company, service, message } = parsed.data;

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toAddress = import.meta.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toAddress) {
    console.warn(
      '[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not configured — email not sent. Submission was:',
      { name, email, company, service }
    );
    return new Response(
      JSON.stringify({
        error: 'Email delivery isn’t configured yet on this environment. The message was not sent.',
      }),
      { status: 501, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AWISEE Contact Form <contact@awisee.com>',
      to: toAddress,
      reply_to: email,
      subject: `New enquiry from ${name} (${company})`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\n\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error('[contact] Resend API error:', resendResponse.status, errorBody);
    return new Response(JSON.stringify({ error: 'Could not send your message. Please try again shortly.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
