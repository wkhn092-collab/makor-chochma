"use client";

import { useState } from "react";
import type { Copy } from "@/content/copy";
import { Reveal } from "@/motion/Reveal";
import { InkReveal } from "@/components/motion/InkReveal";
import clsx from "clsx";

type Props = { copy: Copy };

export function Faq({ copy }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-stone/70 bg-parchment py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <InkReveal
          as="h2"
          className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-ink"
        >
          {copy.faq.h2}
        </InkReveal>
        <ul className="mt-8 space-y-3">
          {copy.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={0.04 * i} as="li">
                <div className="rounded-[var(--radius-md)] border border-stone bg-surface shadow-contact">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-start"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-medium text-ink">{item.q}</span>
                    <span
                      className={clsx(
                        "text-bronze transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={clsx(
                      "grid transition-[grid-template-rows] duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                    style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm leading-relaxed text-ink/80">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
