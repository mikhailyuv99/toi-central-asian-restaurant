import type { Review } from "@/lib/client";

const BLOCKED = [
  /worst experience/i,
  /\braw food\b/i,
  /undercooked/i,
  /burnt items/i,
  /only thing that bothered/i,
  /smoke from the tandir/i,
  /smoke from the tandoor/i,
  /negative reviews/i,
];

/** Drop mis-scraped or mixed reviews; keep only clearly positive quotes. */
export function isPositiveReview(review: Review): boolean {
  if (!review.text.trim()) return false;
  if (review.rating != null && review.rating < 4) return false;
  return !BLOCKED.some((re) => re.test(review.text));
}

export function positiveReviews(reviews: Review[]): Review[] {
  return reviews.filter(isPositiveReview);
}
