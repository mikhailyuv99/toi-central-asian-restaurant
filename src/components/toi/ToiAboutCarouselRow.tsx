"use client";

import Image from "next/image";
import { useState } from "react";
import type { AboutPhoto } from "@/data/about-media";

const TILE_W = 232;
const TILE_H = 172;
const FALLBACK = "/photos/maps/photo-6.jpg";

type RowProps = {
  direction: "ltr" | "rtl";
  items: AboutPhoto[];
  priority?: boolean;
};

/**
 * Seamless loop needs a second copy in the DOM for CSS -50% animation.
 * Each source file still appears only once in `items` (unique material).
 */
function loopTrack(items: AboutPhoto[]): AboutPhoto[] {
  return [...items, ...items];
}

function Tile({ item, index, priority }: { item: AboutPhoto; index: number; priority: boolean }) {
  const [src, setSrc] = useState(item.src);

  return (
    <figure className="habibi-media-row__item">
      <Image
        src={src}
        alt={item.alt}
        width={TILE_W}
        height={TILE_H}
        quality={88}
        sizes="(max-width: 767px) 212px, 232px"
        loading="eager"
        fetchPriority={priority && index < 3 ? "high" : undefined}
        className="habibi-media-row__photo"
        onError={() => {
          if (src !== FALLBACK) setSrc(FALLBACK);
        }}
      />
    </figure>
  );
}

export function ToiAboutCarouselRow({ direction, items, priority = false }: RowProps) {
  const track = loopTrack(items);
  const half = track.length / 2;

  return (
    <div className={`habibi-media-row toi-about-carousel habibi-media-row--${direction}`}>
      <div className="habibi-media-row__track">
        {track.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="habibi-media-row__cell"
            aria-hidden={i >= half || undefined}
          >
            <Tile item={item} index={i} priority={priority} />
          </div>
        ))}
      </div>
    </div>
  );
}
