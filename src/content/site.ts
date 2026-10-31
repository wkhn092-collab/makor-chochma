export const SITE = {
  brand: "מכון מקור חכמה",
  brandShort: "מקור חכמה",
  brandEn: "Makor Chochma Institute",
  legalName: "מקור חכמה",
  businessId: "9878745",
  contactName: "הרב יגאל עמרני",
  contactNameEn: "Rabbi Yigal Amarani",
  /** Non-breaking hyphens so the number never wraps mid-digit */
  phoneDisplay: "054\u2011846\u20112387",
  phoneE164: "972548462387",
  email: "y0548462387@gmail.com",
  addressHe: "רח׳ רבי יוסי בן קיסמא 43 (קומת חניה), אלעד",
  addressEn: "43 Rabbi Yossi Ben Kisma St. (parking floor), Elad",
  hoursHe: "13:30–20:30 בתיאום מראש",
  hoursEn: "13:30–20:30 by appointment",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=רבי+יוסי+בן+קיסמא+43+אלעד",
  yearsExperience: 32,
  certifications: [
    { id: "mishmeret", he: "משמרת סת״ם", en: "Mishmeret Stam" },
    { id: "yad-rafael", he: "מכון יד רפאל (הרב מועלם)", en: "Yad Rafael Institute" },
  ],
} as const;

export type InterestId =
  | "tefillin"
  | "mezuzot"
  | "megillot"
  | "sefer-torah"
  | "pitum"
  | "general";

export const INTERESTS: {
  id: InterestId;
  he: string;
  en: string;
  blurbHe: string;
  blurbEn: string;
  ctaHe: string;
  ctaEn: string;
}[] = [
  {
    id: "tefillin",
    he: "תפילין",
    en: "Tefillin",
    blurbHe: "פרשיות בכתיבת הסופר, רש״י או ר״ת. בוחרים הידור בשיחה, לא בעגלה.",
    blurbEn: "Parchments written by the sofer, Rashi or R\"T. Choose hidur on the call, not in a cart.",
    ctaHe: "לבחור תפילין",
    ctaEn: "Choose tefillin",
  },
  {
    id: "mezuzot",
    he: "מזוזות",
    en: "Mezuzot",
    blurbHe: "קלף שנכתב ונבדק, לבית, למשרד ולשמחות.",
    blurbEn: "Klaf written and checked, for home, office, and celebrations.",
    ctaHe: "לבחור מזוזות",
    ctaEn: "Choose mezuzot",
  },
  {
    id: "megillot",
    he: "מגילות",
    en: "Megillot",
    blurbHe: "מגילה בכתיבה ידנית על קלף, לפי מה שסוגרים בשיחה.",
    blurbEn: "A megillah handwritten on klaf, details set on the call.",
    ctaHe: "לבחור מגילות",
    ctaEn: "Choose megillot",
  },
  {
    id: "sefer-torah",
    he: "ספר תורה",
    en: "Sefer Torah",
    blurbHe: "ספר תורה בכתיבת הסופר, לקהילה ולמשפחה — מבהירים הידור ולוח זמנים בשיחה.",
    blurbEn: "A Sefer Torah written by the sofer, for a community or family — hidur and timeline on the call.",
    ctaHe: "לבחור ספר תורה",
    ctaEn: "Choose Sefer Torah",
  },
  {
    id: "pitum",
    he: "פיטום הקטורת",
    en: "Pitum HaKetoret",
    blurbHe: "פיטום הקטורת, עם משלוח בתיאום אחרי השיחה.",
    blurbEn: "Pitum HaKetoret, with delivery by arrangement after the call.",
    ctaHe: "לבחור פיטום",
    ctaEn: "Choose Pitum",
  },
  {
    id: "general",
    he: "לא בטוחים מה צריך",
    en: "Not sure yet",
    blurbHe: "נתחיל משיחה על תפילין, מזוזות, מגילה, ספר תורה או פיטום.",
    blurbEn: "Start with a call about tefillin, mezuzot, megillah, Sefer Torah or Pitum.",
    ctaHe: "לשיחה כללית",
    ctaEn: "General call",
  },
];

/**
 * Soft cross-sell pairs for lead CRO (optional secondary interest).
 * `general` has no pair — no push.
 */
/** Soft cross-sell disabled — kept empty by request. */
export const INTEREST_PAIRS: Partial<Record<InterestId, InterestId>> = {};

export function getSecondaryPair(
  interest: InterestId | null | undefined,
): InterestId | null {
  if (!interest) return null;
  return INTEREST_PAIRS[interest] ?? null;
}

export function interestLabel(
  id: InterestId | null | undefined,
  locale: "he" | "en",
): string | null {
  if (!id) return null;
  const row = INTERESTS.find((i) => i.id === id);
  if (!row) return null;
  return locale === "he" ? row.he : row.en;
}

export const PROMO = {
  enabled: false,
  titleHe: "",
  titleEn: "",
  bodyHe: "",
  bodyEn: "",
  endsAt: null as string | null,
} as const;
