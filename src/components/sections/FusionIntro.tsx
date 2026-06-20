import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SLAVIC_MURAL = "/photos/maps/photo-75.jpg";
const ARABIC_MURAL = "/photos/maps/photo-6.jpg";

export function FusionIntro() {
  return (
    <section id="fusion" className="bg-dark py-16 text-surface md:py-24">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel className="text-accent-bright">Two rooms, one table</SectionLabel>
              <h2 className="font-serif mt-4 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05]">
                Birch forest on one wall. Desert dunes on the other.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-surface/75 md:text-lg">
                Habibi is halal Slavic and Arabic food in a single sit-down room on An Thượng
                26 — khinkali and borscht share the menu with mezze and shashlik pulled off the
                skewer at your table.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-surface/55">
                أشهى المأكولات والمشروبات السلافية والعربية حلال
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <Reveal delay={120}>
                <figure className="group relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={SLAVIC_MURAL}
                    alt="Hand-painted Slavic mural — woman in traditional dress among birch trees"
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 to-transparent px-4 pb-4 pt-16 text-xs font-bold uppercase tracking-[0.18em] text-accent-bright">
                    Slavic
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={220}>
                <figure className="group relative mt-8 aspect-[3/4] overflow-hidden sm:mt-16">
                  <Image
                    src={ARABIC_MURAL}
                    alt="Arabic mural — desert landscape with traditional architecture"
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 to-transparent px-4 pb-4 pt-16 text-xs font-bold uppercase tracking-[0.18em] text-accent-bright">
                    Arabic
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
