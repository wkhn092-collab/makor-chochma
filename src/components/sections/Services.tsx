"use client";

import Image from "next/image";
import type { Copy } from "@/content/copy";
import { INTERESTS, type InterestId } from "@/content/site";
import { SITE_IMAGES } from "@/content/images";
import { useLeadUi } from "@/store/lead-ui";
import { SecondaryInterestHint } from "@/components/SecondaryInterestHint";
import { Reveal } from "@/motion/Reveal";
import { InkReveal } from "@/components/motion/InkReveal";
import { SimulationBadge } from "@/components/ui/SimulationBadge";
import clsx from "clsx";

type Props = { copy: Copy };

const SERVICE_VISUAL: Partial<Record<InterestId, string>> = {
  tefillin: SITE_IMAGES.portfolio[0]!.src,
  mezuzot: SITE_IMAGES.portfolio[1]!.src,
  megillot: SITE_IMAGES.portfolio[2]!.src,
  pitum: SITE_IMAGES.ketoret.src,
};

/**
 * Atelier menu — selectable rows with craft photos.
 * Not a generic card grid.
 */
export function Services({ copy }: Props) {
  const interest = useLeadUi((s) => s.interest);
  const setInterest = useLeadUi((s) => s.setInterest);
  const items = INTERESTS.filter((i) => i.id !== "general");

  return (
    <section id="services" className="border-y border-stone/70 bg-parchment py-12 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-caption font-semibold tracking-eyebrow text-bronze uppercase">
            {copy.locale === "he" ? "הסדנה" : "The atelier"}
          </p>
          <InkReveal
            as="h2"
            className="font-display mt-2.5 text-[clamp(1.5rem,3.6vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink md:mt-3"
          >
            {copy.services.h2}
          </InkReveal>
          <Reveal delay={0.06} y={16}>
            <p className="mt-3 text-body-soft leading-relaxed text-ink/70 md:mt-4 md:text-base md:text-lead">
              {copy.services.lead}
            </p>
          </Reveal>
        </div>

        <ul className="mt-8 border-t border-ink/10 md:mt-12">
          {items.map((item, idx) => {
            const selected = interest === item.id;
            const title = copy.locale === "he" ? item.he : item.en;
            const blurb = copy.locale === "he" ? item.blurbHe : item.blurbEn;
            const cta = copy.locale === "he" ? item.ctaHe : item.ctaEn;
            const src = SERVICE_VISUAL[item.id];
            const n = String(idx + 1).padStart(2, "0");

            return (
              <Reveal key={item.id} delay={0.05 * idx} y={20} as="li">
                <button
                  type="button"
                  onClick={() => {
                    setInterest(item.id);
                    document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-pressed={selected}
                  className={clsx(
                    "group grid w-full grid-cols-[auto_3.25rem_1fr] items-center gap-3 border-b border-ink/10 py-4 text-start transition-colors duration-300 touch-manipulation sm:grid-cols-[auto_5.5rem_1fr_auto] sm:gap-6 sm:py-6 md:gap-8",
                    selected ? "bg-ink/[0.03]" : "hover:bg-ink/[0.02]",
                  )}
                >
                  <span
                    className={clsx(
                      "font-display text-sm font-semibold tracking-wide tabular-nums transition-colors",
                      selected ? "text-gold" : "text-bronze/70 group-hover:text-gold",
                    )}
                  >
                    {n}
                  </span>

                  <span className="relative aspect-[4/5] w-[3.25rem] overflow-hidden rounded-sm sm:w-[5.5rem]">
                    {src ? (
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 52px, 88px"
                        className={clsx(
                          "object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          selected ? "scale-105" : "group-hover:scale-105",
                        )}
                      />
                    ) : null}
                    {src ? (
                      <SimulationBadge
                        label={copy.hero.simulation}
                        className="start-0.5 top-0.5 max-w-[calc(100%-4px)] truncate px-1 py-px sm:start-1 sm:top-1"
                      />
                    ) : null}
                    <span
                      aria-hidden
                      className={clsx(
                        "absolute inset-0 transition-colors",
                        selected ? "bg-ink/10" : "bg-ink/0 group-hover:bg-ink/5",
                      )}
                    />
                  </span>

                  <span className="min-w-0 sm:contents">
                    <span className="min-w-0 sm:block">
                      <span className="font-display text-[clamp(1.15rem,2.4vw,1.65rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                        {title}
                      </span>
                      <span className="mt-1 block max-w-xl text-body-sm leading-relaxed text-ink/65 sm:mt-1.5 md:text-body-soft">
                        {blurb}
                      </span>
                      <span
                        className={clsx(
                          "mt-2 block text-sm font-semibold tracking-wide transition-colors sm:hidden",
                          selected ? "text-gold" : "text-ink/45",
                        )}
                      >
                        {selected ? copy.services.selected : cta}
                        <span aria-hidden className="ms-1.5 inline-block rtl:rotate-180">
                          →
                        </span>
                      </span>
                    </span>
                    <span
                      className={clsx(
                        "hidden text-sm font-semibold tracking-wide transition-colors sm:block sm:justify-self-end",
                        selected ? "text-gold" : "text-ink/45 group-hover:text-ink",
                      )}
                    >
                      {selected ? copy.services.selected : cta}
                      <span
                        aria-hidden
                        className="ms-1.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>

        {interest && interest !== "general" ? (
          <SecondaryInterestHint copy={copy} className="mt-5 flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border border-stone/70 bg-surface/70 px-3.5 py-3 text-sm text-ink/80" />
        ) : null}

        <p className="mt-6 text-sm text-bronze">{copy.services.hint}</p>
      </div>
    </section>
  );
}
