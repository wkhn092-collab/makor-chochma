import { SITE } from "@/content/site";

type Props = {
  locale: "he" | "en";
  faqs?: { q: string; a: string }[];
};

/**
 * LocalBusiness + Organization (+ optional FAQPage).
 * Escapes `<` in JSON to reduce XSS if ever injected into HTML parsers.
 */
export function JsonLd({ locale, faqs }: Props) {
  const isHe = locale === "he";
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: isHe ? SITE.brand : SITE.brandEn,
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
    email: SITE.email,
    telephone: `+${SITE.phoneE164}`,
  };

  const local = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: isHe ? SITE.brand : SITE.brandEn,
    description: isHe
      ? `סופר סת״ם מוסמך · ${SITE.yearsExperience} שנות ניסיון · אלעד`
      : `Certified sofer stam · ${SITE.yearsExperience} years · Elad`,
    telephone: `+${SITE.phoneE164}`,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: isHe
        ? "רח׳ רבי יוסי בן קיסמא 43 (קומת חניה)"
        : "43 Rabbi Yossi Ben Kisma St. (parking floor)",
      addressLocality: isHe ? "אלעד" : "Elad",
      addressCountry: "IL",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      opens: "13:30",
      closes: "20:30",
    },
  };

  const graph: object[] = [org, local];
  if (faqs && faqs.length > 0) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
