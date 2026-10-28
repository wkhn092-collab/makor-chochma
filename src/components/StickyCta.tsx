"use client";

import { useEffect } from "react";
import { useLeadUi } from "@/store/lead-ui";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import clsx from "clsx";

type Props = { copy: Copy };

export function StickyCta({ copy }: Props) {
  const stickyVisible = useLeadUi((s) => s.stickyVisible);
  const setStickyVisible = useLeadUi((s) => s.setStickyVisible);
  const menuOpen = useLeadUi((s) => s.menuOpen);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setStickyVisible(true);
      return;
    }
    const onScroll = () => {
      const threshold = hero.offsetHeight - 40;
      setStickyVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setStickyVisible]);

  const telHref = `tel:+${SITE.phoneE164}`;
  const hidden = !stickyVisible || menuOpen;

  return (
    <div
      className={clsx(
        "glass-bar shadow-contact fixed inset-x-0 bottom-0 z-40 border-t border-stone/60 px-3 py-3 transition-[transform,opacity] duration-300 md:hidden",
        hidden
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      aria-hidden={hidden}
      inert={hidden || undefined}
    >
      <div className="mx-auto flex max-w-lg gap-2.5 pb-[env(safe-area-inset-bottom)]">
        {/* RTL: first = ימין — “התקשרו” לבן, צר */}
        <a
          href={telHref}
          tabIndex={hidden ? -1 : undefined}
          className="inline-flex min-h-12 w-[7.5rem] shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-ink/20 bg-white px-3 text-sm font-semibold text-ink transition-colors hover:border-ink/35 hover:bg-white active:scale-[0.97]"
          data-analytics="phone_click"
        >
          {copy.sticky.call}
        </a>
        {/* RTL: second = שמאל — “תיאום שיחה” זהב, ארוך */}
        <a
          href="#lead"
          tabIndex={hidden ? -1 : undefined}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-md)] bg-gold px-4 text-sm font-bold text-ink transition-colors hover:bg-gold-soft active:scale-[0.97]"
          data-analytics="sticky_book_call"
        >
          {copy.sticky.cta}
        </a>
      </div>
    </div>
  );
}
