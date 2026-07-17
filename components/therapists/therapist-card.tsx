"use client";

import * as React from "react";
import Link from "next/link";
import { BadgeCheck, ChevronDown, Languages, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Therapist } from "@/lib/therapists";
import { SERVICES } from "@/lib/catalogue";

/*
  Therapist card — fictional sample profiles (labelled). Compact by
  default; "View profile" expands the full biography and details in place,
  so no extra routes are needed and the page stays calm on a phone.
*/

function serviceName(code: string): string {
  return SERVICES.find((s) => s.code === code)?.name.replace(" Massage", "") ?? code;
}

export function TherapistAvatar({
  therapist,
  className,
}: {
  therapist: Therapist;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`Portrait placeholder for ${therapist.name}`}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-secondary font-heading font-semibold text-secondary-foreground",
        className ?? "size-14 text-subtitle",
      )}
    >
      {therapist.name.slice(0, 1)}
    </span>
  );
}

export function TherapistCard({
  therapist,
  defaultExpanded = false,
}: {
  therapist: Therapist;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const detailsId = `therapist-${therapist.id}-details`;

  return (
    <Card className="flex h-full flex-col gap-component">
      <div className="flex items-start gap-component">
        <TherapistAvatar therapist={therapist} />
        <div className="flex min-w-0 flex-1 flex-col gap-compact">
          <div className="flex flex-wrap items-center gap-compact">
            <CardTitle className="text-subtitle">{therapist.name}</CardTitle>
            <Badge variant="secondary" className="gap-1">
              <BadgeCheck aria-hidden="true" className="size-3.5" />
              Approved
            </Badge>
          </div>
          <p className="flex items-center gap-compact text-description text-bb-text-description">
            <Star aria-hidden="true" className="size-4 fill-bb-star text-bb-star" />
            <span className="font-medium text-bb-text-display">
              {therapist.rating.toFixed(1)}
            </span>
            ({therapist.reviewCount} sample reviews) ·{" "}
            {therapist.completedBookings.toLocaleString("en-AU")} bookings
          </p>
        </div>
      </div>

      <ul className="flex flex-wrap gap-compact" aria-label="Specialities">
        {therapist.specialties.map((s) => (
          <li
            key={s}
            className="inline-flex items-center rounded-full border border-border bg-cream px-2.5 py-0.5 text-caption text-bb-text-description"
          >
            {serviceName(s)}
          </li>
        ))}
      </ul>

      <p className="text-description text-bb-text-description">
        {therapist.shortBio}
      </p>

      <p className="flex flex-wrap items-center gap-x-card-gap gap-y-compact text-caption text-bb-text-caption">
        <span>{therapist.yearsExperience} yrs experience</span>
        <span className="inline-flex items-center gap-1">
          <Languages aria-hidden="true" className="size-3.5" />
          {therapist.languages.join(", ")}
        </span>
      </p>

      {expanded ? (
        <div id={detailsId} className="flex flex-col gap-component border-t border-border pt-component">
          <p className="text-description text-bb-text-description">{therapist.bio}</p>
          <dl className="grid grid-cols-1 gap-compact text-description tablet:grid-cols-2">
            <div>
              <dt className="font-medium text-bb-text-display">Pressure styles</dt>
              <dd className="capitalize text-bb-text-description">
                {therapist.pressure.join(", ")}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-bb-text-display">Usually available</dt>
              <dd className="text-bb-text-description">
                {therapist.availability.join(" · ")}
              </dd>
            </div>
          </dl>
          <p className="text-caption text-bb-text-caption">
            Sample profile for demonstration — ratings, reviews and booking
            counts are illustrative.
          </p>
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap gap-component pt-compact">
        <Button asChild variant="secondary">
          <Link
            href={`/book?therapist=${therapist.id}`}
            aria-label={`Select ${therapist.name} and start booking`}
          >
            Select Therapist
          </Link>
        </Button>
        <Button
          type="button"
          variant="quiet"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Hide profile" : "View profile"}
          <ChevronDown
            aria-hidden="true"
            className={cn("transition-transform duration-fade", expanded && "rotate-180")}
          />
        </Button>
      </div>
    </Card>
  );
}
