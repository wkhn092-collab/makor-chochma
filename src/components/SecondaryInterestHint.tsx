"use client";

import type { Copy } from "@/content/copy";
import {
  getSecondaryPair,
  interestLabel,
  type InterestId,
} from "@/content/site";
import { useLeadUi } from "@/store/lead-ui";

type Props = {
  copy: Copy;
  /** Optional id override (e.g. form select). Defaults to store interest. */
  primary?: InterestId | null;
  className?: string;
};

/**
 * Soft lead cross-sell — one optional checkbox after a primary interest is chosen.
 * Does not push price or cart; only enriches the consultation brief.
 */
export function SecondaryInterestHint({ copy, primary, className }: Props) {
  const storeInterest = useLeadUi((s) => s.interest);
  const secondaryInterest = useLeadUi((s) => s.secondaryInterest);
  const setSecondaryInterest = useLeadUi((s) => s.setSecondaryInterest);

  const interest = primary ?? storeInterest;
  const pair = getSecondaryPair(interest);
  if (!pair) return null;

  const pairLabel = interestLabel(pair, copy.locale);
  if (!pairLabel) return null;

  const checked = secondaryInterest === pair;
  const inputId = `secondary-interest-${pair}`;

  const hint =
    copy.locale === "he"
      ? `כדאי גם לשאול על ${pairLabel} בשיחה (אופציונלי)`
      : `Also worth asking about ${pairLabel} on the call (optional)`;

  function onToggle(next: boolean) {
    setSecondaryInterest(next ? pair : null);
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as unknown as { gtag: (...a: unknown[]) => void }).gtag(
        "event",
        "secondary_interest_toggle",
        { primary: interest, secondary: pair, enabled: next },
      );
    }
  }

  return (
    <label
      htmlFor={inputId}
      className={
        className ??
        "mt-4 flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border border-stone/70 bg-surface/80 px-3.5 py-3 text-sm text-ink/80"
      }
    >
      <input
        id={inputId}
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 rounded border-stone accent-[var(--accent)]"
        checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <span className="leading-snug">{hint}</span>
    </label>
  );
}
