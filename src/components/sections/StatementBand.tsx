"use client";

import type { Copy } from "@/content/copy";
import { WordInkFill } from "@/components/motion/WordInkFill";

type Props = { copy: Copy };

/**
 * Yoav-inspired statement — large display copy that inks in word-by-word on scroll.
 */
export function StatementBand({ copy }: Props) {
  return (
    <section
      className="relative overflow-hidden border-y border-stone/70 bg-parchment px-4 py-16 md:px-6 md:py-24"
      aria-label={copy.locale === "he" ? "העקרון" : "Principle"}
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-caption font-semibold tracking-[0.22em] text-gold uppercase">
          {copy.locale === "he" ? "אתם מכירים את החיפוש הזה." : "You know this search."}
        </p>
        <WordInkFill
          as="p"
          className="font-display mt-6 max-w-5xl text-[clamp(1.35rem,3.6vw,2.35rem)] font-medium leading-[1.35] tracking-[-0.02em] text-ink"
          dim={0.14}
          bright={1}
          start="top 80%"
          end="center 32%"
        >
          {copy.statement}
        </WordInkFill>
      </div>
    </section>
  );
}
