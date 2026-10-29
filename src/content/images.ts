/**
 * Real craft photography until the client supplies own assets.
 * Always show with the "הדמיה" badge.
 */
export const SITE_IMAGES = {
  hero: {
    src: "/images/hero-real-v3.jpg",
    altHe: "ארון קודש עם ספרי תורה מעוטרים — צילום אמיתי להמחשה",
    altEn: "Holy Ark with ornate Torah scrolls — real illustrative photo",
  },
  portfolio: [
    {
      id: "tefillin",
      src: "/images/product-tefillin-silver-v1.png",
      altHe: "תפילין רש״י עם לוחיות כסף — צילום מוצר להמחשה",
      altEn: "Rashi tefillin with silver plaques — product photo",
    },
    {
      id: "mezuzot",
      src: "/images/product-mezuzah-klaf-v1.png",
      altHe: "קלף מזוזה בכתיבת סת״ם — צילום מוצר להמחשה",
      altEn: "Mezuzah parchment in Stam script — product photo",
    },
    {
      id: "megillot",
      src: "/images/product-megillah-v1.png",
      altHe: "מגילת אסתר פתוחה על בד בהיר — צילום מוצר להמחשה",
      altEn: "Open Megillat Esther on light cloth — product photo",
    },
    {
      id: "sifrei-torah",
      src: "/images/sefer-sephardi-final-v6.jpg",
      altHe: "ספר תורה ספרדי בתיק כסף על בד בהיר — צילום להמחשה",
      altEn: "Sephardic Sefer Torah in silver tik on light cloth — illustrative photo",
    },
  ],
  /** Pitum HaKetoret — handwritten klaf (NOT spices) */
  ketoret: {
    src: "/images/product-mezuzah-klaf-v1.png",
    altHe: "קלף בכתיבת סת״ם — צילום מוצר להמחשה",
    altEn: "Handwritten Stam parchment — product photo",
  },
  /** About photo — bright full Sephardi tik (not dark museum crop) */
  about: {
    src: "/images/about-lcp.webp",
    altHe: "ספר תורה ספרדי בתיק כסף על בד בהיר — צילום להמחשה",
    altEn: "Sephardic Sefer Torah in silver tik on light cloth — illustrative photo",
  },
  /** FAQ side visual — open megillah */
  faqSide: {
    src: "/images/product-megillah-v1.png",
    altHe: "מגילה פתוחה — צילום מוצר להמחשה",
    altEn: "Open megillah — product photo",
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
      /** שיחה על מה שצריך — טלפון + ספר על השולחן */
      src: "/images/craft/01-consult.jpg",
      altHe: "שיחת ייעוץ — טלפון וספר על שולחן העבודה (צילום להמחשה)",
      altEn: "Consultation call — phone and sefer on the desk (illustrative photo)",
    },
    {
      id: "ink",
      /** קלף ודיו ביד — כתיבה ידנית בקולמוס */
      src: "/images/hero-sofer-quill-v2.png",
      altHe: "קלף ודיו ביד — סופר כותב בקולמוס על קלף (צילום אמיתי)",
      altEn: "Parchment and ink by hand — sofer writing with a quill (real photo)",
    },
    {
      id: "proof",
      /** הגהה וליווי — בדיקת אותיות על הקלף */
      src: "/images/klaf-detail-v5.jpg",
      altHe: "הגהה — יד מצביעה ובודקת כתב על הקלף (צילום אמיתי)",
      altEn: "Proofing — yad checking the script on parchment (real photo)",
    },
    {
      id: "meeting",
      /** פגישה באלעד — מגיעים לסדנה / סוגרים פנים אל פנים */
      src: "/images/craft/04-meeting.jpg",
      altHe: "פגישה באלעד — כניסה לסדנת הסופר (צילום להמחשה)",
      altEn: "Meeting in Elad — entering the sofer’s study (illustrative photo)",
    },
  ],
} as const;
