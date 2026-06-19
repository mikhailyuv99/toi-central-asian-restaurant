import Image from "next/image";
import { client } from "@/lib/client";
import { getMenuHighlights, menuSectionNote, menuSectionTitle } from "@/lib/menu";
import { getMenuMode, densityPad, modules, sectionDensity } from "@/lib/sections";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Pattern C: editorial grid — varied cell sizes */
export function MenuHighlights() {
  const items = getMenuHighlights();
  const mode = getMenuMode();
  const density = sectionDensity("menu_highlights");
  const note = menuSectionNote();
  const leadLarge = mode === "menu" && items.length > 0;

  return (
    <section id="menu-highlights" className={`bg-surface ${densityPad[density]}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Menu</SectionLabel>
            <h2 className="font-serif mt-3 text-3xl font-semibold text-text md:text-4xl">
              {menuSectionTitle()}
            </h2>
          </div>
          {modules.fullMenuLink && client.menu_url && (
            <a
              href={client.menu_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-wider text-accent hover:underline"
            >
              Full menu PDF →
            </a>
          )}
        </div>

        {note && (
          <p className="mt-6 max-w-xl text-base text-text-soft">{note}</p>
        )}

        {items.length > 0 ? (
          <ul className="mt-10 grid gap-4 md:grid-cols-12 md:gap-5">
            {items.map((item, index) => {
              const isLead = leadLarge && index === 0;
              return (
                <li
                  key={`${item.name}-${index}`}
                  className={
                    isLead
                      ? "md:col-span-7 md:row-span-2"
                      : index % 3 === 1
                        ? "md:col-span-5"
                        : "md:col-span-4"
                  }
                >
                  <article
                    className={`flex h-full flex-col border border-rule bg-surface-muted/40 ${
                      isLead && item.photo ? "overflow-hidden" : "p-5 md:p-6"
                    }`}
                  >
                    {isLead && item.photo && (
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={item.photo}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className={isLead && item.photo ? "p-5 md:p-6" : ""}>
                      {item.category && (
                        <p className="text-xs font-bold uppercase tracking-wider text-accent">
                          {item.category}
                        </p>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <h3
                          className={`font-serif font-semibold text-text ${
                            isLead ? "text-2xl md:text-3xl" : "text-xl"
                          }`}
                        >
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="shrink-0 text-sm font-bold text-text">{item.price}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-text-soft md:text-base">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-8 text-base text-text-soft">
            Call {client.phone} for today&apos;s menu.
          </p>
        )}
      </div>
    </section>
  );
}
