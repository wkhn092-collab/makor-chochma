export const SITE = {
  brand: "מכון מקור חכמה",
  brandShort: "מקור חכמה",
  brandEn: "Makor Chochma Institute",
  legalName: "מקור חכמה",
  businessId: "9878745",
  contactName: "הרב יגאל עמרני",
  contactNameEn: "Rabbi Yigal Amarani",
  phoneDisplay: "054-846-2387",
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
    blurbHe: "כתיבה והכנה לפי הלכה, בליווי אישי בבחירת ההידור.",
    blurbEn: "Written and prepared according to halacha, with personal guidance.",
    ctaHe: "לבחור תפילין",
    ctaEn: "Choose tefillin",
  },
  {
    id: "mezuzot",
    he: "מזוזות",
    en: "Mezuzot",
    blurbHe: "קלפים לכתיבה והגהה — לבית, למשרד ולשמחות.",
    blurbEn: "Scrolls written and checked — for home, office, and celebrations.",
    ctaHe: "לבחור מזוזות",
    ctaEn: "Choose mezuzot",
  },
  {
    id: "megillot",
    he: "מגילות",
    en: "Megillot",
    blurbHe: "מגילות שנכתבות ביד, בסטנדרט של סופר מוסמך.",
    blurbEn: "Hand-written megillot to a certified sofer’s standard.",
    ctaHe: "לבחור מגילות",
    ctaEn: "Choose megillot",
  },
  {
    id: "pitum",
    he: "פיטום הקטורת",
    en: "Pitum HaKetoret",
    blurbHe: "אפשרות למשלוח בתיאום אחרי השיחה.",
    blurbEn: "Delivery available by arrangement after the call.",
    ctaHe: "לבחור פיטום",
    ctaEn: "Choose Pitum",
  },
  {
    id: "general",
    he: "ייעוץ כללי",
    en: "General advice",
    blurbHe: "לא בטוחים מה צריך? נתחיל משיחה.",
    blurbEn: "Not sure what you need? Start with a call.",
    ctaHe: "לייעוץ כללי",
    ctaEn: "General advice",
  },
];

/**
 * Soft cross-sell pairs for lead CRO (optional secondary interest).
 * `general` has no pair — no push.
 */
export const INTEREST_PAIRS: Partial<Record<InterestId, InterestId>> = {
  tefillin: "mezuzot",
  mezuzot: "tefillin",
  megillot: "pitum",
  pitum: "megillot",
};

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
