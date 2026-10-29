import Image from "next/image";
import Link from "next/link";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { SITE_IMAGES } from "@/content/images";
import { SimulationBadge } from "@/components/ui/SimulationBadge";

type Props = { copy: Copy };

function prefix(locale: "he" | "en") {
  return locale === "he" ? "" : "/en";
}

export function SiteFooter({ copy }: Props) {
  const p = prefix(copy.locale);
  const brand = copy.locale === "he" ? SITE.brand : SITE.brandEn;
  const telHref = `tel:+${SITE.phoneE164}`;
  const consultHref = `${p}/contact`;

  const navLinks = [
    { href: `${p}/about`, label: copy.nav.about },
    { href: `${p}/services`, label: copy.nav.services },
    { href: `${p}/recommendations`, label: copy.nav.testimonials },
    { href: `${p}/contact`, label: copy.nav.contact },
  ];

  return (
    <footer
      className="border-t border-stone/70 bg-parchment-deep pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0"
      role="contentinfo"
      aria-label={copy.locale === "he" ? "כותרת תחתית" : "Site footer"}
    >
      {/* Closing band — desktop only (mobile already has sticky call/WA) */}
      {/* No Reveal here: GSAP/ScrollTrigger was leaving the band at opacity 0 */}
      <div className="hidden md:block">
        <div className="relative isolate overflow-hidden border-b border-stone/50">
          <Image
            src={SITE_IMAGES.footerCta.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_28%] [filter:brightness(0.9)_saturate(0.88)_sepia(0.2)_hue-rotate(-6deg)]"
            aria-hidden
          />
          <SimulationBadge
            label={copy.hero.simulation}
            className="start-4 top-4 z-10 md:start-6 md:top-6"
          />
          {/* Warm parchment/gold wash — matches site, less chalky white */}
          <div
            aria-hidden
            className="absolute inset-0 bg-parchment/55"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-parchment/25 via-transparent to-parchment-deep/60"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 75% 40%, rgb(201 169 98 / 0.12), transparent 70%)",
            }}
          />

          <div className="relative mx-auto flex min-h-[16rem] max-w-6xl flex-col justify-end px-4 py-12 text-start md:min-h-[18rem] md:px-6 md:py-14">
            <p className="text-caption font-semibold tracking-eyebrow text-bronze uppercase">
              {copy.locale === "he" ? "הצעד הבא" : "Next step"}
            </p>
            <h2 className="font-display mt-3 max-w-[16ch] text-[clamp(1.65rem,3.5vw,2.45rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
              {copy.footer.miniH2}
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink/75">
              {copy.footer.miniLead}
            </p>
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={telHref}
                data-analytics="phone_click"
                className="btn-primary w-full sm:w-auto"
              >
                {copy.footer.miniCtaCall}
                <span className="ms-1.5 font-semibold opacity-80" dir="ltr">
                  <bdi>{SITE.phoneDisplay}</bdi>
                </span>
              </a>
              <Link href={consultHref} className="btn-secondary w-full sm:w-auto">
                {copy.footer.miniCtaConsult}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Columns — mobile 2×2 classic, desktop 4-up (always visible; no Reveal) */}
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6 md:py-14">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-4 lg:gap-10">
          <div className="min-w-0">
            <Link href={p || "/"} className="inline-block">
              <Image
                src="/logo.jpg"
                alt={brand}
                width={140}
                height={48}
                className="h-8 w-auto object-contain md:h-10"
              />
            </Link>
            <p className="mt-2 font-display text-sm font-bold leading-snug text-ink md:mt-4 md:text-lg">
              {brand}
            </p>
            <p className="mt-1 text-[0.75rem] leading-snug text-bronze md:mt-2 md:text-sm md:leading-relaxed">
              {copy.footer.offlineDeal}
            </p>
          </div>

          <div className="min-w-0 text-center lg:text-start">
            <p className="text-caption font-semibold tracking-label text-bronze uppercase md:tracking-wide md:normal-case">
              {copy.footer.navTitle}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-sm md:mt-4 md:space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-caption font-semibold tracking-label text-bronze uppercase md:tracking-wide md:normal-case">
              {copy.footer.contactTitle}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-label text-ink/90 md:mt-4 md:space-y-3 md:text-sm">
              <li className="leading-snug">
                {copy.locale === "he" ? SITE.addressHe : SITE.addressEn}
              </li>
              <li>
                <a href={telHref} className="footer-link" dir="ltr">
                  <bdi>{SITE.phoneDisplay}</bdi>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="footer-link break-all"
                  dir="ltr"
                >
                  <bdi>{SITE.email}</bdi>
                </a>
              </li>
              <li className="text-bronze">
                {copy.locale === "he" ? SITE.hoursHe : SITE.hoursEn}
              </li>
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {copy.footer.maps}
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0 text-center lg:text-start">
            <p className="text-caption font-semibold tracking-label text-bronze uppercase md:tracking-wide md:normal-case">
              {copy.footer.legalTitle}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-sm md:mt-4 md:space-y-3">
              <li>
                <Link href={`${p}/accessibility`} className="footer-link">
                  {copy.footer.accessibility}
                </Link>
              </li>
              <li>
                <Link href={`${p}/privacy`} className="footer-link">
                  {copy.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`${p}/terms`} className="footer-link">
                  {copy.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`${p}/shipping`} className="footer-link">
                  {copy.footer.shipping}
                </Link>
              </li>
              <li>
                <Link href={`${p}/returns`} className="footer-link">
                  {copy.footer.returns}
                </Link>
              </li>
            </ul>
            <p className="mt-2.5 text-micro leading-snug text-bronze md:mt-3 md:text-xs md:leading-relaxed">
              {SITE.legalName} ·{" "}
              <span dir="ltr">
                ח.פ/עוסק <bdi>{SITE.businessId}</bdi>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-stone/50">
        <div className="mx-auto flex max-w-6xl px-4 py-3 md:px-6 md:py-5">
          <p className="text-xs text-bronze">{copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
