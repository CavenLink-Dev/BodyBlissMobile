"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarPlus, Check, FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/toaster";
import { getDemoBooking, type DemoBooking } from "@/lib/demo-store";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — confirmation reads the booking from browser storage and says
  plainly that this was a test-mode checkout. REAL: Supabase booking read +
  payment receipt — DEMO-MODE.md §3–4.
*/

const NEXT_STEPS = [
  "Your therapist reviews your access and treatment notes before the day.",
  "You'll get a reminder the day before, and a message when your therapist is on the way.",
  "They arrive about 10 minutes early to set up the table, linen and music.",
  "Afterwards, you can rebook or leave a review from your account.",
];

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
        <div className="mx-auto flex max-w-md flex-col gap-card-gap" role="status" aria-label="Loading booking">
          <div className="h-10 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-32 animate-pulse rounded bg-muted" />
          <span className="sr-only">Loading your booking…</span>
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
            We couldn&apos;t find this booking in this browser, demo bookings
            are stored locally, so they don&apos;t follow you between devices.
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
            You&apos;re all set, your therapist will arrive with everything
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
            This was a demonstration checkout, no payment was taken and no
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
            Therapist: {booking.therapistName ?? "Matched by Body Bliss"}
          </CardDescription>
          <CardDescription>
            {booking.streetAddress}, {booking.suburb} {booking.postcode}
          </CardDescription>
          <div className="flex flex-col gap-compact border-t border-border pt-component text-description text-bb-text-description">
            <span className="flex justify-between">
              Massage <span>{formatAud(booking.priceCents)}</span>
            </span>
            {booking.travelFeeCents ? (
              <span className="flex justify-between">
                Travel fee <span>{formatAud(booking.travelFeeCents)}</span>
              </span>
            ) : null}
            {booking.discountCents ? (
              <span className="flex justify-between">
                Gift card or promo <span>−{formatAud(booking.discountCents)}</span>
              </span>
            ) : null}
            <span className="flex justify-between font-medium text-bb-text-display">
              Total paid (test mode){" "}
              <span>{formatAud(booking.totalCents ?? booking.priceCents)}</span>
            </span>
          </div>
          <p className="text-caption text-bb-text-caption">
            Booking ref: {booking.id}
          </p>
        </Card>

        <Card className="flex flex-col gap-component">
          <CardTitle className="text-subtitle">What happens next</CardTitle>
          <ul className="flex flex-col gap-component">
            {NEXT_STEPS.map((s) => (
              <li key={s} className="flex items-start gap-compact">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                <span className="text-description text-bb-text-description">{s}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-component">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() =>
              toast("Added to your calendar (simulated, this is a demonstration).")
            }
          >
            <CalendarPlus aria-hidden="true" className="size-5" />
            Add to Calendar
          </Button>
          <Button asChild variant="primary" className="w-full">
            <Link href={`/account/bookings/${booking.id}`}>Manage Booking</Link>
          </Button>
          <div className="flex flex-col gap-component tablet:flex-row">
            <Button asChild variant="quiet" className="w-full tablet:flex-1">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="quiet" className="w-full tablet:flex-1">
              <Link href="/help">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
