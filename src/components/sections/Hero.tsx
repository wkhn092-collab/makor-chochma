import Image from "next/image";
import type { CSSProperties } from "react";
import type { Copy } from "@/content/copy";
import { SITE_IMAGES } from "@/content/images";
import { SITE } from "@/content/site";
import { Marquee } from "@/motion/Marquee";
import { HeroFan } from "@/components/sections/HeroFan";
import "./hero-fan.css";

type Props = { copy: Copy };

function FactsStrip({ facts }: { facts: string[] }) {
  return (
    <div className="border-t border-gold/25 bg-parchment py-3.5 sm:py-4 md:py-5">
      <span className="sr-only">{facts.join(" · ")}</span>
      <div aria-hidden="true">
        <Marquee duration={40} gap="2.25rem" pauseOnHover>
          {facts.map((fact) => (
            <span
              key={fact}
              className="flex items-center gap-5 font-display text-lead font-medium tracking-[-0.01em] whitespace-nowrap text-ink sm:gap-8 sm:text-[clamp(1.05rem,0.9rem+1.1vw,1.6rem)]"
            >
              <bdi>{fact}</bdi>
              <span className="size-1.5 shrink-0 rounded-full bg-gold sm:size-2" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

/**
 * Full-bleed LCP photo + centered copy + responsive fan (3 mobile / 9 desktop).
 */
export function Hero({ copy }: Props) {
  const brand = copy.locale === "he" ? SITE.brand : SITE.brandEn;
  const heroAlt =
    copy.locale === "he" ? SITE_IMAGES.hero.altHe : SITE_IMAGES.hero.altEn;
  const isHe = copy.locale === "he";

  const facts =
    copy.locale === "he"
      ? [
          "תפילין",
          "מזוזות",
          "מגילות",
          "ספרי תורה",
          "פיטום הקטורת",
          brand,
          "אלעד",
          `${SITE.yearsExperience} שנה על הקלף`,
          "משמרת סת״ם",
          "יד רפאל",
          "שיחה לפני שסוגרים",
        ]
      : [
          "Tefillin",
          "Mezuzot",
          "Megillot",
          "Sifrei Torah",
          "Pitum HaKetoret",
          brand,
          "Elad",
          `${SITE.yearsExperience} years on the parchment`,
          "Mishmeret Stam",
          "Yad Rafael",
          "A call before you close",
        ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="mc-hero-stage relative isolate flex min-h-[calc(100svh-var(--mc-header-h)+4.5rem)] flex-col overflow-hidden text-ink"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={SITE_IMAGES.hero.src}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          className="object-cover object-[48%_22%] brightness-[1.18] contrast-[1.05] saturate-[1.12] md:object-[50%_18%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: isHe
              ? `
                linear-gradient(270deg, rgba(247,244,239,0.88) 0%, rgba(247,244,239,0.55) 40%, rgba(247,244,239,0.12) 72%, transparent 100%),
                linear-gradient(180deg, rgba(247,244,239,0.35) 0%, transparent 40%, rgba(247,244,239,0.22) 100%)
              `
              : `
                linear-gradient(90deg, rgba(247,244,239,0.88) 0%, rgba(247,244,239,0.55) 40%, rgba(247,244,239,0.12) 72%, transparent 100%),
                linear-gradient(180deg, rgba(247,244,239,0.35) 0%, transparent 40%, rgba(247,244,239,0.22) 100%)
              `,
          }}
        />
      </div>

      <span className="sr-only">{heroAlt}</span>
      <span className="pointer-events-none absolute bottom-3 start-3 z-30 rounded-sm bg-parchment/90 px-1.5 py-0.5 text-tag text-bronze backdrop-blur-sm md:bottom-4 md:start-4">
        {copy.hero.simulation}
      </span>

      <div className="relative z-30 mx-auto flex w-full max-w-[1180px] shrink-0 flex-col px-4 pt-[calc(var(--mc-header-h)+0.85rem)] sm:px-6 sm:pt-[calc(var(--mc-header-h)+0.5rem)]">
        <div className="flex flex-col items-center text-center">
          <p
            className="mc-hero-in text-label font-semibold tracking-[0.06em] text-bronze"
            style={{ "--d": "80ms" } as CSSProperties}
          >
            {copy.hero.eyebrow}
          </p>

          <h1 id="hero-title" className="mc-hero-display mt-1.5 max-w-[18ch] sm:mt-2 sm:max-w-[22ch]">
            <span
              className="mc-hero-in block text-ink drop-shadow-[0_1px_14px_rgb(247_244_239/0.9)]"
              style={{ "--d": "140ms" } as CSSProperties}
            >
              {copy.hero.h1}
            </span>
            <span
              className="mc-hero-in mc-hero-accent mt-1 block"
              style={{ "--d": "260ms" } as CSSProperties}
            >
              <bdi>{SITE.yearsExperience}</bdi> {copy.hero.h1YearsSuffix}
            </span>
          </h1>

          <p
            className="mc-hero-in mt-2 max-w-[32ch] text-[0.95rem] leading-snug text-ink/80 sm:mt-2.5 sm:max-w-[38ch] sm:text-base"
            style={{ "--d": "420ms" } as CSSProperties}
          >
            {copy.hero.h2}
          </p>

          <div
            className="mc-hero-in pointer-events-auto mt-3.5 flex w-full max-w-sm justify-center sm:mt-4 sm:max-w-md"
            style={{ "--d": "560ms" } as CSSProperties}
          >
            <a
              href="#lead"
              id="hero-cta"
              data-analytics="hero_cta"
              className="btn-primary w-full min-h-12 touch-manipulation px-8 text-center sm:min-w-[16rem]"
            >
              {copy.hero.ctaPrimary}
            </a>
          </div>
          <p
            className="mc-hero-in mt-2.5 max-w-sm text-center text-caption leading-relaxed text-ink/65 sm:text-xs"
            style={{ "--d": "640ms" } as CSSProperties}
          >
            {copy.hero.micro}
          </p>
        </div>
      </div>

      <div className="min-h-8 flex-1 sm:min-h-12" aria-hidden="true" />

      <div className="relative z-20 mt-auto w-full shrink-0">
        <div
          className="mc-hero-fan-slot mc-hero-in"
          style={{ "--d": "900ms" } as CSSProperties}
        >
          <HeroFan locale={copy.locale} />
          <p className="sr-only">
            {isHe
              ? "רגעים מהסדנה: ייעוץ, כתיבה, הגהה ופגישה"
              : "Atelier moments: consult, writing, proofing, meeting"}
          </p>
        </div>
        <div className="mc-hero-peek-marquee relative z-10">
          <FactsStrip facts={facts} />
        </div>
      </div>
    </section>
  );
}
