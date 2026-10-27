"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/motion/gsap";

/** Top ink bar that fills as you scroll the page (A34-lite). */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-right bg-gold"
      style={{ transform: "scaleX(0)", willChange: "transform" }}
    />
  );
}
