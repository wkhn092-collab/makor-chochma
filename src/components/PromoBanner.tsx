import { connection } from "next/server";
import type { Locale } from "@/content/copy";
import { getActivePromo } from "@/lib/promo";

type Props = { locale: Locale };

/**
 * Promo strip — active/expiry decided on the server (Script 5 · 1.5).
 * `connection()` opts into dynamic time so prerender cache cannot freeze expiry.
 */
export async function PromoBanner({ locale }: Props) {
  await connection();
  // Per-request clock after connection() — required so promo expiry is not frozen at build.
  // eslint-disable-next-line react-hooks/purity -- request-time after connection()
  const nowMs = Date.now();
  const promo = getActivePromo(nowMs);
  if (!promo.active) return null;

  const title = locale === "he" ? promo.titleHe : promo.titleEn;
  const body = locale === "he" ? promo.bodyHe : promo.bodyEn;

  return (
    <aside
      className="border-b border-gold/30 bg-parchment-deep/80 text-ink"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2.5 text-center md:px-6 md:text-start">
        <p className="font-display text-sm font-semibold tracking-wide text-ink">
          {title}
        </p>
        {body ? <p className="text-xs leading-relaxed text-ink/70">{body}</p> : null}
        {promo.endsAt ? (
          <p className="text-micro text-bronze">
            {locale === "he" ? "בתוקף עד" : "Valid until"}{" "}
            <time dateTime={promo.endsAt}>
              {new Date(promo.endsAt).toLocaleDateString(
                locale === "he" ? "he-IL" : "en-GB",
              )}
            </time>
          </p>
        ) : null}
      </div>
    </aside>
  );
}
