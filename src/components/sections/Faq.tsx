import { client } from "@/lib/client";
import { densityPad } from "@/lib/sections";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Pattern F: inset feature */
export function Faq() {
  if (client.faq.length < 2) return null;

  return (
    <section id="faq" className={`bg-surface-muted ${densityPad.medium}`}>
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <div className="mx-auto max-w-2xl border border-rule bg-surface p-8 md:p-12">
          <SectionLabel>Questions</SectionLabel>
          <h2 className="font-serif mt-3 text-2xl font-semibold text-text md:text-3xl">
            Before you visit
          </h2>
          <dl className="mt-8 space-y-6">
            {client.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-text">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-soft md:text-base">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
