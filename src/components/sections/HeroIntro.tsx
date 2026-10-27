"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = { children: React.ReactNode };

/** Staggered hero entrance — respects prefers-reduced-motion. */
export function HeroIntro({ children }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>("[data-hero-item]");
      if (!items.length) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "expo.out",
          clearProps: "transform",
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flex max-w-xl flex-col md:max-w-lg">
      {children}
    </div>
  );
}
