"use client";

import { useState } from "react";
import Image from "next/image";
import type { Copy } from "@/content/copy";
import { SITE_IMAGES } from "@/content/images";
import { SITE } from "@/content/site";
import { whatsappUrl, waPrefill } from "@/lib/whatsapp";
import { Reveal } from "@/motion/Reveal";
import { InkReveal } from "@/components/motion/InkReveal";
import clsx from "clsx";

type Props = { copy: Copy };

export function Faq({ copy }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const side = SITE_IMAGES.faqSide;
  const sideAlt = copy.locale === "he" ? (side.altHe ?? "") : (side.altEn ?? "");
  const waHref = whatsappUrl(waPrefill(copy.locale));
  const telHref = `tel:+${SITE.phoneE164}`;

  return (
    <section id="faq" className="border-t border-stone/70 bg-parchment py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <InkReveal
          as="h2"
          className="text-center font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-ink"
        >
          {copy.faq.h2}
        </InkReveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,15rem)] lg:gap-10">
          {/* Start rail — craft photo + trust lines */}
          <Reveal y={16} className="hidden lg:block">
            <aside className="sticky top-28 space-y-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src={side.src}
                  alt={sideAlt}
                  fill
                  sizes="240px"
                  className="object-cover object-[50%_40%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-parchment/70 via-transparent to-transparent"
                />
                <span className="absolute bottom-3 start-3 rounded-sm bg-parchment/90 px-2 py-0.5 text-micro text-bronze backdrop-blur-sm">
                  {copy.hero.simulation}
                </span>
              </div>
              <p className="font-display text-sm font-semibold text-ink">{copy.faq.sidePhotoCaption}</p>
              <ul className="space-y-3 border-t border-stone/80 pt-4">
                {copy.faq.sideTrust.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm leading-snug text-ink/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>

          {/* Accordion */}
          <ul className="space-y-3">
            {copy.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={0.04 * i} as="li">
                  <div className="rounded-[var(--radius-md)] border border-stone bg-surface shadow-contact">
                    <button
                      type="button"
                      className="flex min-h-12 w-full items-center justify-between gap-3 px-3.5 py-3.5 text-start touch-manipulation sm:gap-4 sm:px-4 sm:py-4"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="text-[0.95rem] font-medium leading-snug text-ink sm:text-base">
                        {item.q}
                      </span>
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

          {/* End rail — next step + meta */}
          <Reveal y={16} delay={0.08} className="hidden lg:block">
            <aside className="sticky top-28 space-y-6 rounded-[var(--radius-md)] border border-stone/80 bg-surface/60 p-5 shadow-contact">
              <div>
                <p className="font-display text-base font-semibold text-ink">{copy.faq.sideNextTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{copy.faq.sideNextLead}</p>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#lead" className="btn-primary w-full !min-h-11 text-sm">
                  {copy.faq.sideCtaForm}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full !min-h-11 text-sm"
                >
                  {copy.faq.sideCtaWa}
                </a>
              </div>
              <div className="space-y-2 border-t border-stone/80 pt-4 text-sm text-ink/65">
                <p>
                  <a href={telHref} className="font-medium text-ink hover:text-gold" dir="ltr">
                    <bdi>{SITE.phoneDisplay}</bdi>
                  </a>
                </p>
                <p>{copy.faq.sideMetaHours}</p>
                <p>{copy.faq.sideMetaPlace}</p>
              </div>
            </aside>
          </Reveal>

          {/* Mobile: compact trust strip under accordion */}
          <Reveal y={12} className="lg:hidden">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[10rem] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src={side.src}
                  alt={sideAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-[50%_40%]"
                />
                <span className="absolute bottom-2 start-2 rounded-sm bg-parchment/90 px-2 py-0.5 text-micro text-bronze">
                  {copy.hero.simulation}
                </span>
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-[var(--radius-md)] border border-stone/80 bg-surface/60 p-4 shadow-contact">
                <p className="font-display text-sm font-semibold text-ink">{copy.faq.sideTrustTitle}</p>
                <ul className="space-y-2">
                  {copy.faq.sideTrust.map((line) => (
                    <li key={line} className="flex gap-2 text-sm leading-snug text-ink/75">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
                <a href="#lead" className="btn-primary mt-1 w-full !min-h-11 text-sm">
                  {copy.faq.sideCtaForm}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
