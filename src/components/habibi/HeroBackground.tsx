"use client";

import heroMedia from "@/data/hero-media.json";

const HERO_IMAGE = heroMedia.photos[0];

export function HeroBackground() {
  if (!HERO_IMAGE) return null;

  return (
    <div className="habibi-hero__bg" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={HERO_IMAGE} alt="" className="habibi-hero__bg-photo" decoding="async" />
      <div className="habibi-hero__bg-scrim" />
    </div>
  );
}
