"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/motion/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Play on load (hero). Default: scroll-triggered. */
  immediate?: boolean;
  delay?: number;
  duration?: number;
};

/**
 * M1 — ink-on-parchment mask reveal.
 * Uses overflow clip + yPercent (no SplitText DOM rewrite — safe for RTL/Hebrew).
 */
export function InkReveal({
  children,
  as: Tag = "div",
  className,
  style,
  id,
  immediate = false,
  delay = 0,
  duration = 0.9,
}: Props) {
  const maskRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mask = maskRef.current;
      const inner = innerRef.current;
      if (!mask || !inner) return;

      if (prefersReducedMotion()) {
        gsap.set(inner, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        inner,
        { yPercent: 110, opacity: 1 },
        {
          yPercent: 0,
          duration,
          delay,
          ease: "expo.out",
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: mask,
                  start: "top 78%",
                  once: true,
                },
              }),
        },
      );
    },
    { scope: maskRef, dependencies: [immediate, delay, duration] },
  );

  return (
    <Tag
      ref={maskRef}
      id={id}
      className={className}
      style={{ overflow: "hidden", paddingBlockEnd: "0.12em", ...style }}
    >
      <span ref={innerRef} className="block will-change-transform">
        {children}
      </span>
    </Tag>
  );
}
