"use client";

import { client, type Review } from "@/lib/client";
import { GOOGLE_REVIEWS_URL } from "@/lib/google-reviews";
import { positiveReviews } from "@/lib/positive-reviews";

function ReviewCard({ review }: { review: Review }) {
  return (
    <blockquote className="habibi-review-carousel__card">
      {review.rating != null && review.rating > 0 && (
        <p className="habibi-review-stars" aria-label={`${review.rating} stars`}>
          {"★".repeat(review.rating)}
        </p>
      )}
      <p className="habibi-review-text">&ldquo;{review.text}&rdquo;</p>
      <footer className="habibi-review-author">{review.author}</footer>
    </blockquote>
  );
}

function CarouselRow({
  reviews,
  direction,
  speedClass,
}: {
  reviews: Review[];
  direction: "ltr" | "rtl";
  speedClass: string;
}) {
  if (reviews.length === 0) return null;
  const loop = [...reviews, ...reviews];

  return (
    <div className={`habibi-review-carousel__row habibi-review-carousel__row--${direction}`}>
      <div className={`habibi-review-carousel__track ${speedClass}`}>
        {loop.map((review, i) => (
          <ReviewCard key={`${review.author}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function ReviewCarouselRows() {
  const reviews = positiveReviews(client.reviews);

  if (reviews.length === 0) {
    return (
      <div className="habibi-reviews-empty">
        <p className="habibi-reviews-rating">{client.rating ?? "4.6"} on Google Maps</p>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="habibi-reviews-maps-link"
        >
          Read reviews on Google
        </a>
      </div>
    );
  }

  const count = client.review_count ?? reviews.length;
  const rowSize = Math.ceil(reviews.length / 3);
  const row1 = reviews.slice(0, rowSize);
  const row2 = reviews.slice(rowSize, rowSize * 2);
  const row3 = reviews.slice(rowSize * 2);

  return (
    <div className="habibi-review-carousel">
      <p className="habibi-review-carousel__stat">
        {client.rating?.toFixed(1) ?? "4.6"} · {count.toLocaleString()} Google reviews
      </p>
      <CarouselRow reviews={row1} direction="ltr" speedClass="habibi-review-carousel__track--slow" />
      <CarouselRow reviews={row2} direction="rtl" speedClass="habibi-review-carousel__track--mid" />
      <CarouselRow reviews={row3} direction="ltr" speedClass="habibi-review-carousel__track--slow" />
    </div>
  );
}
