import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServicesWithPricing } from "@/lib/catalogue";
import { formatAud } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services & prices — Body Bliss Mobile Massage",
  description:
    "Mobile massage options and indicative prices for Body Bliss across Adelaide. A vetted therapist comes to you.",
};

// Live catalogue from Supabase; pricing is indicative until finalised.
export default async function ServicesPage() {
  const services = await getServicesWithPricing();

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <div className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Services &amp; Prices
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Every massage is delivered by a vetted therapist who comes to you.
          </p>
          <p className="text-caption text-bb-text-caption">
            Prices shown are indicative and confirmed before you pay. No hidden
            fees.
          </p>
        </div>

        {services.length === 0 ? (
          <Card>
            <CardDescription>
              Our services are being finalised and will appear here shortly.
            </CardDescription>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
            {services.map((s) => (
              <Card key={s.id} className="flex h-full flex-col gap-component">
                <div className="flex items-start justify-between gap-component">
                  <CardTitle className="text-subtitle">{s.name}</CardTitle>
                  {s.fromPriceCents != null ? (
                    <Badge variant="secondary">
                      from {formatAud(s.fromPriceCents)}
                    </Badge>
                  ) : null}
                </div>
                <CardDescription className="flex-1">
                  {s.description}
                </CardDescription>

                <ul className="flex flex-col gap-compact">
                  {s.variants.map((v) => (
                    <li
                      key={v.id}
                      className="flex items-center justify-between border-b border-border pb-compact text-description last:border-0 last:pb-0"
                    >
                      <span className="text-bb-text-description">
                        {v.durationMinutes} min
                      </span>
                      <span className="font-medium text-bb-text-display">
                        {formatAud(v.priceCents)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <Button asChild variant="secondary">
                    <Link href={`/book?service=${s.code}`}>Book Now</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <section aria-labelledby="services-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="services-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Ready to book?
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Start with your massage and where you&apos;d like it, then choose
              your therapist or let us match you.
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
