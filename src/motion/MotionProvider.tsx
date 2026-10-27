"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { presets, type MotionPreset, type MotionSettings } from "./config";
import { ScrollTrigger } from "./gsap";

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

/**
 * Site motion context. Lenis intentionally omitted — importing lenis.css
 * collided with globals.css in the Turbopack CSS cache and wiped Tailwind.
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
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
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
