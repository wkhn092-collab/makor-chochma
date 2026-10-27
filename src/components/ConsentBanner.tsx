"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/content/copy";
import {
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/components/Analytics";

type Props = { locale: Locale };

/**
 * Light analytics consent — shown only when GA/Clarity env keys exist
 * and the visitor has not decided yet.
 */
export function ConsentBanner({ locale }: Props) {
  const hasAnalytics = Boolean(
    process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_CLARITY_ID,
  );
  const [visible, setVisible] = useState(false);
  const isHe = locale === "he";
  const privacyHref = isHe ? "/privacy" : "/en/privacy";

  useEffect(() => {
    if (!hasAnalytics) return;
    if (readAnalyticsConsent()) return;
    setVisible(true);
  }, [hasAnalytics]);

  if (!hasAnalytics || !visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={isHe ? "הסכמה לעוגיות אנליטיקס" : "Analytics cookie consent"}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-stone/80 bg-parchment/95 p-4 shadow-contact backdrop-blur-md md:bottom-4 md:inset-x-auto md:start-4 md:max-w-md md:rounded-[var(--radius-md)] md:border"
    >
      <p className="text-sm leading-relaxed text-ink/80">
        {isHe
          ? "אנחנו משתמשים בכלי מדידה (אנליטיקס) לשיפור האתר — רק אם תאשרו. פרטים ב"
          : "We use analytics to improve the site — only if you agree. See our "}
        <Link href={privacyHref} className="font-medium text-ink underline-offset-2 hover:underline">
          {isHe ? "מדיניות הפרטיות" : "Privacy Policy"}
        </Link>
        {isHe ? "." : "."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary min-h-10 px-4 text-sm"
          onClick={() => {
            writeAnalyticsConsent(true);
            setVisible(false);
          }}
        >
          {isHe ? "מאשר מדידה" : "Accept analytics"}
        </button>
        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center border border-ink/15 bg-surface px-4 text-sm font-medium text-ink"
          onClick={() => {
            writeAnalyticsConsent(false);
            setVisible(false);
          }}
        >
          {isHe ? "בלי מדידה" : "No analytics"}
        </button>
      </div>
    </div>
  );
}
