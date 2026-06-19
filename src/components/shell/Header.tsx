"use client";

import { useEffect, useState } from "react";
import { client, phoneHref } from "@/lib/client";
import { primaryCta } from "@/lib/cta";

const anchorLinks = [
  { href: "#fusion", label: "Story", show: true },
  { href: "#menu-highlights", label: "Menu", show: true },
  { href: "#gallery", label: "Dishes", show: true },
  { href: "#atmosphere", label: "Room", show: client.photos.length > 1 },
  { href: "#visit", label: "Visit", show: true },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const links = anchorLinks.filter((l) => l.show);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerCta = primaryCta ?? {
    label: "Directions",
    href: client.maps_url,
    external: true,
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-surface/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 py-3.5 md:px-10">
        <a href="#" className="font-serif text-xl font-semibold text-text md:text-2xl">
          {client.name}
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-text-soft lg:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="min-h-11 leading-[2.75rem] hover:text-text">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={headerCta.href}
            {...(headerCta.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="hidden min-h-11 items-center bg-accent px-5 text-xs font-bold uppercase tracking-wider text-surface sm:inline-flex"
          >
            {headerCta.label}
          </a>
          <a
            href={`tel:${phoneHref}`}
            className="hidden min-h-11 items-center border border-text/15 px-4 text-xs font-bold uppercase tracking-wider text-text md:inline-flex"
          >
            Call
          </a>
          <button
            type="button"
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span className={`h-px w-6 bg-text transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-text transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-text transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-rule bg-surface px-5 py-6 lg:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block min-h-11 py-2 text-lg font-medium text-text"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="grid grid-cols-2 gap-2 pt-4">
              <a
                href={client.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center bg-accent text-xs font-bold uppercase tracking-wider text-surface"
                onClick={() => setOpen(false)}
              >
                Directions
              </a>
              <a
                href={`tel:${phoneHref}`}
                className="flex min-h-11 items-center justify-center border border-text/15 text-xs font-bold uppercase tracking-wider text-text"
                onClick={() => setOpen(false)}
              >
                Call
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
