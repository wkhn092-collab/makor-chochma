import Image from "next/image";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { SITE_IMAGES } from "@/content/images";
import { Reveal } from "@/motion/Reveal";
import { YearsCounter } from "@/components/motion/YearsCounter";
import { InkReveal } from "@/components/motion/InkReveal";

type Props = { copy: Copy };

/**
 * Lawyer-inspired about: photo + integrated stats strip (not a floating black box),
 * editorial copy + gold-numbered certs on the cream stage.
 * Mobile + desktop: stats sit as a slim bottom strip (no side rail).
 */
export function About({ copy }: Props) {
  const photo = SITE_IMAGES.about;
  const photoAlt =
    copy.locale === "he" ? (photo.altHe ?? copy.about.h2) : (photo.altEn ?? copy.about.h2);
  const certLabel = copy.locale === "he" ? "הסמכות" : "certifications";
  const placeLabel = copy.locale === "he" ? "אלעד" : "Elad";
  const meetLabel =
    copy.locale === "he" ? "פגישות פנים אל פנים" : "in-person meetings";

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
        <Reveal
          y={20}
          scale={0.99}
          className="relative isolate aspect-[4/5] min-h-[20rem] overflow-hidden rounded-[var(--radius-md)] sm:aspect-auto sm:min-h-[22rem] md:min-h-[28rem]"
        >
          <Image
            src={photo.src}
            alt={photoAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover md:[filter:brightness(0.97)_saturate(0.9)_sepia(0.12)_hue-rotate(-6deg)]"
            style={{ objectPosition: "50% 12%" }}
            priority={false}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-parchment/55 via-transparent to-parchment/25 md:from-parchment/70 md:via-transparent md:to-parchment/20"
          />

          {/* Bottom strip — phone + desktop (full photo, no side rail) */}
          <aside className="absolute inset-x-0 bottom-0 z-10 border-t border-ink/10 bg-parchment/90 backdrop-blur-md">
            <div className="grid grid-cols-3 divide-x divide-ink/10 rtl:divide-x-reverse px-2 py-2.5 sm:px-3 sm:py-3 md:py-3.5 lg:px-4 lg:py-4">
              <YearsCounter
                label={copy.about.yearsLabel}
                className="px-1.5 text-center sm:px-2 [&_span.font-display]:!text-[1.65rem] sm:[&_span.font-display]:!text-[1.9rem] md:[&_span.font-display]:!text-[2.15rem] lg:[&_span.font-display]:!text-[2.45rem] [&_p]:mx-auto [&_p]:max-w-none [&_p]:text-[0.65rem] sm:[&_p]:text-caption"
              />
              <div className="px-1.5 text-center sm:px-2">
                <p className="font-display text-[1.65rem] font-bold leading-none tracking-[-0.03em] text-gold sm:text-[1.9rem] md:text-[2.15rem] lg:text-[2.45rem]">
                  2
                </p>
                <p className="mt-1 text-[0.65rem] leading-snug text-ink/55 sm:mt-1.5 sm:text-caption">
                  {certLabel}
                </p>
              </div>
              <div className="px-1.5 text-center sm:px-2">
                <p className="font-display text-[1.2rem] font-bold leading-none tracking-[-0.02em] text-ink sm:text-[1.4rem] md:text-[1.55rem] lg:text-[1.75rem]">
                  {placeLabel}
                </p>
                <p className="mt-1 text-[0.65rem] leading-snug text-ink/55 sm:mt-1.5 sm:text-caption">
                  {meetLabel}
                </p>
              </div>
            </div>
          </aside>
        </Reveal>

        <div className="flex flex-col justify-center">
          <div className="mb-5 h-px w-12 bg-gold" aria-hidden />
          <InkReveal
            as="h2"
            className="font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-bold text-ink"
          >
            {copy.about.h2}
          </InkReveal>
          <Reveal delay={0.08} y={16}>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/75 md:text-lead">
              {copy.about.body}
            </p>
          </Reveal>
          <Reveal delay={0.12} y={12}>
            <p className="mt-4 text-sm font-medium tracking-wide text-ink/90 md:text-base">
              {copy.about.line}
            </p>
          </Reveal>

          <ul className="mt-9 divide-y divide-stone/80 border-y border-stone/80" data-analytics-section="certs">
            {SITE.certifications.map((c, i) => (
              <Reveal key={c.id} delay={0.06 * i} y={12} as="li">
                <div className="flex gap-4 py-4">
                  <span className="shrink-0 pt-0.5 text-caption font-semibold tracking-[0.18em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink md:text-[0.95rem]">
                      {copy.locale === "he" ? c.he : c.en}
                    </p>
                    {copy.about.certPending ? (
                      <p className="mt-1 text-caption tracking-wide text-ink/45">
                        {copy.about.certPending}
                      </p>
                    ) : null}
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
