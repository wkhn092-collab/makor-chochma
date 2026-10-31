import "server-only";

import { Resend } from "resend";
import { SITE, interestLabel, type InterestId } from "@/content/site";
import type { LeadInput } from "@/lib/validation/lead";
import { normalizeIlPhone } from "@/lib/validation/lead";
import { sanitizeHeaderValue } from "@/lib/sanitize";

const INK = "#4F3910";
const BRONZE = "#79705C";
const PARCHMENT = "#F2EFE9";
const CTA = "#6B4E1F";
const CARD = "#FFFcf7";
const RULE = "#E4D9C8";

export async function sendLeadEmail(
  input: LeadInput,
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || SITE.email;
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const cc = process.env.LEAD_CC_EMAIL;
  const fromName = SITE.brandShort;

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
  const interestHe =
    interestLabel(input.interest as InterestId, "he") ?? input.interest;
  const interestEn =
    interestLabel(input.interest as InterestId, "en") ?? input.interest;
  const interestShown = input.locale === "en" ? interestEn : interestHe;
  const secondaryShown = input.secondaryInterest
    ? interestLabel(
        input.secondaryInterest as InterestId,
        input.locale === "en" ? "en" : "he",
      ) ?? input.secondaryInterest
    : null;

  const adminSubject = sanitizeHeaderValue(
    `[ליד מקור חכמה] ${safeName} · ${interestHe}`,
  );

  const { data: adminData, error: adminError } = await resend.emails.send({
    from: `${fromName} <${from}>`,
    to: [to],
    ...(cc ? { cc: [cc] } : {}),
    subject: adminSubject,
    html: buildAdminLeadHtml({
      name: safeName,
      phone,
      email: input.email,
      interest: interestHe,
      secondary: secondaryShown,
      locale: input.locale,
    }),
  });

  if (adminError) {
    console.error("[lead:resend]", {
      message: adminError.message,
      name: adminError.name,
      to,
      from,
    });
    return { ok: false, error: adminError.message };
  }
  console.info("[lead:resend] admin ok", { id: adminData?.id, to });

  const customerEmail = input.email?.trim();
  if (customerEmail) {
    const confirmSubject =
      input.locale === "en"
        ? sanitizeHeaderValue(
            `We received your details · ${SITE.brandEn}`,
          )
        : sanitizeHeaderValue(`קיבלנו את הפרטים · ${SITE.brandShort}`);

    const { data: confirmData, error: confirmError } = await resend.emails.send({
      from: `${fromName} <${from}>`,
      to: [customerEmail],
      subject: confirmSubject,
      html: buildCustomerConfirmHtml({
        name: safeName,
        interest: interestShown,
        locale: input.locale === "en" ? "en" : "he",
      }),
    });

    if (confirmError) {
      // Don't fail the lead — admin mail already sent. Log for ops.
      console.error("[lead:resend:confirm]", {
        message: confirmError.message,
        name: confirmError.name,
        to: customerEmail,
        from,
      });
    } else {
      console.info("[lead:resend] confirm ok", {
        id: confirmData?.id,
        to: customerEmail,
      });
    }
  } else {
    console.info("[lead:resend] confirm skipped — no customer email");
  }

  return { ok: true };
}

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://makor-chochma.vercel.app"
  );
}

function logoUrl(): string {
  return `${siteUrl()}/logo.jpg`;
}

function waUrl(): string {
  return `https://wa.me/${SITE.phoneE164}`;
}

function telUrl(): string {
  return `tel:+${SITE.phoneE164}`;
}

/** Branded site link card — works in major email clients */
function siteLinkCard(opts: {
  href: string;
  label: string;
  hint: string;
  dir: "rtl" | "ltr";
}): string {
  const host = siteUrl().replace(/^https?:\/\//, "");
  return `
    <a href="${opts.href}" style="display:block;text-decoration:none;margin:22px 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${RULE};border-radius:14px;overflow:hidden;background:linear-gradient(180deg,#FFFcf7 0%,${PARCHMENT} 100%);">
        <tr>
          <td style="padding:14px 16px;width:56px;vertical-align:middle;">
            <img src="${logoUrl()}" width="44" height="44" alt="${escapeHtml(SITE.brandShort)}" style="display:block;width:44px;height:44px;border-radius:10px;border:1px solid ${RULE};object-fit:cover;" />
          </td>
          <td style="padding:14px 16px 14px 0;vertical-align:middle;text-align:${opts.dir === "rtl" ? "right" : "left"};">
            <p style="margin:0 0 2px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRONZE};font-family:Arial,Helvetica,sans-serif;">
              ${escapeHtml(opts.hint)}
            </p>
            <p style="margin:0 0 2px;font-size:16px;font-weight:700;color:${INK};font-family:Georgia,'Times New Roman',serif;">
              ${escapeHtml(opts.label)}
            </p>
            <p style="margin:0;font-size:13px;color:${CTA};font-family:Arial,Helvetica,sans-serif;direction:ltr;text-align:${opts.dir === "rtl" ? "right" : "left"};">
              ${escapeHtml(host)} →
            </p>
          </td>
        </tr>
      </table>
    </a>
  `;
}

function buildAdminLeadHtml(opts: {
  name: string;
  phone: string;
  email?: string | null;
  interest: string;
  secondary: string | null;
  locale: string;
}): string {
  const emailCell = opts.email
    ? `<a href="mailto:${escapeHtml(opts.email)}" style="color:${CTA};text-decoration:none;"><span dir="ltr">${escapeHtml(opts.email)}</span></a>`
    : "—";
  const secondaryRow = opts.secondary
    ? row("עניין משני", escapeHtml(opts.secondary))
    : "";

  return emailShell({
    dir: "rtl",
    lang: "he",
    preheader: `ליד חדש: ${opts.name} · ${opts.interest}`,
    title: "ליד חדש הגיע",
    eyebrow: SITE.brand,
    body: `
      <p style="margin:0 0 22px;font-size:16px;line-height:1.55;color:${BRONZE};">
        פרטים לשיחת ייעוץ — משפך: שיחה ← פגישה באלעד
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="rtl" style="border-collapse:collapse;background:${PARCHMENT};border-radius:12px;overflow:hidden;direction:rtl;">
        ${row("שם", escapeHtml(opts.name))}
        ${row("טלפון", `<a href="${telUrl()}" style="color:${CTA};text-decoration:none;"><span dir="ltr">${escapeHtml(opts.phone)}</span></a>`)}
        ${row("מייל", emailCell)}
        ${row("עניין", escapeHtml(opts.interest))}
        ${secondaryRow}
        ${row("שפה", escapeHtml(opts.locale === "he" ? "עברית" : opts.locale))}
      </table>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
        <tr>
          <td style="padding:0 0 0 10px;">
            <a href="${telUrl()}" style="${btnStyle()}">התקשרו עכשיו</a>
          </td>
          <td style="padding:0;">
            <a href="${waUrl()}" style="${btnStyle(true)}">וואטסאפ</a>
          </td>
        </tr>
      </table>
      ${siteLinkCard({
        href: siteUrl(),
        label: SITE.brand,
        hint: "פתחו את האתר",
        dir: "rtl",
      })}
    `,
  });
}

function buildCustomerConfirmHtml(opts: {
  name: string;
  interest: string;
  locale: "he" | "en";
}): string {
  const he = opts.locale === "he";
  const first = opts.name.trim().split(/\s+/)[0] || opts.name;

  if (he) {
    return emailShell({
      dir: "rtl",
      lang: "he",
      preheader: "קיבלנו את הפנייה — נחזור אליכם לתיאום שיחה",
      title: `תודה, ${escapeHtml(first)}`,
      eyebrow: SITE.brand,
      body: `
        <p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:${INK};">
          הפרטים שלכם אצלנו במכון מקור חכמה.
        </p>
        <p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:${BRONZE};">
          ביקשתם שיחה בנושא <strong style="color:${INK};">${escapeHtml(opts.interest)}</strong>.
          נחזור אליכם בהקדם לתיאום שיחת ייעוץ קצרה — בלי התחייבות — ואם מתאים גם לפגישה באלעד.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0;border-collapse:collapse;background:${PARCHMENT};border-radius:12px;">
          <tr>
            <td style="padding:18px 20px;font-size:14px;line-height:1.6;color:${BRONZE};">
              <strong style="color:${INK};display:block;margin-bottom:6px;">מה הלאה?</strong>
              1. אנחנו מתקשרים / כותבים בוואטסאפ<br/>
              2. מבהירים יחד מה צריך (הידור, לוחות זמנים)<br/>
              3. אם מתאים — פגישה בסדנה באלעד
            </td>
          </tr>
        </table>
        <p style="margin:0 0 22px;font-size:14px;line-height:1.55;color:${BRONZE};">
          רוצים לדבר עכשיו? ${SITE.contactName} ·
          <a href="${telUrl()}" style="color:${CTA};text-decoration:none;"><span dir="ltr">${SITE.phoneDisplay}</span></a>
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0;">
              <a href="${waUrl()}" style="${btnStyle()}">וואטסאפ עכשיו</a>
            </td>
          </tr>
        </table>
        ${siteLinkCard({
          href: `${siteUrl()}/#lead`,
          label: SITE.brand,
          hint: "חזרו לאתר",
          dir: "rtl",
        })}
      `,
    });
  }

  return emailShell({
    dir: "ltr",
    lang: "en",
    preheader: "We received your request — we'll be in touch to schedule a call",
    title: `Thank you, ${escapeHtml(first)}`,
    eyebrow: SITE.brandEn,
    body: `
      <p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:${INK};">
        We have your details at ${SITE.brandEn}.
      </p>
      <p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:${BRONZE};">
        You asked about <strong style="color:${INK};">${escapeHtml(opts.interest)}</strong>.
        We'll get back to you shortly to schedule a short consult call — no obligation — and an in-person meeting in Elad if it fits.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0;border-collapse:collapse;background:${PARCHMENT};border-radius:12px;">
        <tr>
          <td style="padding:18px 20px;font-size:14px;line-height:1.6;color:${BRONZE};">
            <strong style="color:${INK};display:block;margin-bottom:6px;">What's next?</strong>
            1. We call or message on WhatsApp<br/>
            2. We clarify what you need (hidur, timing)<br/>
            3. If it fits — a meeting at the workshop in Elad
          </td>
        </tr>
      </table>
      <p style="margin:0 0 22px;font-size:14px;line-height:1.55;color:${BRONZE};">
        Prefer to talk now? ${SITE.contactNameEn} ·
        <a href="${telUrl()}" style="color:${CTA};text-decoration:none;"><span dir="ltr">${SITE.phoneDisplay}</span></a>
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:0;">
            <a href="${waUrl()}" style="${btnStyle()}">WhatsApp now</a>
          </td>
        </tr>
      </table>
      ${siteLinkCard({
        href: `${siteUrl()}/en#lead`,
        label: SITE.brandEn,
        hint: "Visit the site",
        dir: "ltr",
      })}
    `,
  });
}

function row(label: string, valueHtml: string): string {
  // In RTL tables: first cell is on the right (label), second on the left (value).
  return `
    <tr>
      <td dir="rtl" align="right" style="padding:14px 18px;border-bottom:1px solid ${RULE};width:34%;font-size:13px;color:${BRONZE};vertical-align:top;text-align:right;font-family:Arial,Helvetica,sans-serif;">
        ${label}
      </td>
      <td dir="rtl" align="right" style="padding:14px 18px;border-bottom:1px solid ${RULE};font-size:16px;color:${INK};font-weight:700;vertical-align:top;text-align:right;font-family:Arial,Helvetica,sans-serif;">
        ${valueHtml}
      </td>
    </tr>
  `;
}

function btnStyle(outline = false): string {
  if (outline) {
    return `display:inline-block;padding:12px 20px;border-radius:999px;border:1px solid ${CTA};color:${CTA};background:transparent;font-size:14px;font-weight:700;text-decoration:none;`;
  }
  return `display:inline-block;padding:12px 20px;border-radius:999px;background:${CTA};color:#F7F1E6;font-size:14px;font-weight:700;text-decoration:none;`;
}

function emailShell(opts: {
  dir: "rtl" | "ltr";
  lang: string;
  preheader: string;
  title: string;
  eyebrow: string;
  body: string;
}): string {
  const align = opts.dir === "rtl" ? "right" : "left";
  return `<!DOCTYPE html>
<html lang="${opts.lang}" dir="${opts.dir}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${PARCHMENT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    ${escapeHtml(opts.preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PARCHMENT};padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${CARD};border-radius:18px;overflow:hidden;border:1px solid ${RULE};box-shadow:0 12px 40px rgba(79,57,16,0.08);">
          <tr>
            <td style="height:6px;background:linear-gradient(90deg, ${CTA}, ${BRONZE}, ${CTA});font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:22px 28px 4px;text-align:${align};">
              <a href="${siteUrl()}" style="text-decoration:none;display:inline-block;">
                <img
                  src="${logoUrl()}"
                  width="72"
                  height="72"
                  alt="${escapeHtml(SITE.brand)}"
                  style="display:block;width:72px;height:72px;border-radius:16px;border:1px solid ${RULE};object-fit:cover;box-shadow:0 4px 14px rgba(79,57,16,0.12);"
                />
              </a>
              <p style="margin:14px 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${BRONZE};font-family:Arial,Helvetica,sans-serif;">
                ${escapeHtml(opts.eyebrow)}
              </p>
              <h1 style="margin:0 0 6px;font-size:26px;line-height:1.25;color:${INK};font-weight:700;font-family:Georgia,'Times New Roman',serif;">
                ${escapeHtml(opts.title)}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;text-align:${align};font-family:Georgia,'Times New Roman',serif;">
              ${opts.body}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 24px;border-top:1px solid ${RULE};text-align:${align};background:#FBF7F0;">
              <p style="margin:0;font-size:12px;line-height:1.55;color:${BRONZE};font-family:Arial,Helvetica,sans-serif;">
                ${escapeHtml(SITE.brand)} · ${escapeHtml(SITE.addressHe)}<br/>
                <a href="${telUrl()}" style="color:${CTA};text-decoration:none;"><span dir="ltr">${SITE.phoneDisplay}</span></a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
