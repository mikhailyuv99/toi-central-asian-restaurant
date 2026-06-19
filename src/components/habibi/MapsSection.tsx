import { client } from "@/lib/client";
import { ContactForm } from "./ContactForm";
import { MapsSectionClient } from "./MapsSectionClient";

const MAPS_QUERY = encodeURIComponent(client.address);
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

export function MapsSection() {
  return (
    <section className="habibi-maps" id="find-us" aria-labelledby="maps-heading">
      <div className="habibi-maps__inner">
        <MapsSectionClient
          address={client.address}
          directionsUrl={DIRECTIONS_URL}
          mapsQuery={MAPS_QUERY}
        />
        <div className="habibi-maps__col habibi-maps__col--form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
