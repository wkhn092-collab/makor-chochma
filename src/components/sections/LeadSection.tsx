import Image from "next/image";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { SITE_IMAGES } from "@/content/images";
import { Reveal } from "@/motion/Reveal";
import { InkReveal } from "@/components/motion/InkReveal";
import { LeadForm } from "@/components/LeadForm";

type Props = { copy: Copy };

/**
 * Lead stage — form + editorial contact panel (fills the empty column).
 */
export function LeadSection({ copy }: Props) {
  const isHe = copy.locale === "he";
  const telHref = `tel:+${SITE.phoneE164}`;
  const steps = isHe
    ? [
        { n: "01", t: "שיחת ייעוץ", d: "מבינים מה מתאים, בלי לחץ ובלי מחיר באתר." },
        { n: "02", t: "פגישה באלעד", d: "אם זה מתאים, סוגרים פנים אל פנים." },
        { n: "03", t: "כתיבה וליווי", d: "מההזמנה עד שהסת״ם אצלכם." },
      ]
    : [
        { n: "01", t: "Consultation call", d: "We clarify what fits, no pressure, no price online." },
        { n: "02", t: "Meeting in Elad", d: "If it’s a fit, we close face to face." },
        { n: "03", t: "Writing & guidance", d: "From order until the Stam is with you." },
      ];

  return (
    <section id="lead" className="border-t border-stone/70 bg-parchment py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col">
            <p className="text-caption font-semibold tracking-[0.22em] text-gold uppercase">
              {isHe ? "יצירת קשר" : "Contact"}
            </p>
            <InkReveal
              as="h2"
              className="font-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-ink"
            >
              {copy.form.h2}
            </InkReveal>
            <Reveal delay={0.06} y={16}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
                {copy.form.lead}
              </p>
            </Reveal>

            <Reveal delay={0.1} y={20} className="mt-8 flex-1">
              <div className="relative isolate min-h-[14rem] overflow-hidden rounded-[var(--radius-md)] ring-1 ring-ink/10 sm:min-h-[16rem]">
                <Image
                  src={SITE_IMAGES.craft[3]!.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="font-display text-lg font-bold text-white md:text-xl">
                    {isHe ? SITE.contactName : SITE.contactNameEn}
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    {isHe ? "סופר סת״ם · אלעד" : "Sofer Stam · Elad"}
                  </p>
                </div>
                <span className="absolute top-3 start-3 rounded-sm bg-parchment/90 px-1.5 py-0.5 text-tag text-bronze backdrop-blur-sm">
                  {copy.hero.simulation}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.14} y={16}>
              <ul className="mt-8 space-y-5 border-t border-ink/10 pt-7">
                {steps.map((s) => (
                  <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="font-display text-sm font-semibold tracking-[0.12em] text-gold">
                      {s.n}
                    </span>
                    <span>
                      <span className="block font-display text-base font-bold text-ink">{s.t}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-ink/60">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18} y={12}>
              <div className="mt-8 space-y-2 border-t border-ink/10 pt-6 text-sm text-ink/75">
                <p>
                  <a href={telHref} className="font-medium text-ink hover:text-gold" dir="ltr">
                    <bdi>{SITE.phoneDisplay}</bdi>
                  </a>
                </p>
                <p>{isHe ? SITE.addressHe : SITE.addressEn}</p>
                <p className="text-bronze">{isHe ? SITE.hoursHe : SITE.hoursEn}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} y={24} className="h-full">
            <div className="flex h-full flex-col rounded-[1.15rem] border border-ink/8 bg-gradient-to-b from-white to-parchment/80 p-5 shadow-[0_20px_50px_rgb(26_24_20/0.06)] md:p-8">
              <p className="text-caption font-semibold tracking-[0.18em] text-bronze uppercase">
                {isHe ? "השאירו פרטים" : "Leave your details"}
              </p>
              <div className="mt-5 flex-1">
                <LeadForm copy={copy} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
