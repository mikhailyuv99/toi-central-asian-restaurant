export type DishGalleryCell = {
  src: string;
  label: string;
  span: string;
};

/** Owner-provided dish photography — each file used once. */
export const dishGallery: DishGalleryCell[] = [
  {
    src: "/photos/owner/khachapuri.jpg",
    label: "Khachapuri",
    span: "col-span-2 row-span-2 md:col-span-7 md:row-span-3",
  },
  {
    src: "/photos/owner/khinkali.jpg",
    label: "Khinkali",
    span: "col-span-1 row-span-1 md:col-span-5 md:row-span-2",
  },
  {
    src: "/photos/owner/meze-platter.jpg",
    label: "Meze platter",
    span: "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
  },
  {
    src: "/photos/owner/chicken-kebab.jpg",
    label: "Chicken kebab",
    span: "col-span-2 row-span-1 md:col-span-5 md:row-span-2",
  },
  {
    src: "/photos/owner/borscht.jpg",
    label: "Borscht",
    span: "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
  },
  {
    src: "/photos/owner/cheburek.jpg",
    label: "Cheburek",
    span: "col-span-1 row-span-1 md:col-span-3 md:row-span-2",
  },
  {
    src: "/photos/owner/pelmeni.jpg",
    label: "Pelmeni",
    span: "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
  },
  {
    src: "/photos/owner/shawarma.jpg",
    label: "Shawarma wrap",
    span: "col-span-2 row-span-1 md:col-span-6 md:row-span-2",
  },
];
