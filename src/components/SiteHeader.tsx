"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
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
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: `${p}/about`, label: copy.nav.about },
    { href: `${p}/services`, label: copy.nav.services },
    { href: `${p}/recommendations`, label: copy.nav.testimonials },
    { href: `${p}/contact`, label: copy.nav.contact },
  ];

  const telHref = `tel:+${SITE.phoneE164}`;
  const brand = copy.locale === "he" ? SITE.brand : SITE.brandEn;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 24);

      if (menuOpen) {
        lastY.current = y;
        return;
      }

      if (y < 48) {
        setHidden(false);
      } else if (delta > 10) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY.current = y;
    };

    lastY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = linksRef.current.filter(Boolean);

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
        style={{ transitionTimingFunction: EASE_EXPO }}
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
                className="btn-primary !min-h-10 !px-5 text-sm max-sm:!hidden"
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

      {/* Mobile full-screen overlay */}
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label={copy.nav.openMenu}
        hidden={!menuOpen}
        className={clsx(
          "fixed inset-0 z-40 flex flex-col bg-parchment/95 backdrop-blur-xl md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div className="flex flex-1 flex-col justify-center px-6 pb-28 pt-24">
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
                onClick={closeMenu}
                className="font-display border-b border-stone/40 py-4 text-2xl font-bold text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-stone/50 bg-parchment/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href={telHref}
            data-analytics="phone_click"
            onClick={closeMenu}
            className="flex w-full items-center justify-center rounded-[var(--radius-md)] bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-contact"
          >
            {copy.nav.ctaCall}
            <span className="ms-2 font-normal opacity-90" dir="ltr">
              <bdi>{SITE.phoneDisplay}</bdi>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
