"use client";

import Image from "next/image";
import { client } from "@/lib/client";
import { GOOGLE_WRITE_REVIEW_URL } from "@/lib/google-reviews";
import { social } from "@/lib/social";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FacebookIcon, InstagramIcon, SocialLink, TikTokIcon, WhatsAppIcon, ZaloIcon } from "./SocialIcons";

const LOGO = "/brand/logo-on-dark.png";
/** Storefront at night — Google Maps photo-1 */
const FACADE = "/photos/maps/photo-1.jpg";

export function HeroClient() {
  const { t } = useLanguage();
  const rating = client.rating;
  const reviewCount = client.review_count;

  return (
    <section className="toi-hero toi-hero--facade" aria-labelledby="toi-hero-heading">
      <Image
        src={FACADE}
        alt="TOI Central Asian Restaurant storefront on Bà Huyện Thanh Quan"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="toi-hero__facade-img"
      />
      <div className="toi-hero__vignette" aria-hidden />
      <div className="toi-hero__content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO}
          alt="TOI Halal Central Asian Restaurant"
          width={280}
          height={100}
          className="toi-hero__logo"
        />
        <p className="toi-hero__kicker">{t.hero.kicker}</p>
        <h1 id="toi-hero-heading" className="toi-hero__headline">
          {client.headline}
        </h1>
        {rating != null && reviewCount != null && (
          <p className="toi-hero__meta">
            <span className="toi-hero__stars" aria-hidden>
              {"★".repeat(Math.round(rating))}
            </span>
            {t.hero.meta(rating.toFixed(1), reviewCount.toLocaleString())}
          </p>
        )}
        <p className="toi-hero__address">{client.address}</p>
        <div className="toi-hero__actions">
          <a href={social.reserve} target="_blank" rel="noopener noreferrer" className="toi-btn toi-btn--gold">
            {t.hero.reserve}
          </a>
          <a href="/#menu" className="toi-btn toi-btn--ghost">
            {t.hero.menu}
          </a>
        </div>
        <a
          href={GOOGLE_WRITE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="toi-hero__review-link"
        >
          {t.hero.leaveReview}
        </a>
        <div className="toi-hero__social">
          <SocialLink href={social.whatsapp} label="WhatsApp">
            <WhatsAppIcon />
          </SocialLink>
          <SocialLink href={social.zalo} label="Zalo">
            <ZaloIcon />
          </SocialLink>
          <SocialLink href={social.instagram ?? undefined} label="Instagram">
            <InstagramIcon />
          </SocialLink>
          <SocialLink href={social.facebook ?? undefined} label="Facebook">
            <FacebookIcon />
          </SocialLink>
          <SocialLink href={social.tiktok ?? undefined} label="TikTok">
            <TikTokIcon />
          </SocialLink>
        </div>
      </div>
    </section>
  );
}
