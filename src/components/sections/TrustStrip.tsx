"use client";

import type { Copy } from "@/content/copy";
import { Marquee } from "@/motion/Marquee";

type Props = { copy: Copy };

/** Compact editorial ticker — quiet luxury, not a billboard. */
export function TrustStrip({ copy }: Props) {
  const parts = copy.trust.split("·").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="border-y border-stone/80 bg-surface py-2.5 md:py-3">
      <Marquee duration={32} gap="2rem" pauseOnHover>
        {parts.map((part) => (
          <span
            key={part}
            className="text-caption font-medium tracking-[0.14em] text-ink/70 uppercase whitespace-nowrap md:text-xs"
          >
            {part}
            <span className="mx-3 text-gold" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
