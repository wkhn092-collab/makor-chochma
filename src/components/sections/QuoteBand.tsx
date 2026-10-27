"use client";

import Image from "next/image";
import type { Copy } from "@/content/copy";
import { WordInkFill } from "@/components/motion/WordInkFill";

type Props = { copy: Copy };

/**
 * Premium quote stage — visible craft photo (not a black slab),
 * Yoav-style word fill, clean editorial frame.
 */
export function QuoteBand({ copy }: Props) {
  const isHe = copy.locale === "he";

  return (
    <section
      className="relative isolate overflow-hidden text-white"
      aria-label={isHe ? "מי כותב" : "Who writes"}
    >
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/craft/02-ink.jpg"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-[center_40%]"
        />
        {/* Soft veil — image stays readable, text stays legible */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, rgba(12,10,8,0.82) 0%, rgba(12,10,8,0.55) 48%, rgba(12,10,8,0.35) 100%),
              linear-gradient(180deg, rgba(12,10,8,0.35) 0%, rgba(12,10,8,0.15) 40%, rgba(12,10,8,0.7) 100%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[28rem] max-w-6xl items-center px-4 py-20 md:min-h-[32rem] md:px-8 md:py-28">
        <div className="max-w-2xl md:ms-auto md:max-w-xl md:text-end">
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] text-gold uppercase md:text-end">
            {isHe ? "מי כותב" : "Who writes"}
          </p>

          <WordInkFill
            as="blockquote"
            className="font-display text-[clamp(1.45rem,3.2vw,2.25rem)] font-medium leading-[1.4] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
            dim={0.22}
            bright={1}
            start="top 78%"
            end="center 36%"
          >
            {copy.quote}
          </WordInkFill>

          <footer className="mt-10 border-t border-white/15 pt-5">
            <p className="text-sm font-medium tracking-wide text-white/90">{copy.about.h2}</p>
            <p className="mt-1 text-xs tracking-wide text-white/50">
              {isHe ? "סופר סת״ם · אלעד" : "Sofer Stam · Elad"}
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
