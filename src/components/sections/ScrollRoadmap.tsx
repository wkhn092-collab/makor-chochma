"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Copy } from "@/content/copy";
import { SITE_IMAGES } from "@/content/images";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

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
  /** Tall scroll track — sticky section locks inside while progress advances 01→04 */
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const pathLenRef = useRef(1);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  /** Seed seats immediately — never wait on GSAP or the path looks empty (no 01–04 nodes). */
  const [nodes, setNodes] = useState<NodePos[]>(() =>
    (copy.locale === "he" ? NODES_DESKTOP_RTL : NODES_DESKTOP_LTR).slice(
      0,
      copy.craft.steps.length,
    ),
  );
  /* Always false on SSR — sync after mount to avoid hydration mismatch */
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
    /*
     * Do NOT setNodes() here. A state update right before/after ScrollTrigger
     * pin makes React reparent #craft out of .pin-spacer and the lock dies.
     * Seats are seeded in useState (and synced below only when locale/count change).
     */

    for (const el of [progress, glow]) {
      el.style.strokeDasharray = `${len}`;
      /* Prefer-reduced / no-scrub: show full gold. Scrub path resets via onUpdate. */
      if (prefersReducedMotion() || reduce) {
        el.style.strokeDashoffset = "0";
      } else {
        el.style.strokeDashoffset = `${len}`;
      }
    }
    return len;
  }, [pathDesktop, reduce]);

  /* Sync seats when locale / stage count changes — skip if identical (no re-render). */
  useEffect(() => {
    const seats = (rtl ? NODES_DESKTOP_RTL : NODES_DESKTOP_LTR).slice(
      0,
      stageCount,
    );
    setNodes((prev) => {
      if (
        prev.length === seats.length &&
        prev.every((p, i) => p.x === seats[i]!.x && p.y === seats[i]!.y)
      ) {
        return prev;
      }
      return seats;
    });
  }, [rtl, stageCount]);

  /* Layout path even if ScrollTrigger mount is delayed */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      applyLayout();
    });
    return () => cancelAnimationFrame(id);
  }, [applyLayout]);

  /** Scroll distance while the sticky craft panel is locked (lawyer-equivalent). */
  const pinMetrics = useCallback(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section || stageCount <= 1) return null;
    const pinStart = track.getBoundingClientRect().top + window.scrollY;
    const pinDistance = Math.max(0, track.offsetHeight - section.offsetHeight);
    if (pinDistance <= 0) return null;
    return { pinStart, pinDistance };
  }, [stageCount]);

  /** Jump to a stage while sticky-locked — same math as lawyer LegalRoadmap. */
  const goToStage = useCallback(
    (targetIdx: number) => {
      const m = pinMetrics();
      if (!m) return;
      const idx = Math.min(stageCount - 1, Math.max(0, targetIdx));
      const y = m.pinStart + (idx / (stageCount - 1)) * m.pinDistance;
      if (Math.abs(window.scrollY - y) <= 2) return;
      const immediate = Boolean(reduce || prefersReducedMotion());
      window.scrollTo({
        top: y,
        behavior: immediate ? "auto" : "smooth",
      });
    },
    [pinMetrics, stageCount, reduce],
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
      const m = pinMetrics();
      if (!m) return;
      const yNow = window.scrollY;
      if (yNow < m.pinStart - 4 || yNow > m.pinStart + m.pinDistance + 4) return;

      const endY = event.changedTouches[0]?.clientY ?? startY;
      const dy = startY - endY;
      const step = Math.abs(dy) < 40 ? 0 : dy > 0 ? 1 : -1;
      const target = Math.min(stageCount - 1, Math.max(0, startIdx + step));
      const y = m.pinStart + (target / (stageCount - 1)) * m.pinDistance;
      if (Math.abs(yNow - y) <= 2) return;
      window.scrollTo({
        top: y,
        behavior: reduce || prefersReducedMotion() ? "auto" : "smooth",
      });
    };

    section.addEventListener("touchstart", onStart, { passive: true });
    section.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", onStart);
      section.removeEventListener("touchend", onEnd);
    };
  }, [compact, reduce, stageCount, pinMetrics]);

  /*
   * Sticky lock (no GSAP pin): tall track + sticky panel.
   * Scroll through the track advances 01→04 and paints the gold path.
   */
  /*
   * Single owner for stage scrub (no craft-lock.js parallel listeners).
   * Sticky track + scroll progress → 01–04 + gold path.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (section) section.dataset.craftLive = "1";

    const length = applyLayout() || progressRef.current?.getTotalLength() || 1;
    pathLenRef.current = length;

    const paintDash = (p: number) => {
      const len = pathLenRef.current;
      const offset = len * (1 - p);
      for (const el of [progressRef.current, glowRef.current]) {
        if (!el) continue;
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${offset}`;
      }
    };

    if (reduce || prefersReducedMotion()) {
      paintDash(1);
      setActive(stageCount - 1);
      return;
    }

    paintDash(0);

    const onScroll = () => {
      const m = pinMetrics();
      if (!m) return;
      const raw = (window.scrollY - m.pinStart) / m.pinDistance;
      const p = Math.min(1, Math.max(0, raw));
      paintDash(p);

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const idx = isMobile
        ? Math.min(stageCount - 1, Math.round(p * (stageCount - 1)))
        : Math.min(stageCount - 1, Math.floor(p * stageCount));
      setActive((prev) => (prev === idx ? prev : idx));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [applyLayout, reduce, stageCount, pinMetrics]);

  const stage = stages[active] ?? stages[0]!;
  const strokeTrack = compact ? 12 : 16;
  const strokeGlow = compact ? 18 : 26;
  const strokeProgress = compact ? 8 : 12;
  const nodeSize = compact ? 40 : 52;

  /* Mobile ~150% travel, desktop ~260% — same scroll budget as lawyer pin end */
  const trackMinH = compact ? "250vh" : "360vh";

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ minHeight: trackMinH, backgroundColor: "#1a1816" }}
    >
    <section
      ref={sectionRef}
      id="craft"
      className="sticky top-0 isolate h-[100svh] max-h-[100svh] overflow-hidden text-white"
      style={{ backgroundColor: "#1a1816" }}
      aria-labelledby="roadmap-heading"
    >
      {/* Lawyer-style: solid underlay + crossfade — never an empty black frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ backgroundColor: "#1a1816" }}
      >
        {/* All stage photos stacked — scroll runtime toggles opacity via active */}
        {craftImgs.slice(0, stageCount).map((img, i) => (
          <div
            key={img.src}
            data-craft-photo
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              quality={92}
              className="select-none object-cover contrast-[1.06] saturate-[1.05]"
              style={{
                objectPosition:
                  "focus" in img && img.focus ? img.focus : "50% 50%",
              }}
            />
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,16,14,0.42) 0%, rgba(18,16,14,0.18) 38%, rgba(18,16,14,0.12) 55%, rgba(18,16,14,0.65) 100%)",
          }}
        />
      </div>

      {/*
        Same shell as lawyer LegalRoadmap: copy on top, thumbs+sine path at bottom.
        Extra mobile pb clears sticky + WhatsApp.
      */}
      <div className="relative z-10 mx-auto flex h-[100svh] max-h-[100svh] max-w-4xl flex-col px-4 pb-[max(8.5rem,calc(env(safe-area-inset-bottom)+7.25rem))] pt-[max(1.25rem,env(safe-area-inset-top))] md:max-w-5xl md:px-6 md:pb-10 md:pt-10">
        {/* Story — lawyer layout: in-flow AnimatePresence (no absolute → no stuck opacity:0) */}
        <div className="mx-auto mt-[min(6vh,2.75rem)] w-full max-w-2xl shrink-0 text-center md:mt-0">
          <p className="text-caption font-medium tracking-[0.28em] text-gold uppercase">
            {copy.locale === "he" ? "ארבעה שלבים" : "Four stages"}
          </p>

          <div className="relative mt-2.5 min-h-[12.5rem] md:mt-3 md:min-h-[8.5rem]">
            {/*
              Lawyer LegalRoadmap uses motion/react; here GSAP pin was leaving
              framer-motion entrance at opacity:0. Keep copy always visible —
              crossfade only the photo behind (AnimatePresence above).
            */}
            <div aria-live="polite" aria-atomic="true">
              <p
                data-craft-num
                className="font-display text-[1.1rem] font-semibold tracking-[0.2em] text-gold md:text-[0.85rem]"
              >
                {stage.n}
              </p>
              <h2
                id="roadmap-heading"
                className="font-display mt-1.5 text-[clamp(2rem,7.5vw,2.45rem)] font-bold leading-[1.15] tracking-[-0.03em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:mt-1 md:text-[clamp(1.35rem,5.5vw,2.1rem)] md:leading-tight"
              >
                {stage.title}
              </h2>
              <p
                data-craft-body
                className="mx-auto mt-3 max-w-[34ch] text-[1.05rem] leading-snug text-white/90 md:mt-2 md:max-w-md md:text-[0.95rem] md:leading-relaxed"
              >
                {stage.body}
              </p>
              <a
                href="#lead"
                className="relative z-10 mt-5 inline-flex min-h-12 items-center touch-manipulation rounded-full bg-gold px-7 py-2.5 text-[1rem] font-semibold text-[#1a1612] shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform hover:scale-[1.02] md:mt-4 md:min-h-10 md:px-5 md:text-sm"
              >
                {copy.craft.cta}
              </a>
            </div>
          </div>
        </div>

        {/* Thumbs + sine path — exact lawyer LegalRoadmap geometry */}
        <div className="relative mt-auto flex min-h-0 flex-col justify-end gap-2.5 pb-1 pt-4 md:mt-3 md:gap-4 md:pb-2 md:pt-0">
          <ul className="mx-auto grid w-full max-w-2xl shrink-0 grid-cols-4 gap-2 md:gap-2.5">
            {stages.map((s, i) => {
              const img = craftImgs[i] ?? craftImgs[0]!;
              const on = i === active;
              return (
                <li key={s.n} className="min-w-0 flex-1">
                  <button
                    type="button"
                    data-craft-thumb
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
                    <span className="relative block aspect-[16/11] w-full bg-[#1a1816]">
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="220px"
                        quality={90}
                        className="object-cover"
                        style={{
                          objectPosition:
                            "thumbFocus" in img && img.thumbFocus
                              ? img.thumbFocus
                              : "focus" in img && img.focus
                                ? img.focus
                                : "50% 50%",
                          filter: on ? "none" : "brightness(0.88)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)",
                        }}
                      />
                      {/* Title always above the bottom strip */}
                      <span className="absolute inset-x-0 bottom-6 px-1 text-center sm:px-2 md:bottom-9">
                        <span className="block truncate text-[0.5625rem] font-bold leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] sm:text-micro md:text-caption">
                          {s.title}
                        </span>
                      </span>
                      {/* Bottom strip: gold + number when active, dark + number when not */}
                      <span
                        data-craft-strip
                        className="absolute inset-x-0 bottom-0 flex h-6 items-center justify-center md:h-8"
                        style={{
                          background: on ? GOLD : "rgba(0,0,0,0.55)",
                        }}
                      >
                        <span
                          data-craft-strip-label
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
    </div>
  );
}
