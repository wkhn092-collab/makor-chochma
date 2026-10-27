"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Copy } from "@/content/copy";
import { SITE_IMAGES } from "@/content/images";
import { gsap, prefersReducedMotion, useGSAP } from "@/motion/gsap";

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
const PATH_MOBILE =
  "M 160 40 C 160 40 60 140 60 220 C 60 320 260 360 260 460 C 260 560 60 600 60 700 C 60 780 160 840 160 880";

const VIEW_DESKTOP = { w: 1240, h: 400 };
const VIEW_MOBILE = { w: 320, h: 920 };
/** Sized for lawyer-scale SVG (~260px tall) so labels stay readable */
const NODE_SIZE = 56;

const GOLD = "#C9A962";
const GOLD_SOFT = "#D4B87A";

/**
 * Lawyer-style craft stage: visible photo, clean thumbs, path under cards.
 * RTL: 01 starts on the right.
 */
export function ScrollRoadmap({ copy }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [nodes, setNodes] = useState<NodePos[]>([]);

  const stages = copy.craft.steps;
  const craftImgs = SITE_IMAGES.craft;
  const rtl = copy.locale === "he";
  const pathDesktop = rtl ? PATH_DESKTOP_RTL : PATH_DESKTOP_LTR;
  /**
   * Last step near the end (~0.92) — late enough to feel like "סוף",
   * but slightly before 1 so image 04 is visible before pin releases.
   */
  const thresholds = useMemo(() => {
    const n = stages.length;
    if (n <= 1) return [0];
    return stages.map((_, i) => {
      if (i === 0) return 0;
      if (i === n - 1) return 0.92;
      return i / Math.max(1, n - 1);
    });
  }, [stages]);

  const applyLayout = useCallback(() => {
    const path = pathRef.current;
    const progress = progressRef.current;
    const glow = glowRef.current;
    const svg = svgRef.current;
    if (!path || !progress || !glow || !svg) return 0;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const view = mobile ? VIEW_MOBILE : VIEW_DESKTOP;
    const d = mobile ? PATH_MOBILE : pathDesktop;

    svg.setAttribute("viewBox", `0 0 ${view.w} ${view.h}`);
    path.setAttribute("d", d);
    progress.setAttribute("d", d);
    glow.setAttribute("d", d);

    const len = path.getTotalLength();
    const count = stages.length;

    if (mobile) {
      const pts: NodePos[] = [];
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1);
        const p = path.getPointAtLength(len * t);
        pts.push({ x: p.x, y: p.y });
      }
      setNodes(pts);
    } else {
      const seats = rtl ? NODES_DESKTOP_RTL : NODES_DESKTOP_LTR;
      setNodes(seats.slice(0, count));
    }

    for (const el of [progress, glow]) {
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    }
    return len;
  }, [stages.length, pathDesktop, rtl]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const progress = progressRef.current;
      const glow = glowRef.current;
      if (!section || !progress || !glow) return;

      let len = applyLayout();
      if (!len) return;

      if (prefersReducedMotion() || reduce) {
        progress.style.strokeDashoffset = "0";
        glow.style.strokeDashoffset = "0";
        setActive(stages.length - 1);
        return;
      }

      const applyProgress = (p: number) => {
        const offset = len * (1 - p);
        progress.style.strokeDashoffset = `${offset}`;
        glow.style.strokeDashoffset = `${offset}`;

        let idx = 0;
        for (let i = 0; i < thresholds.length; i++) {
          if (p + 0.001 >= (thresholds[i] ?? 0)) idx = i;
        }
        setActive((prev) => (prev === idx ? prev : idx));
      };

      const tween = gsap.to(
        {},
        {
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * stages.length * 0.95)}`,
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => applyProgress(self.progress),
          },
        },
      );

      const onResize = () => {
        len = applyLayout() || len;
        applyProgress(tween.scrollTrigger?.progress ?? 0);
        tween.scrollTrigger?.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [applyLayout, reduce, stages.length, thresholds] },
  );

  const stage = stages[active] ?? stages[0]!;
  const activeImg = craftImgs[active] ?? craftImgs[0]!;

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative isolate overflow-hidden text-white"
      style={{ backgroundColor: "#1a1816" }}
      aria-labelledby="roadmap-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeImg.src}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={activeImg.src}
              alt=""
              fill
              sizes="100vw"
              priority={active === 0}
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,16,14,0.22) 0%, rgba(18,16,14,0.15) 42%, rgba(18,16,14,0.62) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-[100svh] max-w-4xl flex-col justify-between px-4 py-8 md:px-6 md:py-10">
        {/* Story */}
        <div className="flex flex-col items-center pt-4 text-center md:pt-8">
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
              className="relative z-10 mt-5 inline-flex shrink-0 items-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-[#1a1612] shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform hover:scale-[1.02]"
            >
              {copy.craft.cta}
            </a>
          </div>
        </div>

        {/* Thumbs + path — lawyer width (max-w-5xl) */}
        <div className="mx-auto w-full max-w-5xl pb-1">
          <ul
            className={`mx-auto flex max-w-3xl gap-2.5 md:gap-3 ${rtl ? "flex-row-reverse" : ""}`}
            dir="ltr"
          >
            {stages.map((s, i) => {
              const img = craftImgs[i] ?? craftImgs[0]!;
              const on = i === active;
              return (
                <li key={s.n} className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
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
                      <span className="absolute inset-x-0 bottom-8 px-2 text-center md:bottom-9">
                        <span className="block truncate text-micro font-bold text-white md:text-caption">
                          {s.title}
                        </span>
                      </span>
                      {/* Bottom strip: gold + number when active, dark + number when not */}
                      <span
                        className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center md:h-8"
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

          {/* Lawyer-scale sine path — same max-h as cohen-law (~260px desktop) */}
          <div className="relative mt-2 w-full md:mt-3" dir="ltr">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEW_DESKTOP.w} ${VIEW_DESKTOP.h}`}
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
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={glowRef}
                d={pathDesktop}
                fill="none"
                stroke={GOLD}
                strokeWidth={26}
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
                strokeWidth={12}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#roadmap-glow)"
                style={{ willChange: "stroke-dashoffset" }}
              />

              {nodes.map((pos, i) => {
                const on = i <= active;
                const current = i === active;
                const half = NODE_SIZE / 2;
                const label = stages[i]?.n ?? String(i + 1).padStart(2, "0");
                return (
                  <g key={label} transform={`translate(${pos.x} ${pos.y})`}>
                    {current ? (
                      <circle r={half + 14} fill="rgba(201,169,98,0.25)" filter="url(#roadmap-glow)" />
                    ) : null}
                    <rect
                      x={-half}
                      y={-half}
                      width={NODE_SIZE}
                      height={NODE_SIZE}
                      rx={14}
                      ry={14}
                      fill="#161412"
                      stroke={on ? GOLD : "rgba(255,255,255,0.3)"}
                      strokeWidth={current ? 3 : 1.75}
                    />
                    <text
                      x={0}
                      y={0}
                      dy="0.35em"
                      textAnchor="middle"
                      fill={on ? GOLD : "rgba(255,255,255,0.7)"}
                      fontSize={20}
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
