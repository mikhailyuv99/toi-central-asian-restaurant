import Image from "next/image";
import { client } from "@/lib/client";
import { headline, hoursToday, locationShort, ratingLabel } from "@/lib/copy";
import { primaryCta, secondaryCta } from "@/lib/cta";
import { photos } from "@/lib/photos";
import { densityPad, getHeroPattern, sectionDensity, showHoursInHero } from "@/lib/sections";
import { CtaButton } from "@/components/ui/CtaButton";

/** Pattern A: full-bleed hero (LUXURY / EXPERIENCE) or B: asymmetric split */
export function Hero() {
  const pattern = getHeroPattern();
  const density = sectionDensity("hero");
  const rating = ratingLabel();

  if (pattern === "A") {
    return (
      <section className={`relative bg-dark ${densityPad[density]}`}>
        {photos.hero && (
          <div className="absolute inset-0">
            <Image
              src={photos.hero}
              alt={client.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-90"
            />
          </div>
        )}
        <div className="relative mx-auto flex min-h-[70svh] max-w-[88rem] flex-col justify-end px-5 pb-10 pt-24 md:min-h-[75svh] md:px-10 md:pb-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-bright">
            {locationShort()}
          </p>
          <h1 className="font-serif mt-3 max-w-[18ch] text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[0.98] text-surface">
            {headline()}
          </h1>
          {rating && (
            <p className="mt-4 text-sm font-semibold text-surface/80">{rating}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta && (
              <CtaButton
                href={primaryCta.href}
                label={primaryCta.label}
                external={primaryCta.external}
              />
            )}
            {secondaryCta && (
              <CtaButton
                href={secondaryCta.href}
                label={secondaryCta.label}
                variant="secondary"
                external={secondaryCta.external}
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-surface ${densityPad[density]}`}>
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 md:grid-cols-12 md:items-center md:gap-10 md:px-10">
        <div className="md:col-span-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            {locationShort()}
          </p>
          <h1 className="font-serif mt-3 text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.02] text-text">
            {headline()}
          </h1>
          {rating && (
            <p className="mt-4 text-sm font-semibold text-text-soft">{rating}</p>
          )}
          {showHoursInHero() && (
            <p className="mt-3 text-sm font-medium text-text">
              Today: <span className="text-text-soft">{hoursToday()}</span>
            </p>
          )}
          {client.owner_provided_notes && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-soft">
              {client.owner_provided_notes}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta && (
              <CtaButton
                href={primaryCta.href}
                label={primaryCta.label}
                external={primaryCta.external}
              />
            )}
            {secondaryCta && (
              <CtaButton
                href={secondaryCta.href}
                label={secondaryCta.label}
                variant="secondary"
                external={secondaryCta.external}
              />
            )}
          </div>
        </div>
        {photos.hero && (
          <div className="relative aspect-[4/3] md:col-span-7 md:aspect-[16/11]">
            <Image
              src={photos.hero}
              alt={client.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
