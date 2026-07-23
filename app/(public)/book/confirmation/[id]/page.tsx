"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarPlus, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/toaster";
import {
  getDemoBooking,
  cancelDemoBooking,
  type DemoBooking,
} from "@/lib/demo-store";
import { formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

/*
  Booking success screen. Kept deliberately simple: a popping gold tick, one
  summary card, what happens next, and the few actions people actually
  need, including cancelling the booking they just made. DEMO MODE: reads
  and updates browser storage only.
*/

const NEXT_STEPS = [
  "Your therapist reviews your notes before the day.",
  "You get a reminder the day before, and a message when your therapist is on the way.",
  "They arrive about 10 minutes early to set everything up.",
];

export default function ConfirmationPage() {
  const params = useParams<{ id: string }>();
  const [booking, setBooking] = React.useState<DemoBooking | null | undefined>(
    undefined,
  );
  const [confirmingCancel, setConfirmingCancel] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);

  React.useEffect(() => {
    setBooking(getDemoBooking(params.id));
  }, [params.id]);

  async function onCancel() {
    setCancelling(true);
    await new Promise((r) => setTimeout(r, 600)); // simulated round-trip
    cancelDemoBooking(booking!.id);
    setBooking(getDemoBooking(booking!.id));
    setCancelling(false);
    setConfirmingCancel(false);
    toast("Booking cancelled. Nothing was charged (test mode).");
  }

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
            We couldn&apos;t find this booking in this browser. Demo bookings
            are stored locally, so they don&apos;t follow you between devices.
          </p>
          <Button asChild variant="primary">
            <Link href="/book">Start a new booking</Link>
          </Button>
        </div>
      </main>
    );
  }

  const cancelled = booking.status === "cancelled";

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-md flex-col gap-card-gap">
        {/* Success header */}
        <div className="flex flex-col items-center gap-component text-center">
          <span
            className="bb-anim-pop inline-flex size-20 items-center justify-center rounded-full bg-secondary shadow-rest"
            aria-hidden="true"
          >
            <Check className="size-10 text-secondary-foreground" strokeWidth={3} />
          </span>
          <h1 className="font-heading text-display text-bb-text-display">
            {cancelled ? "Booking Cancelled" : "You're Booked"}
          </h1>
          <p className="max-w-prose text-description text-bb-text-description">
            {cancelled
              ? "This booking has been cancelled and nothing was charged (test mode). You can rebook any time."
              : `${booking.serviceName}, ${formatDateTime(`${booking.date}T${booking.time}`)}. A confirmation email would normally arrive shortly.`}
          </p>
        </div>

        {/* Summary */}
        <Card className="flex flex-col gap-component">
          <div className="flex items-center justify-between gap-component">
            <CardTitle className="text-subtitle">{booking.serviceName}</CardTitle>
            <span className="text-description font-medium text-bb-text-display">
              {booking.durationMinutes} min
            </span>
          </div>
          <CardDescription>
            {formatDateTime(`${booking.date}T${booking.time}`)}
          </CardDescription>
          <CardDescription>
            {booking.therapistName ?? "Matched by Body Bliss"}
          </CardDescription>
          <CardDescription>
            {booking.streetAddress}, {booking.suburb} {booking.postcode}
          </CardDescription>
          <div className="flex items-center justify-between border-t border-border pt-component">
            <span className="text-description text-bb-text-description">
              Total paid (test mode)
            </span>
            <span className="font-heading text-subtitle font-semibold text-bb-text-display">
              {formatAud(booking.totalCents ?? booking.priceCents)}
            </span>
          </div>
          <p className="text-caption text-bb-text-caption">
            Booking ref: {booking.id}
          </p>
        </Card>

        {!cancelled ? (
          <>
            {/* What happens next */}
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

            {/* Actions */}
            <div className="flex flex-col gap-component">
              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={() =>
                  toast("Calendar event created.")
                }
              >
                <CalendarPlus aria-hidden="true" className="size-5" />
                Add to Calendar
              </Button>
              <Button asChild variant="soft" className="w-full">
                <Link href={`/account/bookings/${booking.id}`}>Manage Booking</Link>
              </Button>
              <Button asChild variant="quiet" className="w-full">
                <Link href="/">Return Home</Link>
              </Button>
            </div>

            {/* Cancel, right here */}
            <Card className="flex flex-col gap-component">
              {confirmingCancel ? (
                <>
                  <CardDescription>
                    Cancel this booking? It&apos;s free until your therapist is
                    on the way, and this can&apos;t be undone.
                  </CardDescription>
                  <div className="flex flex-col gap-component tablet:flex-row">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cancelling}
                      onClick={onCancel}
                      className="w-full tablet:w-auto"
                    >
                      {cancelling ? "Cancelling…" : "Yes, cancel booking"}
                    </Button>
                    <Button
                      type="button"
                      variant="quiet"
                      disabled={cancelling}
                      onClick={() => setConfirmingCancel(false)}
                      className="w-full tablet:w-auto"
                    >
                      Keep booking
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-description text-bb-text-description">
                  Plans changed?{" "}
                  <button
                    type="button"
                    onClick={() => setConfirmingCancel(true)}
                    className="font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Cancel this booking
                  </button>{" "}
                  free of charge.
                </p>
              )}
            </Card>
          </>
        ) : (
          <div className="flex flex-col gap-component">
            <Button asChild variant="primary" className="w-full">
              <Link href={`/book?service=${booking.serviceCode}`}>Rebook This Massage</Link>
            </Button>
            <Button asChild variant="quiet" className="w-full">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        )}

      </div>
    </main>
  );
}
