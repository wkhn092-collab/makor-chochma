import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/content/copy";
import { getCopy } from "@/content/copy";
import { LocaleHtml } from "@/components/LocaleHtml";
import { SITE } from "@/content/site";

type Kind = "accessibility" | "privacy" | "terms" | "shipping" | "returns";

/** Keep phone/email as single LTR units (no mid-number wrap in RTL). */
function withContactUnits(text: string): ReactNode {
  const phone = SITE.phoneDisplay;
  const email = SITE.email;
  const parts: ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    const phoneAt = rest.indexOf(phone);
    const emailAt = rest.indexOf(email);
    const candidates = [
      phoneAt >= 0 ? { at: phoneAt, len: phone.length, kind: "phone" as const } : null,
      emailAt >= 0 ? { at: emailAt, len: email.length, kind: "email" as const } : null,
    ].filter(Boolean) as { at: number; len: number; kind: "phone" | "email" }[];

    if (candidates.length === 0) {
      parts.push(rest);
      break;
    }

    candidates.sort((a, b) => a.at - b.at);
    const next = candidates[0]!;
    if (next.at > 0) parts.push(rest.slice(0, next.at));
    const value = rest.slice(next.at, next.at + next.len);
    parts.push(
      <bdi
        key={`c-${key++}`}
        dir="ltr"
        className="inline-block whitespace-nowrap"
      >
        {value}
      </bdi>,
    );
    rest = rest.slice(next.at + next.len);
  }

  return parts.length === 1 ? parts[0] : parts;
}

export function LegalPage({ locale, kind }: { locale: Locale; kind: Kind }) {
  const copy = getCopy(locale);
  const title =
    kind === "accessibility"
      ? copy.a11y.title
      : kind === "terms"
        ? copy.terms.title
        : kind === "shipping"
          ? copy.shipping.title
          : kind === "returns"
            ? copy.returns.title
            : copy.privacy.title;
  const paragraphs =
    kind === "accessibility"
      ? copy.a11y.body
      : kind === "terms"
        ? copy.terms.body
        : kind === "shipping"
          ? copy.shipping.body
          : kind === "returns"
            ? copy.returns.body
            : copy.privacy.body;
  const home = locale === "he" ? "/" : "/en";

  return (
    <>
      <LocaleHtml locale={locale} />
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <Link href={home} className="text-sm text-bronze underline-offset-2 hover:underline">
          ← {locale === "he" ? SITE.brand : SITE.brandEn}
        </Link>
        <h1 className="font-display mt-6 text-3xl font-bold text-ink md:text-4xl">{title}</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/85">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{withContactUnits(p)}</p>
          ))}
        </div>
      </div>
    </>
  );
}
