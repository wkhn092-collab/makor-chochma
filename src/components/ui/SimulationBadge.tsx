import clsx from "clsx";

type Props = {
  label: string;
  className?: string;
  /** Dark photo stage (hero) vs light cards */
  tone?: "onDark" | "onLight";
};

/**
 * Visible «הדמיה» / stock marker — required on non-client photography.
 * Prefer over alt-only disclosure (audit 1.25).
 */
export function SimulationBadge({
  label,
  className,
  tone = "onLight",
}: Props) {
  return (
    <span
      className={clsx(
        "pointer-events-none absolute z-20 inline-flex items-center rounded-[var(--radius-sm)] px-1.5 py-0.5 text-tag font-semibold tracking-wide uppercase",
        tone === "onDark"
          ? "border border-white/25 bg-black/55 text-white/90 backdrop-blur-sm"
          : "border border-ink/10 bg-parchment/92 text-bronze shadow-contact backdrop-blur-sm",
        className,
      )}
    >
      {label}
    </span>
  );
}
