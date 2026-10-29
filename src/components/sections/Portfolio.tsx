import Image from "next/image";
import type { Copy } from "@/content/copy";
import { SITE_IMAGES } from "@/content/images";
import { InkReveal } from "@/components/motion/InkReveal";
import { Reveal } from "@/motion/Reveal";

type Props = { copy: Copy };

/**
 * Lawyer-inspired portfolio doors — ivory stage, compact dark cards with photo tops.
 * No full-bleed void slab / 100svh horizontal gallery.
 */
export function Portfolio({ copy }: Props) {
  return (
    <section id="portfolio" className="bg-parchment px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl md:ms-auto md:text-end">
          <InkReveal
            as="h2"
            className="font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-bold text-ink"
          >
            {copy.portfolio.h2}
          </InkReveal>
          <Reveal delay={0.06} y={16}>
            <p className="mt-3 text-sm text-ink/60 md:text-base">{copy.portfolio.lead}</p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {copy.portfolio.items.map((item, i) => {
            const visual = SITE_IMAGES.portfolio[i];
            const alt =
              copy.locale === "he"
                ? (visual?.altHe ?? item.title)
                : (visual?.altEn ?? item.title);

            return (
              <Reveal key={item.title} delay={0.05 * i} y={20} as="li">
                <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] bg-surface ring-1 ring-ink/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:ring-gold/40">
                  <div
                    className={`relative aspect-[4/3] overflow-hidden${
                      visual?.id === "tefillin" || visual?.id === "mezuzot"
                        ? " bg-white"
                        : ""
                    }`}
                  >
                    {visual ? (
                      <Image
                        src={visual.src}
                        alt={alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={`${
                          visual.id === "tefillin" || visual.id === "mezuzot"
                            ? "object-contain"
                            : "object-cover"
                        } transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`}
                      />
                    ) : null}
                    <span className="absolute bottom-2 start-2 rounded-sm bg-parchment/90 px-1.5 py-0.5 text-tag text-bronze backdrop-blur-sm">
                      {copy.hero.simulation}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col border-t border-ink/8 bg-gradient-to-b from-white to-parchment px-4 py-4 md:px-5 md:py-5">
                    <span className="text-caption font-semibold tracking-[0.18em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold leading-snug text-ink md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                      {item.blurb}
                    </p>
                    <a
                      href="#lead"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#a8883f] transition-colors hover:text-ink"
                    >
                      {copy.craft.cta}
                      <span aria-hidden className="translate-y-px rtl:inline-block">
                        ←
                      </span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
