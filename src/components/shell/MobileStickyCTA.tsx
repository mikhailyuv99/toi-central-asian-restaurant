import { client, phoneHref } from "@/lib/client";

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-rule bg-surface/95 backdrop-blur-md md:hidden">
      <a
        href={client.maps_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[3.25rem] items-center justify-center bg-accent text-xs font-bold uppercase tracking-wider text-surface"
      >
        Directions
      </a>
      <a
        href={`tel:${phoneHref}`}
        className="flex min-h-[3.25rem] items-center justify-center border-l border-rule text-xs font-bold uppercase tracking-wider text-text"
      >
        Call
      </a>
    </div>
  );
}
