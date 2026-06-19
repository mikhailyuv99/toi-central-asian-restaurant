import { client, phoneHref } from "@/lib/client";

export function Visit() {
  return (
    <section id="visit" className="border-t border-rule bg-ink py-16 text-cream md:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center md:text-left">
        <p className="label-caps text-gold-light">Visit</p>
        <h2 className="font-serif mt-4 text-3xl font-normal">An Thượng 26</h2>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-cream/75">
          <p>
            <a
              href={client.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-light"
            >
              {client.address}
            </a>
          </p>
          {client.hours?.map((h) => (
            <p key={h}>{h}</p>
          ))}
          <p>
            <a href={`tel:${phoneHref}`} className="text-gold-light hover:underline">
              {client.phone}
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          <a
            href={client.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps inline-flex min-h-11 items-center bg-cream px-6 text-ink"
          >
            Directions
          </a>
          <a
            href={`tel:${phoneHref}`}
            className="label-caps inline-flex min-h-11 items-center border border-cream/30 px-6"
          >
            Call
          </a>
        </div>
      </div>
    </section>
  );
}
