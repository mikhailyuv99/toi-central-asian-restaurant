"use client";

import { useEffect } from "react";
import { client } from "@/lib/client";

const MAPS_QUERY = encodeURIComponent(client.address);
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

type FindUsModalProps = {
  open: boolean;
  onClose: () => void;
};

export function FindUsModal({ open, onClose }: FindUsModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="habibi-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="habibi-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="find-us-title"
        aria-modal="true"
      >
        <button type="button" className="habibi-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="find-us-title" className="habibi-modal__title">
          Find us
        </h2>
        <p className="habibi-modal__address">{client.address}</p>
        <div className="habibi-modal__map">
          <iframe
            title="Habibi on Google Maps"
            src={`https://maps.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="habibi-modal__actions">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="habibi-hero__btn habibi-hero__btn--primary"
          >
            Open in GPS
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="habibi-hero__btn habibi-hero__btn--secondary"
          >
            Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
