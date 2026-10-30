import type { CSSProperties } from "react";
import Image from "next/image";
import { SITE_IMAGES } from "@/content/images";
import "./hero-fan.css";

type FanCardData = {
  src: string;
  titleHe: string;
  titleEn: string;
  /** object-cover | object-contain */
  fit: "cover" | "contain";
  /** CSS object-position — face / product crop */
  position?: string;
  /** White-bg product stills — photo well stays white even on dark chrome */
  product?: boolean;
};

const FAN = [
  { r: -7, sink: 18, dark: true },
  { r: -5, sink: 12, dark: false },
  { r: -3, sink: 6, dark: false },
  { r: -1.5, sink: 2, dark: false },
  { r: 0, sink: 0, dark: false },
  { r: 1.5, sink: 2, dark: false },
  { r: 3, sink: 6, dark: false },
  { r: 5, sink: 12, dark: false },
  { r: 7, sink: 18, dark: true },
] as const;

const FAN_CARDS: FanCardData[] = [
  { src: SITE_IMAGES.craft[0]!.src, titleHe: "שיחת ייעוץ", titleEn: "Consultation", fit: "cover", position: SITE_IMAGES.craft[0]!.thumbFocus },
  { src: SITE_IMAGES.craft[1]!.src, titleHe: "קלף ודיו", titleEn: "Ink & parchment", fit: "cover", position: SITE_IMAGES.craft[1]!.thumbFocus },
  { src: SITE_IMAGES.craft[2]!.src, titleHe: "הגהה", titleEn: "Proofing", fit: "cover", position: SITE_IMAGES.craft[2]!.thumbFocus },
  { src: SITE_IMAGES.portfolio[0]!.src, titleHe: "תפילין", titleEn: "Tefillin", fit: "contain", product: true },
  { src: SITE_IMAGES.hero.src, titleHe: "מקור חכמה", titleEn: "Makor Chochma", fit: "cover", position: "45% 14%" },
  { src: SITE_IMAGES.portfolio[1]!.src, titleHe: "מזוזות", titleEn: "Mezuzot", fit: "contain", product: true },
  { src: SITE_IMAGES.portfolio[2]!.src, titleHe: "מגילות", titleEn: "Megillot", fit: "contain", product: true },
  { src: SITE_IMAGES.portfolio[3]!.src, titleHe: "ספרי תורה", titleEn: "Sifrei Torah", fit: "cover" },
  { src: SITE_IMAGES.craft[3]!.src, titleHe: "פגישה באלעד", titleEn: "Meeting in Elad", fit: "cover", position: SITE_IMAGES.craft[3]!.thumbFocus },
];

function FanCard({
  card,
  index,
  locale,
  flat = false,
}: {
  card: FanCardData;
  index: number;
  locale: "he" | "en";
  /** Marquee: no tilt — angled cards left a broken gap at the loop seam */
  flat?: boolean;
}) {
  const title = locale === "he" ? card.titleHe : card.titleEn;
  const fan = FAN[index] ?? FAN[2]!;
  const r = flat ? 0 : fan.r;
  const sink = flat ? 0 : fan.sink;
  return (
    <article
      className={`mc-hero-fan-card ${fan.dark ? "mc-hero-fan-card--dark" : "mc-hero-fan-card--light"}${flat ? " mc-hero-fan-card--flat" : ""}`}
      style={
        {
          "--r": String(r),
          "--sink": `${sink}px`,
          "--i": String(index),
        } as CSSProperties
      }
    >
      <div className="mc-hero-fan-chrome">
        <div className="mc-hero-fan-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="mc-hero-fan-title">{title}</p>
      </div>
      <div
        className={`mc-hero-fan-photo${card.product ? " mc-hero-fan-photo--product" : ""}`}
      >
        <Image
          src={card.src}
          alt=""
          fill
          quality={78}
          loading="lazy"
          sizes="(max-width: 639px) 16vw, (max-width: 767px) 28vw, 14vw"
          className={card.fit === "contain" ? "object-contain" : "object-cover"}
          style={{ objectPosition: card.position ?? "50% 50%" }}
        />
      </div>
    </article>
  );
}

type Props = { locale: "he" | "en" };

/**
 * CSS-only fan marquee — one track for mobile + desktop (SSR-safe, no matchMedia).
 * Desktop: 9 cards across, locked look. Mobile: smaller cards (~6 visible) + left drift.
 */
export function HeroFan({ locale }: Props) {
  return (
    <div className="mc-hero-fan-viewport" aria-hidden="true">
      <div className="mc-hero-fan-track">
        {[0, 1].map((copy) => (
          <div key={`copy-${copy}`} className="mc-hero-fan mc-hero-fan-group">
            {FAN_CARDS.map((card, index) => (
              <FanCard
                key={`d${copy}-${card.src}-${index}`}
                card={card}
                index={index}
                locale={locale}
                flat
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
