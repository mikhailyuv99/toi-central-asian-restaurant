import Image from "next/image";
import { client } from "@/lib/client";
import { truncateReview } from "@/lib/copy";
import { photos } from "@/lib/photos";
import {
  atmosphereMode,
  densityPad,
  mergeSocialProofIntoAtmosphere,
  sectionDensity,
  topReviews,
} from "@/lib/sections";
import { PullQuote, SectionLabel } from "@/components/ui/SectionLabel";

/** Pattern H: mosaic, E: narrow prose, or inline for few photos */
export function Atmosphere() {
  const mode = atmosphereMode();
  const density = sectionDensity("atmosphere");
  const mergedReview = mergeSocialProofIntoAtmosphere() ? topReviews()[0] : null;

  return (
    <section id="atmosphere" className={`bg-surface-muted ${densityPad[density]}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <SectionLabel>Atmosphere</SectionLabel>
        <h2 className="font-serif mt-3 max-w-xl text-3xl font-semibold text-text md:text-4xl">
          Neon patio, woven lamps, and a room that doesn&apos;t pick a side
        </h2>
        <p className="mt-4 max-w-lg text-base text-text-soft">
          Covered tables on An Thượng 26 — open late, lit like a night out.
        </p>

        {mode === "mosaic" && photos.gallery.length > 0 && (
          <div className="mosaic mt-10">
            {photos.gallery.map((cell) => (
              <div key={cell.src} className={`relative overflow-hidden ${cell.span}`}>
                <Image
                  src={cell.src}
                  alt={cell.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {mode === "inline" && photos.inlinePhotos.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {photos.inlinePhotos.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3] md:row-span-2 md:aspect-auto md:min-h-[22rem]" : "aspect-[4/3]"}`}
              >
                <Image
                  src={src}
                  alt={`${client.name} dining room`}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {mode === "prose" && mergedReview && (
          <div className="mt-10 max-w-2xl">
            <PullQuote
              text={truncateReview(mergedReview.text)}
              author={mergedReview.author}
            />
          </div>
        )}

        {photos.atmospherePhotos.length === 0 && !mergedReview && (
          <p className="mt-6 max-w-lg text-base text-text-soft">
            Photos from the dining room will be added when available.
          </p>
        )}
      </div>
    </section>
  );
}
