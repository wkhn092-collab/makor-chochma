import type { Locale } from "@/content/copy";

type Props = { locale: Locale };

/** First focusable control — WCAG 2.1 AA bypass blocks. */
export function SkipLink({ locale }: Props) {
  const label = locale === "he" ? "דלג לתוכן הראשי" : "Skip to main content";
  return (
    <a href="#main" className="mc-skip-link">
      {label}
    </a>
  );
}
