"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { useLeadUi } from "@/store/lead-ui";
import clsx from "clsx";

type Props = { copy: Copy };

const EASE_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

function prefix(locale: "he" | "en") {
  return locale === "he" ? "" : "/en";
}

export function SiteHeader({ copy }: Props) {
  const p = prefix(copy.locale);
  const home = p || "/";
  const panelId = useId();
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpenLocal] = useState(false);
  const setMenuOpenStore = useLeadUi((s) => s.setMenuOpen);
  const setMenuOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      setMenuOpenLocal((prev) => {
        const value = typeof next === "function" ? next(prev) : next;
        setMenuOpenStore(value);
        return value;
      });
    },
    [setMenuOpenStore],
  );

  const links = [
    { href: `${p}/about`, label: copy.nav.about },
    { href: `${p}/services`, label: copy.nav.services },
    { href: `${p}/recommendations`, label: copy.nav.testimonials },
    { href: `${p}/contact`, label: copy.nav.contact },
  ];

  const telHref = `tel:+${SITE.phoneE164}`;
  const brand = copy.locale === "he" ? SITE.brand : SITE.brandEn;

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  useEffect(() => () => setMenuOpenStore(false), [setMenuOpenStore]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = linksRef.current.filter(Boolean);
    /* Keep labels visible immediately — never blank the menu while GSAP loads */
    for (const el of items) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
    let cancelled = false;

    if (!reduced && items.length) {
      void import("gsap").then(({ default: gsap }) => {
        if (cancelled) return;
        gsap.fromTo(
          items,
          { y: 14 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out",
            overwrite: true,
            clearProps: "transform",
          },
        );
      });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[70]"
      >
        <div
          className={clsx(
            "border-b transition-[background-color,border-color,box-shadow,backdrop-filter,color] duration-300",
            scrolled || menuOpen
              ? "glass-bar border-stone/50 text-ink shadow-contact"
              : "border-transparent bg-transparent text-ink",
          )}
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
            <Link href={home} className="relative z-10 shrink-0" onClick={closeMenu}>
              <Image
                src="/logo.jpg"
                alt={brand}
                width={160}
                height={56}
                className="h-11 w-auto object-contain md:h-12"
                priority
              />
            </Link>

            <nav
              className="hidden items-center gap-6 text-sm font-medium text-ink/85 md:flex"
              aria-label="Primary"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="relative z-10 flex items-center gap-2 sm:gap-3">
              <Link
                href={copy.nav.switchHref}
                className="rounded-[var(--radius-sm)] px-2.5 py-1.5 text-xs font-medium text-bronze transition-colors hover:text-ink"
                data-analytics="locale_switch"
                hrefLang={copy.locale === "he" ? "en" : "he"}
              >
                {copy.nav.switchLabel}
              </Link>

              <a
                href={telHref}
                data-analytics="phone_click"
                className="btn-primary !hidden min-h-10 px-5 text-sm md:!inline-flex"
              >
                {copy.nav.ctaCall}
              </a>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/80 bg-white/70 text-ink shadow-contact backdrop-blur-sm md:hidden"
                aria-expanded={menuOpen}
                aria-controls={panelId}
                aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span className="sr-only">
                  {menuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                </span>
                <span className="relative block h-3.5 w-5" aria-hidden>
                  <span
                    className={clsx(
                      "absolute inset-x-0 top-0 h-0.5 origin-center rounded-full bg-ink transition-transform duration-300",
                      menuOpen && "translate-y-[6px] rotate-45",
                    )}
                    style={{ transitionTimingFunction: EASE_EXPO }}
                  />
                  <span
                    className={clsx(
                      "absolute inset-x-0 top-[6px] h-0.5 rounded-full bg-ink transition-opacity duration-200",
                      menuOpen && "opacity-0",
                    )}
                  />
                  <span
                    className={clsx(
                      "absolute inset-x-0 top-[12px] h-0.5 origin-center rounded-full bg-ink transition-transform duration-300",
                      menuOpen && "-translate-y-[6px] -rotate-45",
                    )}
                    style={{ transitionTimingFunction: EASE_EXPO }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay — above sticky/WA, below header controls */}
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label={copy.nav.openMenu}
        hidden={!menuOpen}
        className={clsx(
          "fixed inset-0 z-[60] flex h-[100dvh] max-h-[100dvh] flex-col bg-parchment md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col px-5 pt-[4.75rem]">
          <p className="text-caption font-semibold tracking-caption-wide text-bronze uppercase">
            {copy.locale === "he" ? "תפריט" : "Menu"}
          </p>
          <nav aria-label="Mobile" className="mt-4 flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
                onClick={closeMenu}
                className="font-display border-b border-stone/45 py-4 text-[1.5rem] font-bold leading-snug tracking-[-0.02em] text-ink first:border-t first:border-stone/45"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="shrink-0 border-t border-stone/50 bg-parchment-deep px-4 pt-3.5 pb-[max(0.85rem,env(safe-area-inset-bottom))]">
          <a
            href={telHref}
            data-analytics="phone_click"
            onClick={closeMenu}
            className="btn-primary w-full !min-h-12 text-base"
          >
            {copy.nav.ctaCall}
            <span className="ms-2 font-semibold opacity-80" dir="ltr">
              <bdi>{SITE.phoneDisplay}</bdi>
            </span>
          </a>
          <p className="mt-2.5 text-center text-xs text-bronze">
            {copy.locale === "he" ? SITE.hoursHe : SITE.hoursEn}
          </p>
        </div>
      </div>
    </>
  );
}
