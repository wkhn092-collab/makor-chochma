import Image from "next/image";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { SITE_IMAGES } from "@/content/images";
import { Reveal } from "@/motion/Reveal";
import { YearsCounter } from "@/components/motion/YearsCounter";
import { InkReveal } from "@/components/motion/InkReveal";
import { SimulationBadge } from "@/components/ui/SimulationBadge";

type Props = { copy: Copy };

/**
 * Lawyer-inspired about: photo + integrated stats rail (not a floating black box),
 * editorial copy + gold-numbered certs on the cream stage.
 * Mobile: full-bleed photo, stats as a row under the image (rail stays desktop).
 */
export function About({ copy }: Props) {
  const photo = SITE_IMAGES.about;
  const photoAlt =
    copy.locale === "he" ? (photo.altHe ?? copy.about.h2) : (photo.altEn ?? copy.about.h2);
  const isHe = copy.locale === "he";

  const certLabel = isHe ? "הסמכות" : "certifications";
  const placeValue = isHe ? "אלעד" : "Elad";
  const placeLabel = isHe ? "פגישות פנים אל פנים" : "in-person meetings";
  const placeLabelShort = isHe ? "פגישות" : "meetings";

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-14 lg:gap-16">
        <div>
          <Reveal
            y={20}
            scale={0.99}
            className="relative isolate aspect-[4/5] min-h-[18rem] overflow-hidden rounded-[var(--radius-md)] sm:min-h-[20rem] md:aspect-auto md:min-h-[28rem]"
          >
            <Image
              src={photo.src}
              alt={photoAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[50%_35%]"
              priority={false}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-parchment/55 via-transparent to-parchment/25"
            />
            <SimulationBadge
              label={copy.hero.simulation}
              className="start-3 top-3"
            />

            {/* Desktop only — side stats rail */}
            <aside className="absolute inset-y-0 end-0 hidden w-[6.5rem] flex-col justify-center gap-9 border-s border-ink/10 bg-parchment/88 px-3.5 py-6 backdrop-blur-md md:flex">
              <YearsCounter label={copy.about.yearsLabel} />
              <div>
                <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-gold">
                  2
                </p>
                <p className="mt-1.5 text-caption leading-snug text-ink/55">{certLabel}</p>
              </div>
              <div>
                <p className="font-display text-[clamp(1.35rem,3vw,1.75rem)] font-bold leading-none tracking-[-0.02em] text-ink">
                  {placeValue}
                </p>
                <p className="mt-1.5 text-caption leading-snug text-ink/55">{placeLabel}</p>
              </div>
            </aside>
          </Reveal>

          {/* Mobile — stats under the photo */}
          <Reveal delay={0.04} y={12} className="md:hidden">
            <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-stone/70 py-4 text-center">
              <div>
                <dt className="sr-only">{copy.about.yearsLabel}</dt>
                <dd className="font-display text-2xl font-bold leading-none tracking-[-0.03em] text-ink">
                  {SITE.yearsExperience}
                </dd>
                <p className="mt-1.5 text-micro leading-snug text-ink/55">
                  {copy.about.yearsLabel}
                </p>
              </div>
              <div className="border-x border-stone/70">
                <dt className="sr-only">{certLabel}</dt>
                <dd className="font-display text-2xl font-bold leading-none tracking-[-0.03em] text-gold">
                  2
                </dd>
                <p className="mt-1.5 text-micro leading-snug text-ink/55">{certLabel}</p>
              </div>
              <div>
                <dt className="sr-only">{placeLabel}</dt>
                <dd className="font-display text-xl font-bold leading-none tracking-[-0.02em] text-ink">
                  {placeValue}
                </dd>
                <p className="mt-1.5 text-micro leading-snug text-ink/55">{placeLabelShort}</p>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 h-px w-12 bg-gold md:mb-5" aria-hidden />
          <InkReveal
            as="h2"
            className="font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-bold text-ink"
          >
            {copy.about.h2}
          </InkReveal>
          <Reveal delay={0.08} y={16}>
            <p className="mt-3 max-w-prose text-body-soft leading-relaxed text-ink/75 md:mt-4 md:text-base md:text-lead">
              {copy.about.body}
            </p>
          </Reveal>
          <Reveal delay={0.12} y={12}>
            <p className="mt-3 text-sm font-medium tracking-wide text-ink/90 md:mt-4 md:text-base">
              {copy.about.line}
            </p>
          </Reveal>

          <ul
            className="mt-7 divide-y divide-stone/80 border-y border-stone/80 md:mt-9"
            data-analytics-section="certs"
          >
            {SITE.certifications.map((c, i) => (
              <Reveal key={c.id} delay={0.06 * i} y={12} as="li">
                <div className="flex gap-3 py-3.5 md:gap-4 md:py-4">
                  <span className="shrink-0 pt-0.5 text-caption font-semibold tracking-caption-wide text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink md:text-body-soft">
                      {isHe ? c.he : c.en}
                    </p>
                    <p className="mt-1 text-caption tracking-wide text-ink/45">
                      {copy.about.certPending}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
