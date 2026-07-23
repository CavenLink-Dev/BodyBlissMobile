import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SuburbChecker } from "@/components/suburb-checker";
import { SERVICE_AREAS, ZONE_LABELS, TRAVEL_FEES_CENTS, type AreaZone } from "@/lib/service-areas";
import { formatAud } from "@/lib/format";

export const metadata: Metadata = {
  title: "Service areas | Body Bliss Mobile Massage",
  description:
    "The Adelaide suburbs Body Bliss mobile massage therapists visit, including travel-fee areas and selected Adelaide Hills suburbs.",
};

const ZONES: AreaZone[] = ["core", "extended", "hills"];

export default function AreasPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <header className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Where We Go
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Body Bliss therapists visit homes, hotels and workplaces across the
            Adelaide metro area, with selected Adelaide Hills suburbs available
            for a small travel fee.
          </p>
        </header>

        <SuburbChecker />

        {ZONES.map((zone) => {
          const areas = SERVICE_AREAS.filter((a) => a.zone === zone);
          return (
            <section
              key={zone}
              aria-labelledby={`zone-${zone}-heading`}
              className="flex flex-col gap-card-gap"
            >
              <div className="flex flex-col gap-compact">
                <h2
                  id={`zone-${zone}-heading`}
                  className="font-heading text-title font-semibold text-bb-text-title"
                >
                  {zone === "core"
                    ? "Adelaide Metro"
                    : zone === "extended"
                      ? "Outer Metro"
                      : "Adelaide Hills"}
                </h2>
                <p className="text-description text-bb-text-description">
                  {ZONE_LABELS[zone]}
                  {TRAVEL_FEES_CENTS[zone] > 0
                    ? ` (${formatAud(TRAVEL_FEES_CENTS[zone])}, shown before you pay)`
                    : ""}
                  .
                </p>
              </div>
              <ul className="flex flex-wrap gap-compact">
                {areas.map((a) => (
                  <li
                    key={`${a.suburb}-${a.postcode}`}
                    className="inline-flex items-center gap-compact rounded-full border border-border bg-card px-3 py-1.5 text-description text-bb-text-description"
                  >
                    <MapPin aria-hidden="true" className="size-4 text-primary" />
                    {a.suburb} {a.postcode}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section aria-labelledby="areas-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="areas-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Not On The List?
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              We&apos;re expanding as more therapists join. For group bookings
              outside our usual area, contact support and we&apos;ll see what we
              can arrange.
            </p>
            <div className="flex flex-col gap-component tablet:flex-row">
              <Button asChild variant="primary" className="w-full tablet:w-auto">
                <Link href="/book">Book Now</Link>
              </Button>
              <Button
                asChild
                variant="soft"
                className="w-full tablet:w-auto"
              >
                <Link href="/help">Contact Support</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
