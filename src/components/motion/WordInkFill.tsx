"use client";

import { useMemo, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/motion/gsap";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Dim start opacity (Yoav uses ~0.16). */
  dim?: number;
  /** Full opacity when filled. */
  bright?: number;
  /** ScrollTrigger start. */
  start?: string;
  /** ScrollTrigger end. */
  end?: string;
};

function splitWords(text: string): string[] {
  // Drop lone dashes so they never float as a broken “מקף” between words.
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0 && !/^[\-–—]$/.test(w));
}

/**
 * Yoav-style word ink fill — words start dim and color in as you scroll.
 */
export function WordInkFill({
  children,
  as: Tag = "p",
  className,
  style,
  dim = 0.16,
  bright = 1,
  start = "top 78%",
  end = "center 36%",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => splitWords(children), [children]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const spans = el.querySelectorAll<HTMLElement>("[data-word]");
      if (!spans.length) return;

      if (prefersReducedMotion()) {
        gsap.set(spans, { opacity: bright });
        return;
      }

      gsap.set(spans, { opacity: dim });
      gsap.to(spans, {
        opacity: bright,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: ref, dependencies: [children, dim, bright, start, end] },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word="" className="inline">
          {word}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** Optional helper for sections that want a lead line above the fill. */
export function WordInkLead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={className}>{children}</p>;
}
