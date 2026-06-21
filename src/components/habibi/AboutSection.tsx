"use client";

import { client } from "@/lib/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ABOUT_CAROUSEL_ROWS } from "@/data/about-media";
import { ToiAboutCarouselRow } from "@/components/toi/ToiAboutCarouselRow";
import { ReviewCarouselRows } from "./ReviewCarouselRows";
import { ScrollReveal } from "./ScrollReveal";

export function AboutSection() {
  const { t } = useLanguage();
  const [row1, row2, row3] = ABOUT_CAROUSEL_ROWS;

  return (
    <section className="habibi-about toi-about" id="about" aria-labelledby="about-heading">
      <div className="habibi-about__inner">
        <ScrollReveal>
          <header className="habibi-page__header">
            {t.about.eyebrow ? (
              <p className="habibi-page__eyebrow">{t.about.eyebrow}</p>
            ) : null}
            <h2 id="about-heading" className="habibi-page__title">
              {t.about.title}
            </h2>
            {t.about.lead ? <p className="habibi-page__lead">{t.about.lead}</p> : null}
          </header>
        </ScrollReveal>

        <div className="habibi-about-story">
          <ScrollReveal variant="left">
            <div className="habibi-about-story__text">
              <p>{t.about.p1}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <ToiAboutCarouselRow direction={row1.direction} items={row1.items} priority />
          </ScrollReveal>

          <ScrollReveal variant="right">
            <div className="habibi-about-story__text">
              <p>{t.about.p2}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <ToiAboutCarouselRow direction={row2.direction} items={row2.items} />
          </ScrollReveal>

          <ScrollReveal variant="left">
            <div className="habibi-about-story__text">
              <p>{t.about.p3}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <ToiAboutCarouselRow direction={row3.direction} items={row3.items} />
          </ScrollReveal>

          <ScrollReveal>
            <div className="habibi-about-story__text habibi-about-story__text--closing">
              <p>{t.about.p4}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="habibi-reviews-section">
            <h3 className="habibi-section-label">{t.about.reviews}</h3>
            {client.rating != null && client.review_count != null && (
              <p className="habibi-reviews-subline">
                {t.about.reviewsSubline(
                  client.rating.toFixed(1),
                  client.review_count.toLocaleString()
                )}
              </p>
            )}
            <ReviewCarouselRows />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
