import Image from "next/image";
import { client } from "@/lib/client";
import { dishThumbs } from "@/lib/habibi-content";

export function MenuSection() {
  return (
    <section id="menu" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <p className="label-caps text-gold">Menu</p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Khinkali, borscht, mezze, and lamb shashlik pulled off the skewer at your
          table. Prices below are from Habibi&apos;s printed board — ask your server for
          the rest.
        </p>

        <ul className="mt-10 flex justify-center gap-4 md:gap-6">
          {dishThumbs.map((d) => (
            <li key={d.src} className="w-[28%] max-w-[9rem] md:max-w-[10.5rem]">
              <div className="relative aspect-square overflow-hidden bg-cream-dark">
                <Image
                  src={d.src}
                  alt={d.alt}
                  fill
                  quality={80}
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-center font-serif text-sm text-ink">{d.name}</p>
              {d.price && (
                <p className="text-center text-xs text-gold">{d.price}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-14 space-y-10 md:mt-16">
          {client.menu.map((group) => (
            <div key={group.category}>
              <h2 className="label-caps border-b border-rule pb-3 text-ink">{group.category}</h2>
              <ul className="mt-1 divide-y divide-rule">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg text-ink">{item.name}</h3>
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.price && (
                      <span className="shrink-0 text-sm text-gold">{item.price}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
