"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getDemoBooking,
  cancelDemoBooking,
  type DemoBooking,
} from "@/lib/demo-store";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — booking detail reads from browser storage; cancelling flips the
  stored status with a confirm step. REAL: Supabase bookings +
  booking_locations reads and the cancel_booking flow — DEMO-MODE.md §3.
*/

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const [booking, setBooking] = React.useState<DemoBooking | null | undefined>(
    undefined,
  );
  const [confirming, setConfirming] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);

  React.useEffect(() => {
    setBooking(getDemoBooking(params.id));
  }, [params.id]);

  if (booking === undefined) {
    return (
      <main className="px-page-inline py-page-block" aria-busy="true">
        <div className="mx-auto max-w-3xl">
          <p className="text-description text-bb-text-description" role="status">
            Loading booking…
          </p>
        </div>
      </main>
    );
  }

  if (booking === null) {
    return (
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-card-gap">
          <h1 className="font-heading text-title font-semibold text-bb-text-title">
            Booking not found
          </h1>
          <p className="text-description text-bb-text-description">
            We couldn&apos;t find this booking in this browser.
          </p>
          <Button asChild variant="secondary">
            <Link href="/account">Back to my account</Link>
          </Button>
        </div>
      </main>
    );
  }

  async function onCancel() {
    setCancelling(true);
    await new Promise((r) => setTimeout(r, 600)); // simulated round-trip
    cancelDemoBooking(booking!.id);
    setBooking(getDemoBooking(booking!.id));
    setCancelling(false);
    setConfirming(false);
  }

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-card-gap">
        <Link
          href="/account"
          className="inline-flex min-h-hit-target items-center text-nav font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← Back to my account
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            {booking.serviceName}
          </h1>
          <Badge variant="secondary">{statusLabel(booking.status)}</Badge>
        </div>

        <Card className="flex flex-col gap-card-gap">
          <Row label="Booking ref" value={booking.id} />
          <Row label="When" value={formatDateTime(`${booking.date}T${booking.time}`)} />
          <Row label="Length" value={`${booking.durationMinutes} min`} />
          <Row label="Location" value={booking.locationType} />
          <Row
            label="Address"
            value={`${booking.streetAddress}, ${booking.suburb} ${booking.postcode} SA`}
          />
          {booking.notes ? <Row label="Notes" value={booking.notes} /> : null}
          <Row label="Paid (test mode)" value={formatAud(booking.priceCents)} />
        </Card>

        {booking.status !== "cancelled" ? (
          <Card className="flex flex-col gap-component">
            <CardTitle className="text-subtitle">Manage booking</CardTitle>
            {confirming ? (
              <>
                <CardDescription>
                  Cancel this booking? This can&apos;t be undone.
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
                    onClick={() => setConfirming(false)}
                    className="w-full tablet:w-auto"
                  >
                    Keep booking
                  </Button>
                </div>
              </>
            ) : (
              <div>
                <Button type="button" variant="quiet" onClick={() => setConfirming(true)}>
                  Cancel this booking
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <Card role="status">
            <CardDescription>
              This booking has been cancelled. Nothing was charged (test mode).
            </CardDescription>
          </Card>
        )}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-compact border-b border-border pb-component last:border-0 last:pb-0 tablet:flex-row tablet:gap-card-gap">
      <span className="text-description font-medium capitalize text-bb-text-display tablet:w-40 tablet:shrink-0">
        {label}
      </span>
      <span className="whitespace-pre-line text-description text-bb-text-description">
        {value}
      </span>
    </div>
  );
}
