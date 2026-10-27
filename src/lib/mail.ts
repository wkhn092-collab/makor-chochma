import "server-only";

import { Resend } from "resend";
import { SITE } from "@/content/site";
import type { LeadInput } from "@/lib/validation/lead";
import { normalizeIlPhone } from "@/lib/validation/lead";
import { sanitizeHeaderValue } from "@/lib/sanitize";

export async function sendLeadEmail(input: LeadInput): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || SITE.email;
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const cc = process.env.LEAD_CC_EMAIL;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[lead:resend] RESEND_API_KEY missing in production");
      return { ok: false, error: "missing_resend" };
    }
    console.info("[lead:dev-no-resend]", {
      name: input.name,
      phone: normalizeIlPhone(input.phone),
      email: input.email,
      interest: input.interest,
      secondaryInterest: input.secondaryInterest,
      locale: input.locale,
    });
    return { ok: true };
  }

  const resend = new Resend(apiKey);
  const phone = normalizeIlPhone(input.phone);
  const safeName = sanitizeHeaderValue(input.name);
  const subject = sanitizeHeaderValue(
    `[ליד מקור חכמה] ${safeName} · ${input.interest}`,
  );
  const secondaryLine = input.secondaryInterest
    ? `<p><strong>עניין משני:</strong> ${escapeHtml(input.secondaryInterest)}</p>`
    : "";
  const html = `
    <h2>ליד חדש — מכון מקור חכמה</h2>
    <p><strong>שם:</strong> ${escapeHtml(safeName)}</p>
    <p><strong>טלפון:</strong> <span dir="ltr">${escapeHtml(phone)}</span></p>
    <p><strong>מייל:</strong> ${input.email ? `<span dir="ltr">${escapeHtml(input.email)}</span>` : "—"}</p>
    <p><strong>עניין:</strong> ${escapeHtml(input.interest)}</p>
    ${secondaryLine}
    <p><strong>שפה:</strong> ${escapeHtml(input.locale)}</p>
    <p>משפך: שיחת טלפון → פגישה באלעד</p>
  `;

  const { error } = await resend.emails.send({
    from: `מקור חכמה <${from}>`,
    to: [to],
    ...(cc ? { cc: [cc] } : {}),
    subject,
    html,
  });

  if (error) {
    console.error("[lead:resend]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
