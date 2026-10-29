"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Copy } from "@/content/copy";
import { gsap, prefersReducedMotion, useGSAP } from "@/motion/gsap";
import { Reveal } from "@/motion/Reveal";

type Props = { copy: Copy };

type Stat = {
  title: string;
  value: string;
  note: string;
  countTo?: number;
};

/**
 * Yoav Numbers–style beat: luminous photo + cream glass panel (not a dark slab).
 */
export function StatsMoment({ copy }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const isHe = copy.locale === "he";

  const stats: Stat[] = isHe
    ? [
        {
          title: "הכתיבה",
          value: "ביד",
          note: "רק דיו וקלף. בלי מכונה.",
        },
        {
          title: "ההסמכות",
          value: "2",
          note: "משמרת סת״ם ויד רפאל",
          countTo: 2,
        },
        {
          title: "הליווי",
          value: "מלא",
          note: "מהשיחה הראשונה עד המסירה",
        },
      ]
    : [
        {
          title: "Writing",
          value: "By hand",
          note: "Ink and parchment only. Never machine.",
        },
        {
          title: "Certifications",
          value: "2",
          note: "Mishmeret Stam & Yad Rafael",
          countTo: 2,
        },
        {
          title: "Guidance",
          value: "Full",
          note: "From the first call until delivery",
        },
      ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      const nums = section.querySelectorAll<HTMLElement>("[data-stat-num]");
      nums.forEach((el) => {
        const target = Number(el.dataset.countTo);
        if (!Number.isFinite(target)) return;
        const state = { val: 0 };
        gsap.to(state, {
          val: target,
          duration: 1.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(state.val));
          },
          onComplete: () => {
            el.textContent = String(target);
          },
        });
      });

      const bg = section.querySelector<HTMLElement>("[data-stats-bg]");
      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -5, scale: 1.08 },
          {
            yPercent: 5,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden py-16 sm:py-20 md:pt-28 md:pb-16"
      aria-label={isHe ? "מה מייחד אותנו" : "What sets us apart"}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div data-stats-bg className="absolute inset-0 will-change-transform">
          <Image
            src="/images/megillah-yad-v6.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover object-[50%_40%] brightness-[1.12] saturate-[1.06] md:[filter:brightness(0.95)_saturate(0.88)_contrast(1.04)_sepia(0.22)_hue-rotate(-6deg)]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-parchment/80 via-parchment/50 to-parchment/90 md:from-parchment/72 md:via-parchment/55 md:to-parchment-deep/92" />
        <div
          className="absolute inset-0 m-auto size-[50vmax] rounded-full blur-[120px] md:size-[42vmax]"
          style={{ background: "rgb(201 169 98 / 0.14)" }}
        />
      </div>

      {/* Phone: compact 3-up strip. Desktop: same card, lower + smaller. */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:mt-10 md:max-w-3xl md:px-6 lg:max-w-3xl">
        <Reveal y={18}>
          <div className="rounded-[1.1rem] bg-parchment/92 p-1.5 shadow-[0_16px_40px_rgb(26_24_20/0.1)] ring-1 ring-ink/10 backdrop-blur-md sm:rounded-[1.35rem] sm:p-2 md:rounded-[1.15rem] md:bg-parchment-deep/80 md:p-2 md:shadow-[0_16px_40px_rgb(26_24_20/0.08)] md:ring-gold/25">
            <div className="overflow-hidden rounded-[0.9rem] border border-ink/8 bg-gradient-to-b from-white/90 to-parchment/95 text-ink sm:rounded-[1.15rem] md:rounded-[0.95rem] md:border-stone/70 md:bg-gradient-to-b md:from-parchment md:to-parchment-deep">
              <div className="border-b border-ink/8 px-3.5 py-2.5 sm:px-5 sm:py-3 md:border-stone/60 md:px-5 md:py-2.5">
                <span className="flex items-center justify-center gap-2 text-[0.65rem] font-semibold tracking-[0.14em] text-bronze uppercase sm:justify-start sm:gap-2.5 sm:text-caption">
                  <span className="relative flex size-2 md:size-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-gold/60 motion-reduce:hidden" />
                    <span className="relative size-2 rounded-full bg-gold" />
                  </span>
                  {isHe ? "מה מייחד אותנו" : "What sets us apart"}
                </span>
                {/* Accent under title — not a side rail */}
                <span
                  aria-hidden
                  className="mx-auto mt-2 block h-px w-12 bg-gold/70 sm:mx-0 sm:w-14"
                />
              </div>

              <dl className="grid grid-cols-3 divide-x divide-ink/8 rtl:divide-x-reverse md:divide-stone/55">
                {stats.map((s) => (
                  <div
                    key={s.title}
                    className="flex flex-col px-2 py-4 text-center sm:px-4 sm:py-7 md:px-4 md:py-6 lg:px-5 lg:py-7"
                  >
                    <dt className="text-[0.58rem] font-semibold tracking-[0.12em] text-bronze uppercase sm:text-caption sm:tracking-[0.16em]">
                      {s.title}
                    </dt>
                    <dd
                      className="font-display mt-1.5 text-[clamp(1.35rem,5.5vw,1.85rem)] font-bold leading-none tracking-[-0.03em] text-ink sm:mt-3 sm:text-[clamp(2.1rem,4.5vw,3rem)] md:mt-2 md:text-[clamp(1.85rem,2.4vw,2.35rem)]"
                      data-stat-num={s.countTo != null ? "" : undefined}
                      data-count-to={s.countTo}
                    >
                      {s.value}
                    </dd>
                    <dd className="mt-1.5 text-[0.62rem] leading-snug text-bronze sm:mt-3 sm:text-sm md:mt-2 md:text-xs md:leading-snug lg:text-[0.8125rem]">
                      {s.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
