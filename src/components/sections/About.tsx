import Image from "next/image";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { SITE_IMAGES } from "@/content/images";
import { Reveal } from "@/motion/Reveal";
import { YearsCounter } from "@/components/motion/YearsCounter";
import { InkReveal } from "@/components/motion/InkReveal";

type Props = { copy: Copy };

/**
 * Lawyer-inspired about: photo + integrated stats rail (not a floating black box),
 * editorial copy + gold-numbered certs on the cream stage.
 */
export function About({ copy }: Props) {
  const photo = SITE_IMAGES.about;
  const photoAlt =
    copy.locale === "he" ? (photo.altHe ?? copy.about.h2) : (photo.altEn ?? copy.about.h2);

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
        <Reveal y={20} scale={0.99} className="relative isolate aspect-[4/5] min-h-[20rem] overflow-hidden rounded-[var(--radius-md)] sm:aspect-auto sm:min-h-[22rem] md:min-h-[28rem]">
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
          <span className="absolute bottom-4 start-4 rounded-sm bg-parchment/90 px-2 py-0.5 text-micro text-bronze backdrop-blur-sm">
            {copy.hero.simulation}
          </span>

          {/* Stats rail — luminous cream glass, not a black slab */}
          <aside className="absolute inset-y-0 end-0 flex w-[5.25rem] flex-col justify-center gap-5 border-s border-ink/10 bg-parchment/88 px-2.5 py-5 backdrop-blur-md sm:w-[5.75rem] sm:gap-7 sm:px-3 sm:py-6 md:w-[6.5rem] md:gap-9 md:px-3.5">
            <YearsCounter label={copy.about.yearsLabel} />
            <div>
              <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-gold">
                2
              </p>
              <p className="mt-1.5 text-caption leading-snug text-ink/55">
                {copy.locale === "he" ? "הסמכות" : "certifications"}
              </p>
            </div>
            <div>
              <p className="font-display text-[clamp(1.35rem,3vw,1.75rem)] font-bold leading-none tracking-[-0.02em] text-ink">
                {copy.locale === "he" ? "אלעד" : "Elad"}
              </p>
              <p className="mt-1.5 text-caption leading-snug text-ink/55">
                {copy.locale === "he" ? "פגישות פנים אל פנים" : "in-person meetings"}
              </p>
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
