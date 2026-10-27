/**
 * Real craft photography until the client supplies own assets.
 * Always show with the "הדמיה" badge.
 */
export const SITE_IMAGES = {
  hero: {
    src: "/images/hero-real-v3.jpg",
    altHe: "ארון קודש עם ספרי תורה — צילום להמחשה",
    altEn: "Holy Ark with Torah scrolls — illustrative photo",
  },
  portfolio: [
    {
      id: "tefillin",
      src: "/images/tefillin-v8.jpg",
      altHe: "זוג תפילין מסורתיות — צילום להמחשה",
      altEn: "Traditional pair of tefillin — illustrative photo",
    },
    {
      id: "mezuzot",
      src: "/images/mezuzah-real-v3.jpg",
      altHe: "קביעת מזוזה — צילום להמחשה",
      altEn: "Affixing a mezuzah — illustrative photo",
    },
    {
      id: "megillot",
      src: "/images/megillah-v7.jpg",
      altHe: "ספר תורה פתוח עם יד — צילום להמחשה",
      altEn: "Open Torah scroll with yad — illustrative photo",
    },
    {
      id: "sifrei-torah",
      src: "/images/sefer-sephardi-v7.jpg",
      altHe: "ספר תורה ספרדי בתיק כסף מלא — צילום להמחשה",
      altEn: "Full Sephardic Sefer Torah in silver tik — illustrative photo",
    },
  ],
  /** Pitum HaKetoret — handwritten klaf (NOT spices) */
  ketoret: {
    src: "/images/pitum-klaf-v5.jpg",
    altHe: "קלף פיטום הקטורת — צילום להמחשה",
    altEn: "Pitum HaKetoret parchment klaf — illustrative photo",
  },
  /** About photo — bright full Sephardi tik (not dark museum crop) */
  about: {
    src: "/images/sefer-tik-full-v6.jpg",
    altHe: "ספר תורה ספרדי בתיק כסף על בד בהיר — צילום להמחשה",
    altEn: "Sephardic Sefer Torah in silver tik on light cloth — illustrative photo",
  },
  /** FAQ side visual — open klaf with yad */
  faqSide: {
    src: "/images/megillah-yad-v6.jpg",
    altHe: "קלף פתוח עם יד כסף — צילום להמחשה",
    altEn: "Open parchment with silver yad — illustrative photo",
  },
  /** Footer “הצעד הבא” full-bleed background */
  footerCta: {
    src: "/images/footer-cta-bg-v1.jpg",
    altHe: "ארון קודש עם ספרי תורה — צילום להמחשה",
    altEn: "Holy Ark with Torah scrolls — illustrative photo",
  },
  craft: [
    {
      id: "consult",
      src: "/images/craft/01-consult.jpg",
      altHe: "שיחת ייעוץ — שולחן סופר (הדמיה)",
      altEn: "Consultation call — sofer desk (illustration)",
    },
    {
      id: "ink",
      src: "/images/craft/02-ink.jpg",
      altHe: "קלף ודיו — כתיבה ביד (הדמיה)",
      altEn: "Parchment and ink — hand writing (illustration)",
    },
    {
      id: "proof",
      src: "/images/craft/03-proof.jpg",
      altHe: "הגהה — בדיקת ספר תורה (הדמיה)",
      altEn: "Proofing — inspecting a Torah scroll (illustration)",
    },
    {
      id: "meeting",
      src: "/images/craft/04-meeting.jpg",
      altHe: "פגישה באלעד — כניסה עם מזוזה (הדמיה)",
      altEn: "Meeting in Elad — doorway with mezuzah (illustration)",
    },
  ],
} as const;
