"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDemoBooking, type DemoBooking } from "@/lib/demo-store";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — confirmation reads the booking from browser storage and says
  plainly that this was a test-mode checkout. REAL: Supabase booking read +
  payment receipt — DEMO-MODE.md §3–4.
*/

export default function ConfirmationPage() {
  const params = useParams<{ id: string }>();
  const [booking, setBooking] = React.useState<DemoBooking | null | undefined>(
    undefined,
  );

  React.useEffect(() => {
    setBooking(getDemoBooking(params.id));
  }, [params.id]);

  if (booking === undefined) {
    return (
      <main className="px-page-inline py-page-block" aria-busy="true">
        <div className="mx-auto max-w-md">
          <p className="text-description text-bb-text-description" role="status">
            Loading your booking…
          </p>
        </div>
      </main>
    );
  }

  if (booking === null) {
    return (
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-md flex-col items-start gap-card-gap">
          <h1 className="font-heading text-title font-semibold text-bb-text-title">
            Booking not found
          </h1>
          <p className="text-description text-bb-text-description">
            We couldn&apos;t find this booking in this browser.
          </p>
          <Button asChild variant="secondary">
            <Link href="/book">Start a new booking</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-md flex-col gap-card-gap">
        <div className="flex flex-col items-start gap-component">
          <span
            className="inline-flex size-12 items-center justify-center rounded-full bg-secondary"
            aria-hidden="true"
          >
            <Check className="size-6 text-secondary-foreground" />
          </span>
          <h1 className="font-heading text-display text-bb-text-display">
            Booking Confirmed
          </h1>
          <p className="text-description text-bb-text-description">
            You&apos;re all set — your therapist will arrive with everything
            needed. A confirmation email would normally arrive shortly.
          </p>
        </div>

        <p
          className="flex items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description"
          role="note"
        >
          <FlaskConical aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <span>
            <span className="font-medium text-bb-text-display">Test mode.</span>{" "}
            This was a demonstration checkout — no payment was taken and no
            real booking was made.
          </span>
        </p>

        <Card className="flex flex-col gap-card-gap">
          <div className="flex items-center justify-between gap-component">
            <CardTitle className="text-subtitle">{booking.serviceName}</CardTitle>
            <Badge variant="secondary">{statusLabel(booking.status)}</Badge>
          </div>
          <CardDescription>
            {formatDateTime(`${booking.date}T${booking.time}`)} ·{" "}
            {booking.durationMinutes} min
          </CardDescription>
          <CardDescription>
            {booking.streetAddress}, {booking.suburb} {booking.postcode}
          </CardDescription>
          <p className="text-description text-bb-text-description">
            Paid (test mode):{" "}
            <span className="font-medium text-bb-text-display">
              {formatAud(booking.priceCents)}
            </span>
          </p>
          <p className="text-caption text-bb-text-caption">
            Booking ref: {booking.id}
          </p>
        </Card>

        <div className="flex flex-col gap-component tablet:flex-row">
          <Button asChild variant="secondary" className="w-full tablet:w-auto">
            <Link href="/account">View my bookings</Link>
          </Button>
          <Button asChild variant="quiet" className="w-full tablet:w-auto">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
