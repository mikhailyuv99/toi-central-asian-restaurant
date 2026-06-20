export type DishGalleryCell = {
  src: string;
  label: string;
  span: string;
};

const MAPS = "/photos/maps";

/** TOI Google Maps scrape — each file used once. */
export const dishGallery: DishGalleryCell[] = [
  {
    src: `${MAPS}/photo-5.jpg`,
    label: "Laghman",
    span: "col-span-2 row-span-2 md:col-span-7 md:row-span-3",
  },
  {
    src: `${MAPS}/photo-40.jpg`,
    label: "Manti",
    span: "col-span-1 row-span-1 md:col-span-5 md:row-span-2",
  },
  {
    src: `${MAPS}/photo-35.jpg`,
    label: "Samsa",
    span: "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
  },
  {
    src: `${MAPS}/photo-55.jpg`,
    label: "Plov",
    span: "col-span-2 row-span-1 md:col-span-5 md:row-span-2",
  },
  {
    src: `${MAPS}/photo-10.jpg`,
    label: "Shorpa",
    span: "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
  },
  {
    src: `${MAPS}/photo-30.jpg`,
    label: "Baursak",
    span: "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  },
  {
    src: `${MAPS}/photo-60.jpg`,
    label: "Soup & bread",
    span: "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
  },
  {
    src: `${MAPS}/photo-45.jpg`,
    label: "Shared plates",
    span: "col-span-2 row-span-1 md:col-span-6 md:row-span-2",
  },
];
