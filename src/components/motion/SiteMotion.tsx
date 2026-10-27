"use client";

import { MotionProvider } from "@/motion";

type Props = { children: React.ReactNode };

/** Wraps the site in the sofer motion preset (Tier 1+, no Lenis). */
export function SiteMotion({ children }: Props) {
  return (
    <MotionProvider preset="sofer" smooth={false}>
      {children}
    </MotionProvider>
  );
}
