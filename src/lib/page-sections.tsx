import type { ReactElement } from "react";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { DishGallery } from "@/components/sections/DishGallery";
import { FusionIntro } from "@/components/sections/FusionIntro";
import { FullMenu } from "@/components/sections/FullMenu";
import { Hero } from "@/components/sections/Hero";
import { Visit } from "@/components/sections/Visit";
import { strategy, type SectionId } from "@/lib/client";

function shouldRender(id: SectionId): boolean {
  switch (id) {
    case "hero":
    case "menu-highlights":
    case "atmosphere":
    case "visit":
    case "footer":
      return true;
    default:
      return false;
  }
}

const sectionMap: Record<SectionId, () => ReactElement | null> = {
  hero: () => <Hero />,
  "owner-story": () => null,
  "menu-highlights": () => <FullMenu />,
  atmosphere: () => <Atmosphere />,
  "social-proof": () => null,
  faq: () => null,
  "private-dining": () => null,
  visit: () => <Visit />,
  footer: () => null,
};

export function MainSections() {
  let fusionShown = false;
  let galleryShown = false;

  return (
    <>
      {strategy.section_order.map((entry) => {
        if (entry.id === "footer" || !shouldRender(entry.id)) return null;

        const blocks: ReactElement[] = [];

        if (entry.id === "hero" && !fusionShown) {
          blocks.push(<Hero key="hero" />);
          blocks.push(<FusionIntro key="fusion" />);
          fusionShown = true;
          return blocks;
        }

        if (entry.id === "menu-highlights") {
          blocks.push(<div key="menu">{sectionMap["menu-highlights"]()}</div>);
          if (!galleryShown) {
            blocks.push(<DishGallery key="gallery" />);
            galleryShown = true;
          }
          return blocks;
        }

        const render = sectionMap[entry.id];
        return <div key={entry.id}>{render()}</div>;
      })}
    </>
  );
}
