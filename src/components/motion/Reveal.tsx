"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        el.classList.remove("reveal-hidden");
        return;
      }
      const tween = gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            el.classList.remove("reveal-hidden");
          },
        },
      );
      // If ScrollTrigger never fires (pin conflicts / late hydration), never leave blank.
      const safety = window.setTimeout(() => {
        if (getComputedStyle(el).opacity === "0") {
          tween.progress(1);
          el.classList.remove("reveal-hidden");
          gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
        }
      }, 1800);
      return () => window.clearTimeout(safety);
    },
    { dependencies: [delay, y] },
  );

  useEffect(() => {
    const node = ref.current;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === node) t.kill();
      });
    };
  }, []);

  return (
    <Tag ref={ref as never} className={clsx("reveal-hidden", className)}>
      {children}
    </Tag>
  );
}
