/**
 * Client photography — הרב יגאל עמרני / מכון מקור חכמה.
 * Entries with `real: true` must NOT show the «הדמיה» badge.
 */
export const SITE_IMAGES = {
  hero: {
    src: "/images/sofer/hero-main.jpg",
    altHe: "הרב יגאל עמרני — סופר סת״ם כותב על קלף בסדנה",
    altEn: "Rabbi Yigal Amarani — sofer stam writing on parchment in the atelier",
    real: true,
  },
  /** Desktop-only — sharpened crop of atelier writing (mobile keeps `hero`) */
  heroDesktop: {
    src: "/images/sofer/hero-desktop.jpg",
    altHe: "הרב יגאל עמרני — כתיבה על קלף בסדנה",
    altEn: "Rabbi Yigal Amarani — writing on parchment in the atelier",
    real: true,
  },
  portfolio: [
    {
      id: "tefillin",
      src: "/images/product-tefillin-silver-v1.png",
      altHe: "תפילין רש״י עם לוחיות כסף — צילום מוצר להמחשה",
      altEn: "Rashi tefillin with silver plaques — product photo",
      real: false,
    },
    {
      id: "mezuzot",
      src: "/images/product-mezuzah-klaf-v1.png",
      altHe: "קלף מזוזה בכתיבת יד — צילום מוצר להמחשה",
      altEn: "Handwritten mezuzah klaf — product photo",
      real: false,
    },
    {
      id: "megillot",
      src: "/images/product-megillah-v1.png",
      altHe: "מגילה בכתיבת יד על קלף — צילום מוצר להמחשה",
      altEn: "Handwritten megillah on parchment — product photo",
      real: false,
    },
    {
      id: "sifrei-torah",
      src: "/images/sofer/sofer-02.jpg",
      altHe: "ספר תורה פתוח — הסופר מצביע על הכתב",
      altEn: "Open Sefer Torah — the sofer pointing at the text",
      real: true,
    },
  ],
  /** Pitum — temporary parchment still until institute photo arrives */
  ketoret: {
    src: "/images/product-pitum-v1.jpg",
    altHe: "פיטום הקטורת על קלף — צילום להמחשה",
    altEn: "Pitum HaKetoret on parchment — illustrative photo",
    real: false,
  },
  /** About / lead — clear face portrait (not the gift-table crop) */
  about: {
    src: "/images/sofer/sofer-17.jpg",
    altHe: "הרב יגאל עמרני — סופר סת״ם במכון מקור חכמה, אלעד",
    altEn: "Rabbi Yigal Amarani — sofer stam at Makor Chochma, Elad",
    real: true,
  },
  faqSide: {
    src: "/images/sofer/sofer-16.jpg",
    altHe: "הגהה על הקלף — יד הסופר על האותיות",
    altEn: "Proofing on the parchment — the sofer’s hand on the letters",
    real: true,
  },
  footerCta: {
    src: "/images/sofer/sofer-11.jpg",
    altHe: "הסופר בסדנה — כתיבה על קלף באור העבודה",
    altEn: "The sofer in the atelier — writing on parchment under work lights",
    real: true,
  },
  craft: [
    {
      id: "consult",
      /** שיחה — פנים ברורות מול המצלמה */
      src: "/images/sofer/sofer-17.jpg",
      altHe: "שיחת ייעוץ — הרב יגאל מוכן לדבר על מה שצריך",
      altEn: "Consultation — Rabbi Yigal ready to talk about what you need",
      real: true,
      focus: "50% 16%",
      thumbFocus: "50% 14%",
      /** Desktop: portrait face for consult — must differ from ink stage */
      focusMd: "50% 12%",
      thumbFocusMd: "50% 10%",
    },
    {
      id: "ink",
      /** קלף ודיו — כתיבה על הקלף, לא זום על האוזן */
      src: "/images/sofer/sofer-15.jpg",
      altHe: "קלף ודיו ביד — הסופר כותב על הקלף",
      altEn: "Parchment and ink by hand — the sofer writing on the klaf",
      real: true,
      focus: "48% 42%",
      thumbFocus: "50% 40%",
      /** Desktop: landscape writing — distinct from consult portrait */
      srcMd: "/images/sofer/sofer-20.jpg",
      focusMd: "62% 36%",
      thumbFocusMd: "68% 32%",
    },
    {
      id: "proof",
      /** הגהה — יד על האותיות */
      src: "/images/sofer/sofer-16.jpg",
      altHe: "הגהה — בדיקת אותיות על הקלף",
      altEn: "Proofing — checking letters on the parchment",
      real: true,
      focus: "50% 45%",
      thumbFocus: "50% 42%",
      focusMd: "50% 48%",
      thumbFocusMd: "50% 45%",
    },
    {
      id: "meeting",
      /** פגישה באלעד — הסדנה בבירור */
      src: "/images/sofer/sofer-11.jpg",
      altHe: "פגישה באלעד — הסופר בסדנה באור העבודה",
      altEn: "Meeting in Elad — the sofer in the atelier under work lights",
      real: true,
      focus: "42% 28%",
      thumbFocus: "45% 24%",
      focusMd: "40% 22%",
      thumbFocusMd: "42% 20%",
    },
  ],
} as const;
