import { client, phoneHref } from "@/lib/client";
import { densityPad } from "@/lib/sections";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Pattern I: overlap offset block */
export function PrivateDining() {
  const note = client.private_dining_note?.trim();
  if (!note) return null;

  return (
    <section id="private-dining" className={`bg-surface ${densityPad.open}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="relative md:mr-[10%] md:ml-auto md:w-[70%]">
          <div className="border-l-4 border-accent bg-surface-muted p-8 md:p-12">
            <SectionLabel>Groups</SectionLabel>
            <h2 className="font-serif mt-3 text-2xl font-semibold text-text md:text-3xl">
              Private dining
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-soft md:text-lg">
              {note}
            </p>
            <a
              href={`tel:${phoneHref}`}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-wider text-accent hover:underline"
            >
              Call to enquire →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
