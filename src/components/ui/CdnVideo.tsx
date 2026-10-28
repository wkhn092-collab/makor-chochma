"use client";

import { useEffect, useRef, useState } from "react";
import { cdnUrl, cloudinaryPoster } from "@/lib/cdn";
import clsx from "clsx";

type Orientation = "portrait" | "landscape";

type Props = {
  src: string;
  title: string;
  duration?: string;
  className?: string;
  playLabel?: string;
  orientation?: Orientation;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  onPlayRequest?: () => void;
};

/** Frame fills card; video uses object-cover so no side bars. */
const FRAME: Record<"sm" | "md" | "lg", Record<Orientation, string>> = {
  sm: {
    portrait: "aspect-[3/4] w-full",
    landscape: "aspect-video w-full",
  },
  md: {
    portrait: "aspect-[3/4] w-full",
    landscape: "aspect-video w-full",
  },
  lg: {
    portrait: "aspect-[3/4] w-full max-w-[280px] mx-auto",
    landscape: "aspect-video w-full",
  },
};

const PLAY: Record<"sm" | "md" | "lg", string> = {
  sm: "h-7 w-7",
  md: "h-7 w-7",
  lg: "h-8 w-8",
};

const PLAY_ICON: Record<"sm" | "md" | "lg", string> = {
  sm: "h-3 w-3",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

/**
 * Click-to-play video: poster only until interaction.
 * No network for MP4 until play — keeps LCP/TBT clear of testimonials.
 */
export function CdnVideo({
  src,
  title,
  duration,
  className,
  playLabel = "נגן",
  orientation: orientationProp = "portrait",
  size = "sm",
  active = false,
  onPlayRequest,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const videoSrc = cdnUrl(src);
  const poster = cloudinaryPoster(videoSrc);
  const orientation: Orientation = orientationProp;
  /* Show <video> on click alone — don't wait for parent `active` (was blocking play). */
  const showPlayer = started;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!showPlayer) return;
    if (!active) {
      videoRef.current?.pause();
      return;
    }
    let cancelled = false;
    const tryPlay = () => {
      const v = videoRef.current;
      if (!v || cancelled) return;
      v.playsInline = true;
      const run = () =>
        v.play().catch(() => {
          v.muted = true;
          return v.play().catch(() => undefined);
        });
      if (v.readyState >= 2) void run();
      else v.addEventListener("loadeddata", () => void run(), { once: true });
    };
    const id = requestAnimationFrame(tryPlay);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [showPlayer, active]);

  function handleStart() {
    onPlayRequest?.();
    setStarted(true);
  }

  return (
    <div
      ref={rootRef}
      className={clsx(
        "relative isolate overflow-hidden rounded-[var(--radius-md)] bg-ink/85 shadow-contact",
        FRAME[size][orientation],
        showPlayer && active ? "z-20" : "z-0",
        className,
      )}
    >
      {!showPlayer ? (
        <button
          type="button"
          onClick={handleStart}
          className="absolute inset-0 z-10 block w-full"
          aria-label={`${playLabel}: ${title}`}
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading={nearViewport ? "eager" : "lazy"}
              decoding="async"
              fetchPriority="low"
            />
          ) : (
            <span className="absolute inset-0 bg-ink/80" aria-hidden />
          )}

          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className={clsx(
                "flex items-center justify-center rounded-full bg-white/95 text-ink shadow-[0_2px_8px_rgb(0_0_0/0.22)] transition-transform duration-300 hover:scale-105",
                PLAY[size],
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className={clsx("ms-0.5 fill-current", PLAY_ICON[size])}
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>

          {duration ? (
            <span
              className="absolute bottom-1.5 end-1.5 rounded-[var(--radius-sm)] bg-black/55 px-1.5 py-0.5 text-micro text-white tabular-nums"
              dir="ltr"
            >
              <bdi>{duration}</bdi>
            </span>
          ) : null}
        </button>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 z-10 h-full w-full object-cover object-center"
          src={videoSrc}
          title={title}
          aria-label={title}
          playsInline
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          preload="metadata"
          poster={poster ?? undefined}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
    </div>
  );
}
