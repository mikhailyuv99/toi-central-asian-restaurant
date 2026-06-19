import { truncateReview } from "@/lib/copy";
import { densityPad, sectionDensity, topReviews } from "@/lib/sections";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Pattern E / D: narrow prose + pull quotes */
export function SocialProof() {
  const reviews = topReviews();
  const density = sectionDensity("social_proof");

  if (reviews.length < 2) return null;

  return (
    <section id="social-proof" className={`bg-surface ${densityPad[density]}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <SectionLabel>Reviews</SectionLabel>
        <h2 className="font-serif mt-3 text-3xl font-semibold text-text md:text-4xl">
          What guests say
        </h2>

        <ul className="mt-10 space-y-8 md:ml-[12%] md:max-w-2xl">
          {reviews.map((review, index) => (
            <li
              key={`${review.author}-${index}`}
              className={index % 2 === 1 ? "md:ml-8" : ""}
            >
              <blockquote>
                <p className="font-serif text-xl leading-relaxed text-text md:text-2xl">
                  &ldquo;{truncateReview(review.text)}&rdquo;
                </p>
                <footer className="mt-3 text-sm font-semibold text-text-soft">
                  — {review.author}
                  {review.rating != null && (
                    <span className="ml-2 text-accent">{review.rating}/5</span>
                  )}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
