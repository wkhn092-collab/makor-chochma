"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { SITE_IMAGES } from "@/content/images";
import "./hero-fan.css";

type FanCardData = {
  src: string;
  titleHe: string;
  titleEn: string;
  focus: string;
  dark?: boolean;
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
  { src: SITE_IMAGES.craft[0]!.src, titleHe: "שיחת ייעוץ", titleEn: "Consultation", focus: "object-[center_40%]", dark: true },
  { src: SITE_IMAGES.craft[1]!.src, titleHe: "קלף ודיו", titleEn: "Ink & parchment", focus: "object-[center_42%]" },
  { src: SITE_IMAGES.craft[2]!.src, titleHe: "הגהה", titleEn: "Proofing", focus: "object-[center_38%]" },
  { src: SITE_IMAGES.portfolio[0]!.src, titleHe: "תפילין", titleEn: "Tefillin", focus: "object-[center_32%]" },
  { src: SITE_IMAGES.hero.src, titleHe: "מקור חכמה", titleEn: "Makor Chochma", focus: "object-[center_22%]" },
  { src: SITE_IMAGES.portfolio[1]!.src, titleHe: "מזוזות", titleEn: "Mezuzot", focus: "object-[center_45%]" },
  { src: SITE_IMAGES.portfolio[2]!.src, titleHe: "מגילות", titleEn: "Megillot", focus: "object-[center_28%]" },
  { src: SITE_IMAGES.portfolio[3]!.src, titleHe: "ספרי תורה", titleEn: "Sifrei Torah", focus: "object-[center_35%]" },
  { src: SITE_IMAGES.craft[3]!.src, titleHe: "פגישה באלעד", titleEn: "Meeting in Elad", focus: "object-[center_40%]", dark: true },
];

/** Mobile shows indices 3–5 only — never request the other 6 images on small screens. */
const MOBILE_SLICE = [3, 4, 5] as const;

function FanCard({
  card,
  index,
  locale,
}: {
  card: FanCardData;
  index: number;
  locale: "he" | "en";
}) {
  const title = locale === "he" ? card.titleHe : card.titleEn;
  const fan = FAN[index] ?? FAN[2]!;
  return (
    <article
      className={`mc-hero-fan-card ${fan.dark ? "mc-hero-fan-card--dark" : "mc-hero-fan-card--light"}`}
      style={
        {
          "--r": fan.r,
          "--sink": `${fan.sink}px`,
          "--i": index,
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
      <div className="mc-hero-fan-photo">
        <Image
          src={card.src}
          alt=""
          fill
          quality={62}
          loading="lazy"
          sizes="(max-width: 639px) 32vw, (max-width: 767px) 28vw, 11vw"
          className={`object-cover ${card.focus}`}
        />
      </div>
    </article>
  );
}

type Props = { locale: "he" | "en" };

export function HeroFan({ locale }: Props) {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const indices = wide
    ? FAN_CARDS.map((_, i) => i)
    : [...MOBILE_SLICE];

  return (
    <div className="mc-hero-fan" aria-hidden="true">
      {indices.map((index) => {
        const card = FAN_CARDS[index]!;
        return (
          <FanCard
            key={`${card.src}-${index}`}
            card={card}
            index={index}
            locale={locale}
          />
        );
      })}
    </div>
  );
}
