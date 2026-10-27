import Image from "next/image";
import Link from "next/link";
import type { Copy } from "@/content/copy";
import { SITE } from "@/content/site";
import { SITE_IMAGES } from "@/content/images";
import { Reveal } from "@/components/motion/Reveal";

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
    <footer className="border-t border-stone/70 bg-parchment-deep">
      {/* Closing band — full-bleed craft photo as background, CTA on top */}
      <Reveal>
        <div className="relative isolate overflow-hidden border-b border-stone/50">
          <Image
            src={SITE_IMAGES.footerCta.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_28%]"
            aria-hidden
          />
          {/* Soft luminous wash — real photo shows through, text stays readable */}
          <div
            aria-hidden
            className="absolute inset-0 bg-parchment/70 md:bg-parchment/62"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-parchment/35 via-transparent to-parchment-deep/50"
          />

          <div className="relative mx-auto flex min-h-[18rem] max-w-6xl flex-col justify-center px-4 py-14 text-start md:min-h-[22rem] md:px-6 md:py-20">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
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

          <span className="absolute bottom-3 start-3 z-10 rounded-sm bg-parchment/90 px-1.5 py-0.5 text-[9px] text-bronze backdrop-blur-sm">
            {copy.hero.simulation}
          </span>
        </div>
      </Reveal>

      {/* Columns */}
      <Reveal delay={0.06}>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 md:px-6 md:py-14">
          <div>
            <Link href={p || "/"} className="inline-block">
              <Image
                src="/logo.jpg"
                alt={brand}
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 font-display text-lg font-bold text-ink">{brand}</p>
            <p className="mt-2 text-sm leading-relaxed text-bronze">
              {copy.footer.offlineDeal}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-bronze">
              {copy.footer.navTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-bronze">
              {copy.footer.contactTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink/90">
              <li>{copy.locale === "he" ? SITE.addressHe : SITE.addressEn}</li>
              <li>
                <a href={telHref} className="footer-link" dir="ltr">
                  <bdi>{SITE.phoneDisplay}</bdi>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="footer-link" dir="ltr">
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

          <div>
            <p className="text-xs font-semibold tracking-wide text-bronze">
              {copy.footer.legalTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
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
              <li className="pt-2 text-xs leading-relaxed text-bronze">
                {SITE.legalName} ·{" "}
                <span dir="ltr">
                  ח.פ/עוסק <bdi>{SITE.businessId}</bdi>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-stone/50">
        <div className="mx-auto flex max-w-6xl px-4 py-5 md:px-6">
          <p className="text-xs text-bronze">{copy.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
