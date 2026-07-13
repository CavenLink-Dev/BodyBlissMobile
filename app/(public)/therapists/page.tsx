import type { Metadata } from "next";
import Link from "next/link";
import { Star, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { THERAPISTS_SAMPLE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Therapists — Body Bliss Mobile Massage",
  description:
    "Every Body Bliss mobile massage therapist is qualified and vetted before they can take bookings.",
};

/*
  Therapists — every therapist is vetted before taking bookings. Profiles
  below are illustrative sample content (no surnames, phone numbers or home
  suburbs are ever shown, matching the database privacy model). Real,
  consented profiles replace these when booking opens.
*/

export default function TherapistsPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <div className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Our Therapists
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Every therapist is qualified and vetted before they can take a
            booking. When you book, you can let us match you or choose a
            therapist yourself.
          </p>
          <p className="text-caption text-bb-text-caption">
            Sample profiles shown for layout — real therapist profiles appear
            here when booking opens.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
          {THERAPISTS_SAMPLE.map((t) => (
            <Card key={t.id} className="flex h-full flex-col gap-component">
              <div className="flex items-center justify-between gap-component">
                <CardTitle className="text-subtitle">{t.firstName}</CardTitle>
                <span className="inline-flex items-center gap-1 text-description text-bb-text-description">
                  <Star aria-hidden="true" className="size-4 fill-bb-star text-bb-star" />
                  {t.rating.toFixed(1)}
                </span>
              </div>
              <CardDescription className="flex-1">{t.headline}</CardDescription>
              <span className="inline-flex items-center gap-compact text-description text-success">
                <BadgeCheck aria-hidden="true" className="size-5" />
                {t.experience}
              </span>
              <div className="flex flex-wrap gap-compact">
                {t.focus.map((f) => (
                  <Badge key={f} variant="secondary">
                    {f}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <section aria-labelledby="therapists-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="therapists-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Book with a therapist
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Let us match you with the best available therapist, or choose one
              yourself during booking.
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
