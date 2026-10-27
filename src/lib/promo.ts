import { PROMO } from "@/content/site";

export type ActivePromo = {
  active: boolean;
  titleHe: string;
  titleEn: string;
  bodyHe: string;
  bodyEn: string;
  endsAt: string | null;
};

/** Pure check — pass `nowMs` from the client to avoid prerender `Date` bans. */
export function getActivePromo(nowMs: number): ActivePromo {
  const endsAt = PROMO.endsAt;
  const hasCopy = Boolean(
    (PROMO.titleHe || PROMO.titleEn) && (PROMO.bodyHe || PROMO.bodyEn),
  );
  const endMs = endsAt ? Date.parse(endsAt) : NaN;
  const notExpired = !endsAt || (Number.isFinite(endMs) && endMs > nowMs);

  return {
    active: Boolean(PROMO.enabled && hasCopy && notExpired),
    titleHe: PROMO.titleHe,
    titleEn: PROMO.titleEn,
    bodyHe: PROMO.bodyHe,
    bodyEn: PROMO.bodyEn,
    endsAt,
  };
}
