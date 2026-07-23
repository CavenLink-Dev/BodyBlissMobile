import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServicesWithPricing, COMING_SOON_SERVICES } from "@/lib/catalogue";
import { ServiceIllustration } from "@/components/service-illustrations";
import { formatAud } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services & prices | Body Bliss Mobile Massage",
  description:
    "Mobile massage options and prices for Body Bliss across Adelaide. A vetted therapist comes to you.",
};

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
              <div
                key={s.id}
                className="group relative flex h-full flex-col overflow-hidden rounded border border-border bg-card shadow-rest transition-all duration-fade hover:shadow-md hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              >
                {/* Primary click target — whole card books */}
                <Link
                  href={`/book?service=${s.code}`}
                  aria-label={`Book ${s.name}`}
                  className="absolute inset-0 z-0 focus-visible:outline-none"
                  tabIndex={-1}
                />
                <ServiceIllustration code={s.code} />
                <div className="flex flex-1 flex-col gap-component p-card-padding pt-0">
                  <h3 className="font-heading text-title font-semibold text-bb-text-display group-hover:text-primary transition-colors duration-fade">
                    {s.name}
                  </h3>
                  <p className="flex-1 text-description text-bb-text-description">
                    {s.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {s.fromPriceCents != null && (
                      <span className="text-subtitle font-semibold text-bb-text-title">
                        From {formatAud(s.fromPriceCents)}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-compact text-nav font-medium text-primary">
                      Book
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-fade group-hover:translate-x-1" />
                    </span>
                  </div>
                  {/* Details link sits above the card-level booking link */}
                  <Link
                    href={`/services/${s.code}`}
                    aria-label={`Details about ${s.name}`}
                    className="relative z-10 text-caption text-bb-text-caption underline underline-offset-2 hover:text-primary transition-colors duration-fade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-fit"
                  >
                    View details
                  </Link>
                </div>
              </div>
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
              More Treatments Coming Soon
            </h2>
            <p className="max-w-prose text-description text-bb-text-description">
              We&apos;re expanding beyond massage. These mobile treatments are
              on the way — leave your email on any to be first to know.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-4">
            {COMING_SOON_SERVICES.map((s) => (
              <Link
                key={s.code}
                href={`/services/${s.code}`}
                className="group flex h-full flex-col overflow-hidden rounded border border-border bg-card shadow-rest transition-all duration-fade hover:shadow-md hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <ServiceIllustration code={s.code} />
                <div className="flex flex-1 flex-col gap-component p-card-padding pt-0">
                  <div className="flex items-start justify-between gap-component">
                    <h3 className="font-heading text-title font-semibold text-bb-text-display group-hover:text-primary transition-colors duration-fade">
                      {s.name}
                    </h3>
                    <Badge variant="outline" className="shrink-0">Soon</Badge>
                  </div>
                  <p className="flex-1 text-description text-bb-text-description">{s.description}</p>
                  <span className="inline-flex items-center gap-compact text-nav font-medium text-primary">
                    Learn more
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-fade group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
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
            <Button asChild variant="primary">
              <Link href="/book">Book Now</Link>
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}
