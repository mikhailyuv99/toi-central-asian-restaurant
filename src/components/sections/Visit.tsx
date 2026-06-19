import { client, phoneHref } from "@/lib/client";
import { locationShort } from "@/lib/copy";
import { primaryCta } from "@/lib/cta";
import { densityPad, sectionDensity } from "@/lib/sections";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Pattern G: horizontal band */
export function Visit() {
  const density = sectionDensity("visit");

  return (
    <section id="visit" className={`bg-dark text-surface ${densityPad[density]}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>Visit</SectionLabel>
            <h2 className="font-serif mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              {locationShort()}
            </h2>
            <a
              href={`tel:${phoneHref}`}
              className="mt-6 inline-flex min-h-11 items-center text-lg font-bold text-accent-bright underline decoration-accent-bright decoration-2 underline-offset-4"
            >
              {client.phone}
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-bright">
                Address
              </p>
              <a
                href={client.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-base font-semibold leading-snug hover:underline"
              >
                {client.address}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-bright">
                Hours
              </p>
              {client.hours?.length ? (
                <ul className="mt-2 space-y-1">
                  {client.hours.map((h) => (
                    <li key={h} className="text-sm font-semibold">
                      {h}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm font-semibold">See Google Maps</p>
              )}
              {client.hours_note && (
                <p className="mt-2 text-xs text-surface/60">{client.hours_note}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-3 lg:col-span-3">
            {primaryCta && (
              <CtaButton
                href={primaryCta.href}
                label={primaryCta.label}
                external={primaryCta.external}
              />
            )}
            <CtaButton
              href={client.maps_url}
              label="Open in Maps"
              variant="secondary"
              external
            />
          </div>
        </div>
      </div>
    </section>
  );
}
