"use client";

import { client } from "@/lib/client";

export function ReviewCarousel() {
  const reviews = client.reviews.filter((r) => r.text.trim().length > 0);

  if (reviews.length === 0) {
    return (
      <div className="habibi-reviews-empty">
        <p className="habibi-reviews-rating">{client.rating ?? "n/a"} on Google Maps</p>
        <a
          href={client.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="habibi-reviews-maps-link"
        >
          Read reviews on Google
        </a>
      </div>
    );
  }

  const loop = [...reviews, ...reviews];

  return (
    <div className="habibi-reviews-track-wrap">
      <div className="habibi-reviews-track">
        {loop.map((review, i) => (
          <blockquote key={`${review.author}-${i}`} className="habibi-review-card">
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
