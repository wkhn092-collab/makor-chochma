"use client";

import { useState } from "react";
import clsx from "clsx";
import { CdnVideo } from "@/components/ui/CdnVideo";

type Orientation = "portrait" | "landscape";

type Props = {
  /** Real YouTube id, or PENDING_* placeholder */
  youtubeId?: string;
  /** Cloudinary (or other) remote MP4 — used while youtubeId is pending */
  fallbackSrc: string;
  title: string;
  duration?: string;
  playLabel?: string;
  orientation?: Orientation;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  onPlayRequest?: () => void;
};

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
    portrait: "aspect-[3/4] w-full max-w-[280px] mx-auto md:max-w-none",
    landscape: "aspect-video w-full",
  },
};

function isPendingYoutube(id?: string) {
  return !id || id.startsWith("PENDING_");
}

/**
 * Prefer YouTube iframe when a real id exists.
 * Pending placeholders keep remote Cloudinary click-to-play (not a local file).
 */
export function YoutubeEmbed({
  youtubeId,
  fallbackSrc,
  title,
  duration,
  playLabel = "נגן",
  orientation = "portrait",
  size = "sm",
  active = false,
  onPlayRequest,
}: Props) {
  const [showIframe, setShowIframe] = useState(false);

  if (isPendingYoutube(youtubeId)) {
    return (
      <CdnVideo
        src={fallbackSrc}
        title={title}
        duration={duration}
        playLabel={playLabel}
        orientation={orientation}
        size={size}
        active={active}
        onPlayRequest={onPlayRequest}
      />
    );
  }

  const frame = FRAME[size][orientation];

  if (!showIframe) {
    return (
      <button
        type="button"
        onClick={() => {
          setShowIframe(true);
          onPlayRequest?.();
        }}
        className={clsx(
          "group relative block w-full overflow-hidden rounded-[var(--radius-md)] bg-ink/10 ring-1 ring-ink/10",
          frame,
        )}
        aria-label={`${playLabel}: ${title}`}
      >
        <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="shadow-contact flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1.2,0.36,1)] group-hover:scale-[1.02]">
            <svg viewBox="0 0 24 24" className="ms-0.5 h-4 w-4 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        {duration ? (
          <span className="absolute end-2 bottom-2 rounded-sm bg-ink/75 px-1.5 py-0.5 text-[0.65rem] font-medium text-white">
            {duration}
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[var(--radius-md)] bg-ink ring-1 ring-ink/10",
        frame,
      )}
    >
      <iframe
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
