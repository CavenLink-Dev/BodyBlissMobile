import type { Metadata } from "next";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = { title: "Services & prices — Body Bliss Mobile Massage" };

/*
  Six approved MVP services. Prices are a business decision gate — never
  invented; shown as "to be announced" until the owner sets them.
*/

const SERVICES = [
  { name: "Relaxation massage", blurb: "Gentle, calming massage to unwind." },
  { name: "Deep tissue massage", blurb: "Firmer massage working on deeper muscle tension." },
  { name: "Pregnancy massage", blurb: "Massage adapted for pregnancy, with suitably experienced therapists." },
  { name: "Couples massage", blurb: "Two massages, one after the other, at your place." },
  { name: "Hotel massage", blurb: "In-room massage for hotel stays in Adelaide." },
  { name: "Corporate chair massage", blurb: "Seated massage for workplaces and events." },
] as const;

export default function ServicesPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <div className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Services &amp; Prices
          </h1>
          <p className="max-w-prose text-description text-bb-text-description">
            Prices will be announced when booking opens.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.name}>
              <CardTitle>{s.name}</CardTitle>
              <CardDescription>{s.blurb}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
