"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  label: string;
  className?: string;
};

/** Inline count-up for a single stat numeral (lawyer-style, no black panel). */
export function YearsCounter({ label, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  /* Gate GSAP until after hydrate — mutating text during hydrate broke SiteHeader listeners */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useGSAP(
    () => {
      if (!ready) return;
      const wrap = wrapRef.current;
      const num = numRef.current;
      if (!wrap || !num) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        num.textContent = String(SITE.yearsExperience);
        return;
      }

      const state = { val: 0 };
      gsap.to(state, {
        val: SITE.yearsExperience,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrap,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          num.textContent = String(Math.round(state.val));
        },
      });
    },
    { dependencies: [ready] },
  );

  return (
    <div ref={wrapRef} className={className}>
      <span
        ref={numRef}
        className="font-display block text-[clamp(2.75rem,6vw,4.25rem)] font-bold leading-none tracking-[-0.04em] text-ink"
        aria-hidden
      >
        0
      </span>
      <span className="sr-only">
        <bdi>{SITE.yearsExperience}</bdi>
      </span>
      <p className="mt-1.5 max-w-[7rem] text-caption leading-snug tracking-wide text-ink/55">
        {label}
      </p>
    </div>
  );
}
