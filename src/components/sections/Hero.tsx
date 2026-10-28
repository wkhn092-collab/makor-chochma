import Image from "next/image";
import type { CSSProperties } from "react";
import type { Copy } from "@/content/copy";
import { SITE_IMAGES } from "@/content/images";
import { SITE } from "@/content/site";
import { Marquee } from "@/motion/Marquee";
import { HeroFan } from "@/components/sections/HeroFan";
import { SimulationBadge } from "@/components/ui/SimulationBadge";
import { InkReveal } from "@/components/motion/InkReveal";
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
 * Lawyer-tight hero: short headline, one line, one CTA, micro proof.
 * Dark wash + light type so the photo carries the stage (like Cohen).
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
      className="mc-hero-stage relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-accent text-white"
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
          className="object-cover object-[48%_22%] brightness-[0.92] contrast-[1.05] saturate-[1.08] md:object-[50%_18%]"
        />
        {/* Dark stage wash — lawyer pattern: photo speaks, type stays short */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(10,10,10,0.62) 0%,
                rgba(10,10,10,0.42) 32%,
                rgba(10,10,10,0.28) 55%,
                rgba(10,10,10,0.58) 100%),
              radial-gradient(ellipse 90% 55% at 50% 38%, rgba(10,10,10,0.35), transparent 70%)
            `,
          }}
        />
      </div>

      <span className="sr-only">{heroAlt}</span>
      <SimulationBadge
        label={copy.hero.simulation}
        tone="onDark"
        className="start-3 top-[calc(var(--mc-header-h)+0.65rem)] z-40 sm:start-5"
      />

      {/* Copy block — centered in the upper stage, lawyer breathing room */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-5 pb-6 pt-[calc(var(--mc-header-h)+1.25rem)] sm:px-6">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
          <h1 id="hero-title" className="mc-hero-display max-w-[14ch] sm:max-w-[18ch]">
            {/* Kinetic mask (InkReveal) — audit 1.33; LCP photo stays uneased */}
            <InkReveal
              as="span"
              immediate
              delay={0.1}
              duration={0.9}
              className="block text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
            >
              {copy.hero.h1}
            </InkReveal>
            <InkReveal
              as="span"
              immediate
              delay={0.22}
              duration={0.95}
              className="mc-hero-accent mt-1.5 block"
            >
              <bdi>{SITE.yearsExperience}</bdi> {copy.hero.h1YearsSuffix}
            </InkReveal>
          </h1>

          <p
            className="mc-hero-in mt-4 max-w-[36ch] text-lead leading-snug text-white/90 sm:mt-5 sm:max-w-[40ch] sm:text-lg"
            style={{ "--d": "360ms" } as CSSProperties}
          >
            {copy.hero.h2}
          </p>

          <div
            className="mc-hero-in pointer-events-auto mt-7 flex w-full max-w-xs flex-col items-center gap-3.5 sm:mt-8 sm:max-w-sm"
            style={{ "--d": "500ms" } as CSSProperties}
          >
            <a
              href="#lead"
              id="hero-cta"
              data-analytics="hero_cta"
              className="btn-primary w-full min-h-12 touch-manipulation px-8 text-center sm:min-w-[16rem]"
            >
              {copy.hero.ctaPrimary}
            </a>
            <p className="flex items-center gap-2 text-label leading-snug text-white/75">
              <span className="size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
              {copy.hero.micro}
            </p>
          </div>
        </div>
      </div>

      {/* Fan peeks under the fold on phone — desktop keeps full strip */}
      <div className="relative z-20 mt-auto w-full shrink-0">
        <div
          className="mc-hero-fan-slot mc-hero-in hidden sm:block"
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
