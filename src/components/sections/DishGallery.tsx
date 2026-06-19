import Image from "next/image";
import { dishGallery } from "@/lib/dish-gallery";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function DishGallery() {
  return (
    <section id="gallery" className="bg-surface-muted py-14 md:py-20">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Reveal>
          <SectionLabel>From the kitchen</SectionLabel>
          <h2 className="font-serif mt-3 max-w-xl text-3xl font-semibold text-text md:text-4xl">
            What leaves the pass
          </h2>
          <p className="mt-4 max-w-lg text-base text-text-soft">
            Owner photography — each dish shot once, no stock substitutes.
          </p>
        </Reveal>

        <div className="mosaic mt-10">
          {dishGallery.map((cell, i) => (
            <div key={cell.src} className={cell.span}>
              <Reveal delay={i * 60}>
                <div className="group relative h-full min-h-[140px] overflow-hidden">
                  <Image
                    src={cell.src}
                    alt={cell.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 to-transparent px-3 pb-3 pt-10">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-surface">
                      {cell.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
