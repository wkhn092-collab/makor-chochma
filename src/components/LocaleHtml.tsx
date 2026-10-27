"use client";

import { useEffect } from "react";
import type { Locale } from "@/content/copy";

export function LocaleHtml({ locale }: { locale: Locale }) {
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang;
    const prevDir = html.dir;
    html.lang = locale === "he" ? "he" : "en";
    html.dir = locale === "he" ? "rtl" : "ltr";
    return () => {
      html.lang = prevLang;
      html.dir = prevDir;
    };
  }, [locale]);
  return null;
}
