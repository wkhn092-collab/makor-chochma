/**
 * Client analytics — GA4 + Clarity when loaded (after consent).
 */
export function track(
  event: string,
  params?: Record<string, string | number | boolean | null | undefined>,
) {
  if (typeof window === "undefined") return;
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  };
  const clean =
    params &&
    Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== null && v !== undefined),
    );
  try {
    w.gtag?.("event", event, clean);
  } catch {
    /* ignore */
  }
  try {
    w.clarity?.("event", event);
  } catch {
    /* ignore */
  }
}
