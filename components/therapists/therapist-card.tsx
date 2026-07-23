"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import type { Therapist } from "@/lib/therapists";

/* Therapist card — minimal: portrait, name, gender and a short bio. */

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
        className ?? "size-16 text-title",
      )}
    >
      {therapist.name.slice(0, 1)}
    </span>
  );
}

export function TherapistCard({ therapist }: { therapist: Therapist }) {
  return (
    <Card className="flex h-full flex-col gap-component">
      <div className="flex items-center gap-component">
        <TherapistAvatar therapist={therapist} />
        <div className="flex min-w-0 flex-col gap-compact">
          <CardTitle className="text-subtitle">{therapist.name}</CardTitle>
          <p className="text-description capitalize text-bb-text-description">
            {therapist.gender}
          </p>
        </div>
      </div>

      <p className="flex-1 text-description text-bb-text-description">
        {therapist.shortBio}
      </p>

      <div>
        <Button asChild variant="primary">
          <Link
            href={`/book?therapist=${therapist.id}`}
            aria-label={`Select ${therapist.name} and start booking`}
          >
            Select Therapist
          </Link>
        </Button>
      </div>
    </Card>
  );
}
