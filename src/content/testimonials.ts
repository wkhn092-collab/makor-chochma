/**
 * Video testimonials — Cloudinary MP4 (remote) until YouTube IDs arrive.
 * Replace `youtubeId` when ready; UI prefers YouTube embed when set.
 *
 * Keep each video file paired with the matching speaker + quote (by face).
 */
export type TestimonialTopic = "tefillin" | "sefer-torah" | "peer" | "service";

export type TestimonialVideo = {
  id: string;
  /** Cloudinary https URL — used until youtubeId is real */
  src: string;
  /** Set real YouTube id to switch the player to iframe embed */
  youtubeId?: string;
  duration: string;
  nameHe: string;
  nameEn: string;
  quoteHe: string;
  quoteEn: string;
  topic: TestimonialTopic;
  orientation: "portrait" | "landscape";
  featured?: boolean;
};

export const TOPIC_LABEL: Record<
  TestimonialTopic,
  { he: string; en: string }
> = {
  tefillin: { he: "תפילין", en: "Tefillin" },
  "sefer-torah": { he: "ספר תורה", en: "Sefer Torah" },
  peer: { he: "המלצת סופר", en: "Sofer endorsement" },
  service: { he: "שירות ובדיקה", en: "Service & checking" },
};

/** Featured — Ariel + Tziona (top grid). */
export const FEATURED_TESTIMONIALS: TestimonialVideo[] = [
  {
    id: "ariel-harar",
    src: "https://res.cloudinary.com/ab7zmaca/video/upload/v1793021780/WhatsApp_Video_2026-10-25_at_20.49.49.mp4",
    youtubeId: "PENDING_ARIEL_HARAR",
    duration: "0:43",
    nameHe: "אריאל חרר (סופר ומגיה סת״ם)",
    nameEn: "Ariel Harar (sofer & magiah)",
    quoteHe:
      "השוק מלא בתקלות, אבל הרב יגאל הוא מהסופרים המיוחדים ויראי השמים. כתיבה הלכתית, מסודרת ונקייה.",
    quoteEn:
      "The market is full of faults, but Rabbi Yigal is among the exceptional, G-d-fearing sofrim. Halachic, orderly, clean writing.",
    topic: "peer",
    orientation: "landscape",
    featured: true,
  },
  {
    id: "tziona-iraqi",
    // Woman speaker — 20.49.29 (not the 2:44 man clip)
    src: "https://res.cloudinary.com/ab7zmaca/video/upload/v1793021789/WhatsApp_Video_2026-10-25_at_20.49.29.mp4",
    youtubeId: "PENDING_TZIONA_IRAQI",
    duration: "0:48",
    nameHe: "ציונה עיראקי",
    nameEn: "Tziona Iraqi",
    quoteHe:
      "אחרי חוויה כואבת וספר שיצא פסול אצל סופר אחר, הגעתי לרב יגאל. קיבלנו יחס חם, כתיבה מדהימה ואדם משכמו ומעלה.",
    quoteEn:
      "After a painful experience and a sefer that was found pasul elsewhere, we came to Rabbi Yigal. Warm care, remarkable writing, an outstanding person.",
    topic: "sefer-torah",
    orientation: "portrait",
    featured: true,
  },
];

/** Carousel — Aviv, Yaakov, Lior, Sharabi, shul. */
export const MORE_TESTIMONIALS: TestimonialVideo[] = [
  {
    id: "aviv",
    src: "https://res.cloudinary.com/ab7zmaca/video/upload/v1793021783/WhatsApp_Video_2026-10-25_at_20.51.13.mp4",
    youtubeId: "PENDING_AVIV",
    duration: "1:17",
    nameHe: "אביב",
    nameEn: "Aviv",
    quoteHe:
      "קניתי תפילין רש״י ור״ת. שירות יעיל, מהיר וזמינות מדהימה מכל הלב, גם בשעות מאוחרות.",
    quoteEn:
      "I bought Rashi and Rabbeinu Tam tefillin. Efficient, fast service and heartfelt availability — even late hours.",
    topic: "tefillin",
    orientation: "portrait",
  },
  {
    id: "yaakov",
    // White beard — was mislabeled as shul
    src: "https://res.cloudinary.com/ab7zmaca/video/upload/v1793021787/WhatsApp_Video_2026-10-25_at_20.49.31.mp4",
    youtubeId: "PENDING_YAAKOV",
    duration: "2:20",
    nameHe: "יעקב",
    nameEn: "Yaakov",
    quoteHe:
      "ספר התורה שקנינו לפני 11 וחצי שנים נשאר מושלם. לא נמצאה בו אפילו שגיאה אחת מאז.",
    quoteEn:
      "The Sefer Torah we bought 11.5 years ago is still perfect. Not a single error found since.",
    topic: "sefer-torah",
    orientation: "portrait",
  },
  {
    id: "lior",
    // Man speaker — 20.50.30 (~2:44)
    src: "https://res.cloudinary.com/ab7zmaca/video/upload/v1793021591/WhatsApp_Video_2026-10-25_at_20.50.30.mp4",
    youtubeId: "PENDING_LIOR",
    duration: "2:44",
    nameHe: "ליאור",
    nameEn: "Lior",
    quoteHe:
      "הבאתי תפילין לבדיקה — שירות מקצועי, נגיש וזמין מיד גם בשעה שמונה בערב אחרי העבודה.",
    quoteEn:
      "I brought tefillin for checking — professional, accessible, available even at 8pm after work.",
    topic: "tefillin",
    orientation: "portrait",
  },
  {
    id: "sharabi",
    src: "https://res.cloudinary.com/ab7zmaca/video/upload/v1793021783/WhatsApp_Video_2026-10-25_at_20.49.30.mp4",
    youtubeId: "PENDING_SHARABI",
    duration: "1:25",
    nameHe: "משפחת שרעבי",
    nameEn: "The Sharabi family",
    quoteHe:
      "כתבנו ספר תורה לעילוי נשמת בננו החייל. הרב יגאל נתן לנו יחס משפחתי, מרגש ומקצועי לכל אורך הדרך.",
    quoteEn:
      "We commissioned a Sefer Torah for the elevation of our soldier son’s soul. Rabbi Yigal gave us family-like, moving, professional care throughout.",
    topic: "sefer-torah",
    orientation: "landscape",
  },
  {
    id: "shul-community",
    // Black hat — was mislabeled as Yaakov
    src: "https://res.cloudinary.com/ab7zmaca/video/upload/v1793021790/WhatsApp_Video_2026-10-25_at_20.51.28.mp4",
    youtubeId: "PENDING_SHUL",
    duration: "1:11",
    nameHe: "לקוח קהילת בית הכנסת",
    nameEn: "Synagogue community client",
    quoteHe:
      "יחס חברי, עניו וסבלני. עבודה מכל הלב עם חיוך שמאיר פנים לכל אחד.",
    quoteEn:
      "Friendly, humble, patient care. Wholehearted work with a smile that lights up every face.",
    topic: "service",
    orientation: "portrait",
  },
];

/** @deprecated use MORE_TESTIMONIALS */
export const CAROUSEL_TESTIMONIALS = MORE_TESTIMONIALS;

export const ALL_TESTIMONIALS: TestimonialVideo[] = [
  ...FEATURED_TESTIMONIALS,
  ...MORE_TESTIMONIALS,
];
