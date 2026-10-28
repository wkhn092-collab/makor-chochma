"use client";

import { usePathname } from "next/navigation";
import { SkipLink } from "@/components/SkipLink";

/** Locale-aware skip link for root `layout.tsx` (Script 5 · 2.14). */
export function SkipLinkHost() {
  const path = usePathname() || "/";
  const locale = path === "/en" || path.startsWith("/en/") ? "en" : "he";
  return <SkipLink locale={locale} />;
}
