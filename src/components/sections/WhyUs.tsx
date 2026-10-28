import Link from "next/link";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { Reveal } from "@/motion/Reveal";
import { InkReveal } from "@/components/motion/InkReveal";

type Props = { copy: Copy };

/**
 * Category wedge: atelier + call vs anonymous online buy.
 * No competitor brand names — public archetypes only.
 */
export function WhyUs({ copy }: Props) {
  const p = copy.locale === "he" ? "" : "/en";
  const telHref = `tel:+${SITE.phoneE164}`;

  return (
    <section
      id="why-us"
      className="border-y border-stone/70 bg-parchment-deep/60 py-14 md:py-20"
      aria-labelledby="why-us-title"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-caption font-semibold tracking-[0.22em] text-gold uppercase">
            {copy.whyUs.eyebrow}
          </p>
          <InkReveal
            as="h2"
            id="why-us-title"
            className="font-display mt-3 text-[clamp(1.55rem,3.4vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink"
          >
            {copy.whyUs.h2}
          </InkReveal>
          <Reveal delay={0.06} y={14}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70">
              {copy.whyUs.lead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={18} className="mt-10">
          <div className="overflow-hidden rounded-[var(--radius-md)] border border-stone/80 bg-surface">
            <div className="grid grid-cols-[1fr_1.2fr] border-b border-stone/70 bg-parchment/80 text-[0.6875rem] font-semibold tracking-wide text-bronze sm:grid-cols-[1fr_1.15fr] sm:text-sm">
              <p className="px-2.5 py-2.5 sm:px-5 sm:py-3">{copy.whyUs.themLabel}</p>
              <p className="border-s border-stone/70 px-2.5 py-2.5 text-ink sm:px-5 sm:py-3">
                {copy.whyUs.usLabel}
              </p>
            </div>
            <ul>
              {copy.whyUs.rows.map((row) => (
                <li
                  key={row.us}
                  className="grid grid-cols-[1fr_1.2fr] border-b border-stone/50 last:border-b-0 sm:grid-cols-[1fr_1.15fr]"
                >
                  <p className="px-2.5 py-3 text-[0.8125rem] leading-snug text-ink/55 sm:px-5 sm:py-4 sm:text-[0.95rem]">
                    {row.them}
                  </p>
                  <p className="border-s border-stone/50 bg-parchment/35 px-2.5 py-3 text-[0.8125rem] font-medium leading-snug text-ink sm:px-5 sm:py-4 sm:text-[0.95rem]">
                    {row.us}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.14} y={12}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={telHref} data-analytics="phone_click" className="btn-primary w-full sm:w-auto">
              {copy.whyUs.cta}
            </a>
            <Link
              href={`${p}/contact`}
              className="btn-secondary w-full text-center sm:w-auto"
            >
              {copy.whyUs.ctaSecondary}
            </Link>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-bronze">
            {copy.hero.micro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
