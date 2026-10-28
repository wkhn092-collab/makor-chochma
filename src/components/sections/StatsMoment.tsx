"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Copy } from "@/content/copy";
import { gsap, prefersReducedMotion, useGSAP } from "@/motion/gsap";
import { Reveal } from "@/motion/Reveal";
import { SimulationBadge } from "@/components/ui/SimulationBadge";

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
      className="relative isolate overflow-hidden py-10 sm:py-16 md:py-28"
      aria-label={isHe ? "מה מייחד אותנו" : "What sets us apart"}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div data-stats-bg className="absolute inset-0 will-change-transform">
          <Image
            src="/images/megillah-yad-v6.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover object-[50%_40%] brightness-[1.12] saturate-[1.06]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-parchment/80 via-parchment/50 to-parchment/90" />
        <div
          className="absolute inset-0 m-auto size-[50vmax] rounded-full blur-[120px]"
          style={{ background: "rgb(201 169 98 / 0.14)" }}
        />
      </div>

      <SimulationBadge
        label={copy.hero.simulation}
        className="start-3 top-3 z-20 sm:start-4 sm:top-4"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-3 sm:px-4 md:px-8">
        <Reveal y={18}>
          <div className="rounded-[1.15rem] bg-parchment/92 p-1.5 shadow-[0_24px_64px_rgb(26_24_20/0.1)] ring-1 ring-ink/10 backdrop-blur-md sm:rounded-[1.75rem] sm:p-2.5 md:p-3.5">
            <div className="overflow-hidden rounded-[0.95rem] border border-ink/8 bg-gradient-to-b from-white/90 to-parchment/95 text-ink sm:rounded-[1.35rem]">
              <div className="flex items-center justify-between border-b border-ink/8 px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-8">
                <span className="flex items-center gap-2 text-caption font-semibold tracking-wide text-bronze uppercase sm:gap-2.5 sm:tracking-label">
                  <span className="relative flex size-2 sm:size-2.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-gold/60 motion-reduce:hidden" />
                    <span className="relative size-2 rounded-full bg-gold sm:size-2.5" />
                  </span>
                  {isHe ? "מה מייחד אותנו" : "What sets us apart"}
                </span>
                <span aria-hidden className="h-px w-8 bg-gold/60 sm:w-10" />
              </div>

              {/* Phone: 3 compact columns · sm+: same row · never a tall stack */}
              <dl className="grid grid-cols-3">
                {stats.map((s, i) => (
                  <div
                    key={s.title}
                    className={[
                      "flex min-w-0 flex-col px-2.5 py-5 text-center sm:px-6 sm:py-10 md:px-8 md:py-12",
                      i < stats.length - 1 ? "border-e border-ink/8" : "",
                    ].join(" ")}
                  >
                    <dt className="text-tag font-semibold tracking-[0.1em] text-bronze uppercase sm:text-caption sm:tracking-[0.16em]">
                      {s.title}
                    </dt>
                    <dd
                      className="font-display mt-2 text-[clamp(1.65rem,7vw,3.75rem)] font-bold leading-none tracking-[-0.03em] text-ink sm:mt-3"
                      data-stat-num={s.countTo != null ? "" : undefined}
                      data-count-to={s.countTo}
                    >
                      {s.value}
                    </dd>
                    <dd className="mt-2 text-micro leading-snug text-bronze sm:mt-3 sm:text-sm sm:text-body-soft">
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
