"use client";

import { client } from "@/lib/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { AboutMediaRows } from "./AboutMediaRows";
import { ReviewCarouselRows } from "./ReviewCarouselRows";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="habibi-about" id="about" aria-labelledby="about-heading">
      <div className="habibi-about__inner">
        <header className="habibi-page__header">
          <p className="habibi-page__eyebrow">{t.about.eyebrow}</p>
          <h2 id="about-heading" className="habibi-page__title">
            {t.about.title}
          </h2>
          <p className="habibi-page__lead">{t.about.lead}</p>
        </header>

        <div className="habibi-about-copy">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          <p>{t.about.p4}</p>
          <p>{t.about.p5}</p>
          {client.hours?.[0] && (
            <p className="habibi-about-hours">
              {client.hours[0]} · {client.phone}
            </p>
          )}
        </div>

        <AboutMediaRows />

        <div className="habibi-reviews-section">
          <h3 className="habibi-section-label">{t.about.reviews}</h3>
          <ReviewCarouselRows />
        </div>
      </div>
    </section>
  );
}
