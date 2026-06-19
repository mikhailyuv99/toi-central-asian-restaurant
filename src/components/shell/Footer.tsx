import { client, phoneHref } from "@/lib/client";
import { locationShort } from "@/lib/copy";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-dark text-surface">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-serif text-xl font-semibold">{client.name}</p>
          <p className="mt-1 text-sm text-surface/60">{locationShort()}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <a
            href={client.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-bright"
          >
            Directions
          </a>
          <a href={`tel:${phoneHref}`} className="hover:text-accent-bright">
            {client.phone}
          </a>
          {client.website && (
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-bright"
            >
              Website
            </a>
          )}
          {client.social_url && (
            <a
              href={client.social_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-bright"
            >
              Social
            </a>
          )}
        </div>
      </div>
      <p className="border-t border-surface/10 px-5 py-4 text-center text-xs text-surface/40 md:px-10">
        © {year} {client.name}
      </p>
    </footer>
  );
}
