"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Copy } from "@/content/copy";
import { SITE_IMAGES } from "@/content/images";
import { useMotion } from "@/motion";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/motion/gsap";

type Props = { copy: Copy };

type NodePos = { x: number; y: number };

/**
 * Exact lawyer-site sine wave (cohen-law craft path).
 * RTL: starts on the right (01) → paints left to 04.
 * Node seats sit on the wave “rests” (y=200), not equal arc-length peaks.
 */
const PATH_DESKTOP_RTL =
  "M 1180 200 C 1060 40, 940 40, 820 200 S 580 360, 460 200 S 220 40, 60 200";
const PATH_DESKTOP_LTR =
  "M 60 200 C 180 40, 300 40, 420 200 S 660 360, 780 200 S 1020 40, 1180 200";
/** 01→04 seats matching the cubic endpoints on the lawyer path */
const NODES_DESKTOP_RTL: NodePos[] = [
  { x: 1180, y: 200 },
  { x: 820, y: 200 },
  { x: 460, y: 200 },
  { x: 60, y: 200 },
];
const NODES_DESKTOP_LTR: NodePos[] = [
  { x: 60, y: 200 },
  { x: 420, y: 200 },
  { x: 780, y: 200 },
  { x: 1180, y: 200 },
];
/** Same viewBox as lawyer LegalRoadmap — one sine path on phone and desktop */
const VIEW = { w: 1240, h: 400 };

const GOLD = "#C9A962";
const GOLD_SOFT = "#D4B87A";

/**
 * Lawyer-style craft stage: visible photo, clean thumbs, path under cards.
 * RTL: 01 starts on the right.
 */
export function ScrollRoadmap({ copy }: Props) {
  const { scrollTo } = useMotion();
  const scrollToRef = useRef(scrollTo);
  useEffect(() => {
    scrollToRef.current = scrollTo;
  }, [scrollTo]);

  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [nodes, setNodes] = useState<NodePos[]>([]);
  const [compact, setCompact] = useState(false);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const stages = copy.craft.steps;
  const stageCount = stages.length;
  const craftImgs = SITE_IMAGES.craft;
  const rtl = copy.locale === "he";
  const pathDesktop = rtl ? PATH_DESKTOP_RTL : PATH_DESKTOP_LTR;

  const applyLayout = useCallback(() => {
    const path = pathRef.current;
    const progress = progressRef.current;
    const glow = glowRef.current;
    const svg = svgRef.current;
    if (!path || !progress || !glow || !svg) return 0;

    /* Lawyer parity: same horizontal sine on all breakpoints (no vertical zigzag). */
    const d = pathDesktop;
    svg.setAttribute("viewBox", `0 0 ${VIEW.w} ${VIEW.h}`);
    path.setAttribute("d", d);
    progress.setAttribute("d", d);
    glow.setAttribute("d", d);

    const len = path.getTotalLength();
    const seats = rtl ? NODES_DESKTOP_RTL : NODES_DESKTOP_LTR;
    setNodes(seats.slice(0, stageCount));

    for (const el of [progress, glow]) {
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    }
    return len;
  }, [stageCount, pathDesktop, rtl]);

  /** Scroll to a stage anchor inside the pin — same math as lawyer LegalRoadmap. */
  const goToStage = useCallback(
    (targetIdx: number) => {
      const section = sectionRef.current;
      const spacer = section?.parentElement;
      if (!section || !spacer || stageCount <= 1) return;
      const pinStart = spacer.getBoundingClientRect().top + window.scrollY;
      const pinDistance = spacer.offsetHeight - section.offsetHeight;
      if (pinDistance <= 0) return;
      const idx = Math.min(stageCount - 1, Math.max(0, targetIdx));
      const y = pinStart + (idx / (stageCount - 1)) * pinDistance;
      if (Math.abs(window.scrollY - y) > 2) {
        scrollToRef.current(y);
      }
    },
    [stageCount],
  );

  /*
   * Phone: one finger swipe = exactly one stage (lawyer LegalRoadmap).
   * Never lands between numbers; first/last stage lets the page scroll on.
   */
  useEffect(() => {
    if (!compact || reduce) return;
    const section = sectionRef.current;
    if (!section) return;

    let startY = 0;
    let startIdx = 0;

    const onStart = (event: TouchEvent) => {
      startY = event.touches[0]?.clientY ?? 0;
      startIdx = activeRef.current;
    };

    const onEnd = (event: TouchEvent) => {
      const spacer = section.parentElement;
      if (!spacer || stageCount <= 1) return;
      const pinStart = spacer.getBoundingClientRect().top + window.scrollY;
      const pinDistance = spacer.offsetHeight - section.offsetHeight;
      if (pinDistance <= 0) return;
      const yNow = window.scrollY;
      if (yNow < pinStart - 4 || yNow > pinStart + pinDistance + 4) return;

      const endY = event.changedTouches[0]?.clientY ?? startY;
      const dy = startY - endY;
      const step = Math.abs(dy) < 40 ? 0 : dy > 0 ? 1 : -1;
      const target = Math.min(stageCount - 1, Math.max(0, startIdx + step));
      const y = pinStart + (target / (stageCount - 1)) * pinDistance;
      if (Math.abs(yNow - y) > 2) {
        scrollToRef.current(y);
      }
    };

    section.addEventListener("touchstart", onStart, { passive: true });
    section.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", onStart);
      section.removeEventListener("touchend", onEnd);
    };
  }, [compact, reduce, stageCount]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const progress = progressRef.current;
      const glow = glowRef.current;
      if (!section || !progress || !glow) return;

      /* Kill orphan pins from HMR / prior mounts — those create the black void scroll. */
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });

      const paintSpacer = (st: ScrollTrigger | null | undefined) => {
        const pinEl = st?.pin;
        const spacer =
          pinEl instanceof HTMLElement ? pinEl.parentElement : null;
        if (spacer?.classList.contains("pin-spacer")) {
          /* Same idea as lawyer navy spacer — no white flash, but short pin only */
          spacer.style.backgroundColor = "#1a1816";
        }
      };

      let len = applyLayout();
      if (!len) return;

      if (prefersReducedMotion() || reduce) {
        progress.style.strokeDashoffset = "0";
        glow.style.strokeDashoffset = "0";
        setActive(stageCount - 1);
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isMobile, reduceMotion } = ctx.conditions as {
            isMobile: boolean;
            reduceMotion: boolean;
          };
          setCompact(isMobile);

          len = applyLayout() || len;

          if (reduceMotion) {
            progress.style.strokeDashoffset = "0";
            glow.style.strokeDashoffset = "0";
            setActive(stageCount - 1);
            return;
          }

          const applyProgress = (p: number, mobile: boolean) => {
            const offset = len * (1 - p);
            progress.style.strokeDashoffset = `${offset}`;
            glow.style.strokeDashoffset = `${offset}`;
            const idx = mobile
              ? Math.min(stageCount - 1, Math.round(p * (stageCount - 1)))
              : Math.min(stageCount - 1, Math.floor(p * stageCount));
            setActive((prev) => (prev === idx ? prev : idx));
          };

          const tween = gsap.to(
            {},
            {
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                /* Exact lawyer LegalRoadmap pin lengths */
                end: isMobile ? "+=150%" : "+=260%",
                pin: true,
                scrub: 0.7,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh: (self) => paintSpacer(self),
                onEnter: (self) => paintSpacer(self),
                onEnterBack: (self) => paintSpacer(self),
                onUpdate: (self) => {
                  paintSpacer(self);
                  applyProgress(self.progress, isMobile);
                },
              },
            },
          );

          paintSpacer(tween.scrollTrigger ?? undefined);

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [applyLayout, reduce, stageCount] },
  );

  const stage = stages[active] ?? stages[0]!;
  const activeImg = craftImgs[active] ?? craftImgs[0]!;
  const strokeTrack = compact ? 12 : 16;
  const strokeGlow = compact ? 18 : 26;
  const strokeProgress = compact ? 8 : 12;
  const nodeSize = compact ? 40 : 52;

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative isolate min-h-[100svh] overflow-hidden text-white"
      style={{ backgroundColor: "#1a1816" }}
      aria-labelledby="roadmap-heading"
    >
      {/* Lawyer-style: solid underlay + crossfade — never an empty black frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ backgroundColor: "#1a1816" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeImg.src}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={activeImg.src}
              alt=""
              fill
              sizes="100vw"
              priority={active === 0}
              className="select-none object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,16,14,0.55) 0%, rgba(18,16,14,0.28) 38%, rgba(18,16,14,0.2) 55%, rgba(18,16,14,0.72) 100%)",
          }}
        />
      </div>

      {/*
        Mobile bottom pad clears sticky + WhatsApp so thumbs/path sit at lawyer height.
        Lawyer uses ~6.25rem; here sticky+WA need a bit more lift.
      */}
      <div className="relative z-10 mx-auto flex h-[100svh] max-h-[100svh] max-w-4xl flex-col px-4 pb-[max(8.5rem,calc(env(safe-area-inset-bottom)+7.25rem))] pt-8 md:max-w-5xl md:px-6 md:pb-10 md:pt-10">
        {/* Story */}
        <div className="flex shrink-0 flex-col items-center pt-4 text-center md:pt-8">
          <p className="text-caption font-medium tracking-[0.28em] text-gold uppercase">
            {copy.locale === "he" ? "ארבעה שלבים" : "Four stages"}
          </p>

          <div className="relative mt-4 flex w-full flex-col items-center">
            <div className="relative w-full min-h-[6.5rem] md:min-h-[7.25rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.n}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 top-0 flex flex-col items-center"
                >
                  <p className="font-display text-sm font-semibold tracking-[0.2em] text-gold md:text-base">
                    {stage.n}
                  </p>
                  <h2
                    id="roadmap-heading"
                    className="font-display mt-2 max-w-xl text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
                  >
                    {stage.title}
                  </h2>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/88 md:text-[0.95rem]">
                    {stage.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <a
              href="#lead"
              className="relative z-10 mt-4 inline-flex min-h-11 shrink-0 items-center touch-manipulation rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-[#1a1612] shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform hover:scale-[1.02] md:mt-5"
            >
              {copy.craft.cta}
            </a>
          </div>
        </div>

        {/* Thumbs + path — lawyer: mt-auto + tight gap, lifted by section pb */}
        <div className="relative mt-auto mx-auto flex w-full max-w-5xl min-h-0 flex-col justify-end gap-2.5 pb-1 pt-4 md:mt-3 md:gap-4 md:pb-2 md:pt-0">
          <ul
            className={`mx-auto flex w-full max-w-3xl gap-2.5 md:gap-3 ${rtl ? "flex-row-reverse" : ""}`}
            dir="ltr"
          >
            {stages.map((s, i) => {
              const img = craftImgs[i] ?? craftImgs[0]!;
              const on = i === active;
              return (
                <li key={s.n} className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => goToStage(i)}
                    className="relative block w-full overflow-hidden rounded-md text-start outline-none transition-[box-shadow,transform] duration-500"
                    style={{
                      transform: on ? "translateY(-2px)" : undefined,
                      boxShadow: on
                        ? `0 0 0 2px ${GOLD}, 0 12px 28px rgba(0,0,0,0.4)`
                        : "0 6px 18px rgba(0,0,0,0.28)",
                    }}
                    aria-current={on ? "step" : undefined}
                    aria-label={`${s.n} ${s.title}`}
                  >
                    <span className="relative block aspect-[16/11] w-full">
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="180px"
                        className="object-cover"
                        style={{
                          filter: on ? "none" : "brightness(0.75)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.72) 100%)",
                        }}
                      />
                      {/* Title always above the bottom strip */}
                      <span className="absolute inset-x-0 bottom-6 px-1 text-center sm:px-2 md:bottom-9">
                        <span className="block truncate text-[0.5625rem] font-bold leading-tight text-white sm:text-micro md:text-caption">
                          {s.title}
                        </span>
                      </span>
                      {/* Bottom strip: gold + number when active, dark + number when not */}
                      <span
                        className="absolute inset-x-0 bottom-0 flex h-6 items-center justify-center md:h-8"
                        style={{
                          background: on ? GOLD : "rgba(0,0,0,0.55)",
                        }}
                      >
                        <span
                          className="text-caption font-bold tracking-[0.14em] md:text-xs"
                          style={{ color: on ? "#1a1612" : "rgba(255,255,255,0.75)" }}
                        >
                          {s.n}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Exact lawyer LegalRoadmap sine — same path phone + desktop */}
          <div className="relative w-full shrink-0" dir="ltr">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              className="mx-auto h-auto w-full max-h-[min(18vh,130px)] max-w-5xl shrink-0 overflow-visible drop-shadow-[0_8px_24px_rgb(0_0_0/0.35)] md:max-h-[min(32vh,260px)]"
              role="img"
              aria-label={copy.craft.h2}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="roadmap-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="roadmap-gold" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor={GOLD_SOFT} />
                  <stop offset="100%" stopColor={GOLD} />
                </linearGradient>
              </defs>

              <path
                ref={pathRef}
                d={pathDesktop}
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth={strokeTrack}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={glowRef}
                d={pathDesktop}
                fill="none"
                stroke={GOLD}
                strokeWidth={strokeGlow}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.5}
                filter="url(#roadmap-glow)"
                style={{ willChange: "stroke-dashoffset" }}
              />
              <path
                ref={progressRef}
                d={pathDesktop}
                fill="none"
                stroke="url(#roadmap-gold)"
                strokeWidth={strokeProgress}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#roadmap-glow)"
                style={{ willChange: "stroke-dashoffset" }}
              />

              {nodes.map((pos, i) => {
                const on = i <= active;
                const current = i === active;
                const half = nodeSize / 2;
                const label = stages[i]?.n ?? String(i + 1).padStart(2, "0");
                return (
                  <g key={label} transform={`translate(${pos.x} ${pos.y})`}>
                    {current ? (
                      <circle
                        r={nodeSize * 0.72}
                        fill="rgba(201,169,98,0.25)"
                        filter="url(#roadmap-glow)"
                      />
                    ) : null}
                    <rect
                      x={-half}
                      y={-half}
                      width={nodeSize}
                      height={nodeSize}
                      rx={12}
                      ry={12}
                      fill="#161412"
                      stroke={on ? GOLD : "rgba(255,255,255,0.28)"}
                      strokeWidth={1.5}
                    />
                    <text
                      x={0}
                      y={0}
                      dominantBaseline="central"
                      textAnchor="middle"
                      fill={on ? GOLD : "rgba(255,255,255,0.45)"}
                      fontSize={compact ? 12 : 15}
                      fontWeight={700}
                      style={{ fontFamily: "var(--font-frank), Georgia, serif" }}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
