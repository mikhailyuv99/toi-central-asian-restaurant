"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Props = {
  address: string;
  directionsUrl: string;
  mapsQuery: string;
};

export function MapsSectionClient({ address, directionsUrl, mapsQuery }: Props) {
  const { t } = useLanguage();

  return (
    <div className="habibi-maps__col habibi-maps__col--map">
      <div className="habibi-maps__card">
        <h2 id="maps-heading" className="habibi-maps__heading">
          {t.maps.title}
        </h2>
        <p className="habibi-maps__address">{address}</p>
        <div className="habibi-maps__embed">
          <iframe
            title="Habibi on Google Maps"
            src={`https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
  );
}
