import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & prices — Body Bliss Mobile Massage",
  description:
    "The mobile massage options offered by Body Bliss across Adelaide. Prices are announced when booking opens.",
};

/*
  Services — six MVP massages. Prices are a business decision gate, never
  invented; shown as "announced when booking opens" until the owner sets them.
*/

export default function ServicesPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <div className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Services &amp; Prices
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Every massage is delivered by a vetted therapist who comes to you.
            Prices are announced when booking opens.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.slug} className="flex h-full flex-col gap-component">
              <div className="flex items-center justify-between gap-component">
                <CardTitle className="text-subtitle">{s.name}</CardTitle>
                <Badge variant="secondary">{s.duration}</Badge>
              </div>
              <CardDescription className="flex-1">{s.blurb}</CardDescription>
              <div>
                <Button asChild variant="quiet">
                  <Link href="/book">Book this</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <section aria-labelledby="services-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="services-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Ready to book?
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Start with where you&apos;d like your massage, then choose your
              therapist.
            </p>
            <Button asChild variant="secondary">
              <Link href="/book">Book Now</Link>
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}
