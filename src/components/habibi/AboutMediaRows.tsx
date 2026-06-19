"use client";

import telegramMedia from "@/data/telegram-media.json";

type RowProps = {
  direction: "ltr" | "rtl";
  photos: string[];
};

/** Build a track wide enough to fill the viewport, then double for seamless -50% loop. */
function buildSeamlessLoop(photos: string[]): string[] {
  if (photos.length === 0) return [];
  let unit = [...photos];
  while (unit.length < 10) {
    unit = [...unit, ...photos];
  }
  return [...unit, ...unit];
}

function ScrollRow({ direction, photos }: RowProps) {
  const loop = buildSeamlessLoop(photos);
  const half = loop.length / 2;
  if (loop.length === 0) return null;

  return (
    <div className={`habibi-media-row habibi-media-row--${direction}`}>
      <div className="habibi-media-row__track">
        {loop.map((src, i) => (
          <figure
            key={`${src}-${i}`}
            className="habibi-media-row__item"
            aria-hidden={i >= half || undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function AboutMediaRows() {
  const photos = telegramMedia.photos;
  const third = Math.ceil(photos.length / 3);
  const row1 = photos.slice(0, third);
  const row2 = photos.slice(third, third * 2);
  const row3 = photos.slice(third * 2);

  return (
    <section className="habibi-media-rows" aria-label="Photos from the restaurant">
      <ScrollRow direction="ltr" photos={row1} />
      <ScrollRow direction="rtl" photos={row2} />
      <ScrollRow direction="ltr" photos={row3} />
    </section>
  );
}
