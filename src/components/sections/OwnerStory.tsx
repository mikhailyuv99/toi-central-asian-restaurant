import Image from "next/image";
import { client } from "@/lib/client";
import { photos } from "@/lib/photos";
import { densityPad, sectionDensity } from "@/lib/sections";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Pattern I: overlap — owner/family narrative */
export function OwnerStory() {
  const density = sectionDensity("hero");
  const story = client.owner_story;
  if (!story) return null;

  return (
    <section className={`relative bg-surface-muted ${densityPad[density]}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="relative md:ml-[8%] md:w-[72%]">
          {photos.ownerStory && (
            <div className="relative mb-8 aspect-[16/10] md:absolute md:-right-[18%] md:top-8 md:mb-0 md:w-[45%]">
              <Image
                src={photos.ownerStory}
                alt={client.owner_name ? `${client.owner_name} at ${client.name}` : client.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="relative z-10 bg-surface p-8 shadow-sm md:max-w-xl md:p-12">
            <SectionLabel>{client.owner_name ? `Meet ${client.owner_name}` : "Our story"}</SectionLabel>
            <p className="font-serif mt-4 text-2xl font-semibold leading-snug text-text md:text-3xl">
              {client.owner_name ? `${client.owner_name}'s kitchen` : client.name}
            </p>
            <p className="mt-5 text-base leading-relaxed text-text-soft md:text-lg">{story}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
