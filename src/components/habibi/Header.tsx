"use client";

import { useEffect, useState } from "react";
import { client, phoneHref } from "@/lib/client";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
] as const;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        solid ? "border-rule bg-cream/95 backdrop-blur-md" : "border-transparent bg-cream"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-serif text-xl text-ink">
          Habibi
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label-caps text-muted hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={client.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps border border-ink/15 px-4 py-2 text-ink"
          >
            Directions
          </a>
        </nav>

        <button
          type="button"
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-px w-5 bg-ink transition-all ${
                open && i === 0 ? "translate-y-[5px] rotate-45" : ""
              } ${open && i === 1 ? "opacity-0" : ""} ${
                open && i === 2 ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          ))}
        </button>
      </div>

      {open && (
        <nav className="border-t border-rule px-6 py-6 md:hidden" aria-label="Mobile">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block font-serif text-2xl"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`tel:${phoneHref}`} className="text-gold" onClick={() => setOpen(false)}>
                {client.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
