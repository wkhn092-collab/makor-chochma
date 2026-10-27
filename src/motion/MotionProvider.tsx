"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { presets, type MotionPreset, type MotionSettings } from "./config";

type ScrollTarget = number | string | HTMLElement;

interface MotionContextValue {
  settings: MotionSettings;
  getLenis: () => null;
  scrollTo: (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => void;
}

const MotionContext = createContext<MotionContextValue>({
  settings: presets.sofer,
  getLenis: () => null,
  scrollTo: () => {},
});

export interface MotionProviderProps {
  children: ReactNode;
  preset?: MotionPreset;
  overrides?: Partial<MotionSettings>;
  /** Kept for API compat — Lenis is disabled in this project (Tier 1+). */
  smooth?: boolean;
}

async function refreshScrollTrigger() {
  const { ScrollTrigger } = await import("./gsap");
  ScrollTrigger.refresh();
}

/**
 * Site motion context. Lenis omitted. GSAP/ScrollTrigger loaded lazily
 * so the LCP path does not pay for the full motion kit up front.
 */
export function MotionProvider({
  children,
  preset = "sofer",
  overrides,
}: MotionProviderProps) {
  const pathname = usePathname();

  const overridesKey = JSON.stringify(overrides ?? {});
  const settings = useMemo<MotionSettings>(
    () => ({ ...presets[preset], ...(JSON.parse(overridesKey) as Partial<MotionSettings>) }),
    [preset, overridesKey],
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!cancelled) void refreshScrollTrigger();
      }, 200);
    };

    const start = () => {
      if (cancelled) return;
      const observer = new ResizeObserver(schedule);
      observer.observe(document.body);
      cleanupObserver = () => observer.disconnect();
      void refreshScrollTrigger();
    };

    let cleanupObserver = () => {};
    const idle =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(start, { timeout: 2500 })
        : window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cleanupObserver();
      if (typeof cancelIdleCallback !== "undefined" && typeof idle === "number") {
        try {
          cancelIdleCallback(idle as number);
        } catch {
          clearTimeout(idle);
        }
      } else {
        clearTimeout(idle);
      }
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void refreshScrollTrigger();
    }, 400);
    return () => clearTimeout(id);
  }, [pathname]);

  const value = useMemo<MotionContextValue>(
    () => ({
      settings,
      getLenis: () => null,
      scrollTo: (target, options = {}) => {
        const el =
          typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
        const top =
          typeof el === "number"
            ? el
            : el
              ? el.getBoundingClientRect().top + window.scrollY
              : 0;
        window.scrollTo({
          top: top + (options.offset ?? 0),
          behavior: options.immediate ? "auto" : "smooth",
        });
      },
    }),
    [settings],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}
