"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ScrollReveal } from "./ScrollReveal";

type Props = {
  directionsUrl: string;
  mapsQuery: string;
};

const EMBED_SRC = (query: string) =>
  `https://maps.google.com/maps?q=${query}&z=16&output=embed`;

export function MapsSectionClient({ directionsUrl, mapsQuery }: Props) {
  const { t } = useLanguage();
  const hostRef = useRef<HTMLDivElement>(null);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useEffect(() => {
    const src = EMBED_SRC(mapsQuery);
    const host = hostRef.current;
    if (!host) return;

    if (typeof IntersectionObserver === "undefined") {
      setEmbedSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEmbedSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [mapsQuery]);

  return (
    <ScrollReveal variant="left">
      <div className="habibi-maps__col habibi-maps__col--map">
      <div className="habibi-maps__card">
        <h2 id="maps-heading" className="habibi-maps__heading">
          {t.maps.title}
        </h2>
        <p className="habibi-maps__address">{t.maps.addressLine}</p>
        <p className="habibi-maps__subline">{t.maps.subline}</p>
        <p className="habibi-maps__hours">{t.maps.hoursNote}</p>
        <div ref={hostRef} className="habibi-maps__embed">
          {embedSrc ? (
            <iframe
              title="TOI on Google Maps"
              src={embedSrc}
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="habibi-maps__embed-placeholder" aria-hidden />
          )}
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="habibi-hero__btn habibi-hero__btn--primary habibi-maps__action"
        >
          {t.maps.gps}
        </a>
      </div>
      </div>
    </ScrollReveal>
  );
}
