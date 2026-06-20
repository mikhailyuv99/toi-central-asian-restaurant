import { client } from "./client";
import { allMenuItems } from "./copy";

export type GalleryCell = {
  src: string;
  span: string;
  alt: string;
};

const MOSAIC_SPANS = [
  "col-span-2 row-span-2 md:col-span-6 md:row-span-3",
  "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  "col-span-2 row-span-1 md:col-span-6 md:row-span-2",
] as const;

const ATMOSPHERE_MAX = 4;

function photoAt(index: number): string | null {
  return client.photos[index] ?? null;
}

export function getPhotoAllocation() {
  const hero = photoAt(0);
  const menuItems = allMenuItems();
  const menuPhotoIndices = new Set<number>();

  menuItems.forEach((item) => {
    if (item.photo?.startsWith("/photos/maps/") || item.photo?.startsWith("/photos/photo-")) {
      const idx = client.photos.indexOf(item.photo);
      if (idx >= 0) menuPhotoIndices.add(idx);
    }
  });

  const used = new Set<number>([0, 1, 2]);
  menuPhotoIndices.forEach((i) => used.add(i));

  const atmospherePhotos = client.photos
    .map((src, i) => ({ src, i }))
    .filter(({ i }) => !used.has(i))
    .map(({ src }) => src)
    .slice(0, ATMOSPHERE_MAX);

  const gallery: GalleryCell[] = atmospherePhotos.map((src, i) => ({
    src,
    span: MOSAIC_SPANS[i % MOSAIC_SPANS.length]!,
    alt: `${client.name} — dining room`,
  }));

  const inlinePhotos = atmospherePhotos.slice(0, 2);

  return { hero, ownerStory: null, gallery, inlinePhotos, atmospherePhotos };
}

export const photos = getPhotoAllocation();
