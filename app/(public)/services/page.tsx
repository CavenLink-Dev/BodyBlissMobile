import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServicesWithPricing, COMING_SOON_SERVICES } from "@/lib/catalogue";
import { formatAud } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services & prices | Body Bliss Mobile Massage",
  description:
    "Mobile massage options and prices for Body Bliss across Adelaide. A vetted therapist comes to you.",
};

// Catalogue from lib/catalogue (static in demo mode — see DEMO-MODE.md §6).
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
            Prices include travel, the massage table and all equipment. No
            hidden fees.
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
                  <CardTitle className="text-subtitle">
                    <Link
                      href={`/services/${s.code}`}
                      className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {s.name}
                    </Link>
                  </CardTitle>
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

                <div className="flex flex-wrap gap-component">
                  <Button asChild variant="secondary">
                    <Link href={`/book?service=${s.code}`}>Book Now</Link>
                  </Button>
                  <Button asChild variant="quiet">
                    <Link
                      href={`/services/${s.code}`}
                      aria-label={`Learn more about ${s.name}`}
                    >
                      Learn More
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Coming soon treatments */}
        <section aria-labelledby="coming-soon-heading" className="flex flex-col gap-card-gap">
          <div className="flex flex-col gap-compact">
            <h2
              id="coming-soon-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              More Treatments. Coming Soon
            </h2>
            <p className="max-w-prose text-description text-bb-text-description">
              We&apos;re expanding beyond massage. These mobile treatments are
              on the way.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
            {COMING_SOON_SERVICES.map((s) => (
              <Card key={s.code} className="flex h-full flex-col gap-component">
                <div className="flex items-start justify-between gap-component">
                  <CardTitle className="text-subtitle">
                    <Link
                      href={`/services/${s.code}`}
                      className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {s.name}
                    </Link>
                  </CardTitle>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                <CardDescription className="flex-1">{s.description}</CardDescription>
                <div>
                  <Button asChild variant="quiet" className="border border-border">
                    <Link href={`/services/${s.code}`} aria-label={`${s.name}, coming soon`}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

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
