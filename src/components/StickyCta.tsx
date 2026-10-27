"use client";

import { useEffect } from "react";
import { useLeadUi } from "@/store/lead-ui";
import type { Copy } from "@/content/copy";
import { waPrefill, whatsappUrl } from "@/lib/whatsapp";
import { interestLabel, SITE } from "@/content/site";
import clsx from "clsx";

type Props = { copy: Copy };

export function StickyCta({ copy }: Props) {
  const stickyVisible = useLeadUi((s) => s.stickyVisible);
  const setStickyVisible = useLeadUi((s) => s.setStickyVisible);
  const interest = useLeadUi((s) => s.interest);
  const secondaryInterest = useLeadUi((s) => s.secondaryInterest);

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

  const label = interestLabel(interest, copy.locale);
  const secondaryLabel =
    secondaryInterest && secondaryInterest !== interest
      ? interestLabel(secondaryInterest, copy.locale)
      : null;
  const waText = waPrefill(copy.locale, label, secondaryLabel);
  const telHref = `tel:+${SITE.phoneE164}`;

  return (
    <div
      className={clsx(
        "glass-bar shadow-contact fixed inset-x-0 bottom-0 z-40 border-t border-stone/60 px-3 py-3 transition-[transform,opacity] duration-300 md:hidden",
        stickyVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      aria-hidden={!stickyVisible}
    >
      <div className="mx-auto flex max-w-lg gap-2.5 pb-[env(safe-area-inset-bottom)]">
        <a
          href={telHref}
          className="btn-primary flex-1 !min-h-12 !px-4 text-sm"
          data-analytics="phone_click"
        >
          {copy.sticky.call}
        </a>
        <a
          href={whatsappUrl(waText)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1 !min-h-12 !px-4 text-sm"
          data-analytics="whatsapp_click"
        >
          {copy.sticky.wa}
        </a>
      </div>
    </div>
  );
}
