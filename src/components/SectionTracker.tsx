"use client";

import { useEffect } from "react";

type Props = { targetId: string; eventName: string };

export function SectionTracker({ targetId, eventName }: Props) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let sent = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (sent) return;
        if (entries.some((e) => e.isIntersecting)) {
          sent = true;
          const w = window as unknown as {
            gtag?: (...a: unknown[]) => void;
          };
          w.gtag?.("event", eventName);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [targetId, eventName]);

  return null;
}
