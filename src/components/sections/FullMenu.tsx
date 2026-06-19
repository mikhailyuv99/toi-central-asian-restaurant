import Image from "next/image";
import { client } from "@/lib/client";
import { densityPad, sectionDensity } from "@/lib/sections";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FullMenu() {
  const density = sectionDensity("menu_highlights");

  return (
    <section id="menu-highlights" className={`bg-surface ${densityPad[density]}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <SectionLabel>Menu</SectionLabel>
            <h2 className="font-serif mt-3 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] text-text">
              Prices from the printed board. Everything else is on the pass tonight.
            </h2>
            <p className="mt-4 text-base text-text-soft md:text-lg">
              Five dishes with confirmed prices from Habibi&apos;s menu photos. The rest are
              served regularly — ask your server or call {client.phone} for tonight&apos;s list.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-20">
          {client.menu.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 80}>
              <div>
                <h3 className="font-serif border-b border-rule pb-3 text-2xl font-semibold text-text md:text-3xl">
                  {group.category}
                </h3>

                <ul className="mt-6 divide-y divide-rule">
                  {group.items.map((item, itemIndex) => {
                    const isFeatured = groupIndex === 0 && itemIndex === 0;
                    return (
                      <li
                        key={item.name}
                        className={`grid gap-5 py-6 md:grid-cols-12 md:items-center md:gap-8 ${
                          isFeatured ? "md:py-10" : ""
                        }`}
                      >
                        {item.photo && (
                          <div
                            className={`relative overflow-hidden bg-surface-muted ${
                              isFeatured
                                ? "aspect-[16/10] md:col-span-5 md:aspect-[4/3]"
                                : "aspect-[16/9] md:col-span-3"
                            }`}
                          >
                            <Image
                              src={item.photo}
                              alt={item.name}
                              fill
                              sizes={
                                isFeatured
                                  ? "(max-width: 768px) 100vw, 35vw"
                                  : "(max-width: 768px) 100vw, 20vw"
                              }
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={
                            item.photo
                              ? isFeatured
                                ? "md:col-span-7"
                                : "md:col-span-9"
                              : "md:col-span-12"
                          }
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <h4
                              className={`font-serif font-semibold text-text ${
                                isFeatured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
                              }`}
                            >
                              {item.name}
                            </h4>
                            {item.price && (
                              <span className="shrink-0 text-sm font-bold tracking-wide text-accent md:text-base">
                                {item.price}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="mt-2 max-w-prose text-sm leading-relaxed text-text-soft md:text-base">
                              {item.description}
                            </p>
                          )}
                          {!item.price && (
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-text-soft">
                              Price at restaurant — not on menu board photo
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
