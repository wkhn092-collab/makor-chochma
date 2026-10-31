"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Delegates clicks on `[data-analytics]` → GA4/Clarity (after consent loads).
 */
export function AnalyticsCapture() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const el = target.closest("[data-analytics]");
      if (!(el instanceof HTMLElement)) return;
      const name = el.getAttribute("data-analytics");
      if (!name) return;
      track(name, { location: el.id || undefined });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
