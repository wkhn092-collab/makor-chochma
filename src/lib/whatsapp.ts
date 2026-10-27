import { SITE } from "@/content/site";
import type { Locale } from "@/content/copy";

export function whatsappUrl(text: string): string {
  const q = encodeURIComponent(text);
  return `https://wa.me/${SITE.phoneE164}?text=${q}`;
}

export function waPrefill(
  locale: Locale,
  interestLabel?: string | null,
  secondaryLabel?: string | null,
): string {
  if (locale === "he") {
    if (interestLabel && secondaryLabel) {
      return `שלום הרב יגאל, הגעתי מהאתר של מכון מקור חכמה. מתעניין ב־${interestLabel}, וגם אשמח לשאול על ${secondaryLabel}. אשמח לשיחה.`;
    }
    if (interestLabel) {
      return `שלום הרב יגאל, הגעתי מהאתר של מכון מקור חכמה. מתעניין ב־${interestLabel} ואשמח לשיחה.`;
    }
    return "שלום הרב יגאל, הגעתי מהאתר של מכון מקור חכמה ואשמח לשיחה על סת״ם.";
  }
  if (interestLabel && secondaryLabel) {
    return `Hello Rabbi Yigal, I found Makor Chochma online. I’m interested in ${interestLabel}, and would also like to ask about ${secondaryLabel}. I’d like a call.`;
  }
  if (interestLabel) {
    return `Hello Rabbi Yigal, I found Makor Chochma online. I’m interested in ${interestLabel} and would like a call.`;
  }
  return "Hello Rabbi Yigal, I found Makor Chochma online and would like to talk about stam.";
}
