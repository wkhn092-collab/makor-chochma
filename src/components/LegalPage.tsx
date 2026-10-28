import Link from "next/link";
import type { Locale } from "@/content/copy";
import { getCopy } from "@/content/copy";
import { LocaleHtml } from "@/components/LocaleHtml";
import { SITE } from "@/content/site";

type Kind = "accessibility" | "privacy" | "terms" | "shipping" | "returns";

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
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </>
  );
}
