import { client } from "@/lib/client";
import { GOOGLE_REVIEWS_URL } from "@/lib/google-reviews";

export function ReviewGrid() {
  const reviews = client.reviews.filter((r) => r.text.trim().length > 0);

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

  return (
    <div className="habibi-review-grid-wrap">
      <p className="habibi-review-grid__stat">
        {client.rating?.toFixed(1) ?? "4.6"} · {count.toLocaleString()} Google reviews
      </p>
      <div className="habibi-review-grid">
        {reviews.map((review, i) => (
          <blockquote
            key={`${review.author}-${i}`}
            className={`habibi-review-grid__card habibi-review-grid__card--${(i % 5) + 1}`}
          >
            {review.rating != null && (
              <p className="habibi-review-stars" aria-label={`${review.rating} stars`}>
                {"★".repeat(review.rating)}
              </p>
            )}
            <p className="habibi-review-text">&ldquo;{review.text}&rdquo;</p>
            <footer className="habibi-review-author">{review.author}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
