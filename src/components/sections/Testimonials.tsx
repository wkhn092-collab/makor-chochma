"use client";

import { useRef, useState } from "react";
import type { Copy } from "@/content/copy";
import {
  FEATURED_TESTIMONIALS,
  MORE_TESTIMONIALS,
  TOPIC_LABEL,
  type TestimonialVideo,
} from "@/content/testimonials";
import { YoutubeEmbed } from "@/components/ui/YoutubeEmbed";

type Props = { copy: Copy };

function TestimonialCard({
  item,
  locale,
  playLabel,
  isActive,
  onPlay,
  size = "sm",
}: {
  item: TestimonialVideo;
  locale: "he" | "en";
  playLabel: string;
  isActive: boolean;
  onPlay: () => void;
  size?: "sm" | "md" | "lg";
}) {
  const name = locale === "he" ? item.nameHe : item.nameEn;
  const quote = locale === "he" ? item.quoteHe : item.quoteEn;
  const topic = TOPIC_LABEL[item.topic][locale];
  const isLarge = size === "lg";

  return (
    <article
      className={`relative flex h-full w-full flex-col ${
        isActive ? "z-30" : "z-0"
      }`}
    >
      <YoutubeEmbed
        youtubeId={item.youtubeId}
        fallbackSrc={item.src}
        title={name}
        duration={item.duration}
        playLabel={playLabel}
        orientation={item.orientation}
        size={size}
        active={isActive}
        onPlayRequest={onPlay}
      />
      <div className={isLarge ? "mt-3.5 flex flex-1 flex-col gap-1.5" : "mt-3 flex flex-1 flex-col gap-1"}>
        <p className="text-caption font-semibold tracking-wide text-accent md:text-xs">
          {topic}
        </p>
        <h3
          className={
            isLarge
              ? "font-display text-base font-bold leading-snug text-ink md:text-xl"
              : "font-display text-sm font-bold leading-snug text-ink md:text-base"
          }
        >
          {name}
        </h3>
        <blockquote
          className={
            isLarge
              ? "text-sm font-semibold leading-relaxed text-ink/85 md:text-base"
              : "line-clamp-3 text-xs font-semibold leading-relaxed text-ink/85 md:text-sm"
          }
        >
          “{quote}”
        </blockquote>
      </div>
    </article>
  );
}

export function Testimonials({ copy }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const isRtl = copy.locale === "he";
  const playLabel = copy.locale === "he" ? "נגן המלצה" : "Play testimonial";

  function scrollByCard(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = (card?.offsetWidth ?? 220) + 16;
    const delta = isRtl ? -dir * amount : dir * amount;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section
      id="testimonials"
      className="relative z-0 overflow-x-clip bg-parchment-deep/40 py-16 md:py-20"
    >
      <div className="relative z-0 mx-auto max-w-6xl px-4 md:max-w-7xl md:px-6">
        {/* No Reveal/InkReveal here — GSAP left cards at opacity 0 after craft sticky */}
        <h2 className="font-display max-w-3xl text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-snug text-ink md:max-w-4xl">
          {copy.testimonials.h2}
        </h2>

        <div className="relative z-0 mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12">
          {FEATURED_TESTIMONIALS.map((item) => (
            <div key={item.id} className="relative z-0 w-full min-w-0">
              <TestimonialCard
                item={item}
                locale={copy.locale}
                playLabel={playLabel}
                size="lg"
                isActive={playingId === item.id}
                onPlay={() => setPlayingId(item.id)}
              />
            </div>
          ))}
        </div>

        <div className="relative z-0 mt-12 md:mt-14">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h3 className="font-display text-lg font-bold text-ink md:text-xl">
              {copy.testimonials.moreTitle}
            </h3>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone bg-surface text-ink shadow-contact transition-colors hover:border-accent"
                aria-label={copy.testimonials.prev}
              >
                {isRtl ? "→" : "←"}
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone bg-surface text-ink shadow-contact transition-colors hover:border-accent"
                aria-label={copy.testimonials.next}
              >
                {isRtl ? "←" : "→"}
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="relative z-0 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            tabIndex={0}
            role="region"
            aria-label={copy.testimonials.moreTitle}
          >
            {MORE_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                data-carousel-card
                className={`w-[min(70vw,200px)] shrink-0 snap-start sm:w-[200px] md:w-[240px] ${
                  playingId === item.id ? "z-30" : "z-0"
                }`}
              >
                <TestimonialCard
                  item={item}
                  locale={copy.locale}
                  playLabel={playLabel}
                  size="sm"
                  isActive={playingId === item.id}
                  onPlay={() => setPlayingId(item.id)}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-bronze sm:hidden">{copy.testimonials.swipeHint}</p>
        </div>
      </div>
    </section>
  );
}
