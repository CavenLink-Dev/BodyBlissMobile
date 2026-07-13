import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";
import { CancelBookingButton } from "@/components/booking/cancel-booking-button";

export const metadata: Metadata = { title: "Booking — Body Bliss Mobile Massage" };

const CANCELLABLE = ["requested", "matched", "confirmed"];

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select(
      "id, status, requested_start, location_type, customer_notes, service_name_snapshot, duration_minutes_snapshot, price_cents_snapshot",
    )
    .eq("id", id)
    .maybeSingle();

  if (!booking) notFound();

  // Owner can read the exact location via RLS.
  const { data: loc } = await supabase
    .from("booking_locations")
    .select("street_address, suburb, postcode, state, parking_notes, access_notes")
    .eq("booking_id", id)
    .maybeSingle();

  const status = booking.status as string;

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
            {booking.service_name_snapshot ?? "Massage booking"}
          </h1>
          <Badge variant="secondary">{statusLabel(status)}</Badge>
        </div>

        <Card className="flex flex-col gap-card-gap">
          <Row label="When" value={formatDateTime(booking.requested_start as string)} />
          {booking.duration_minutes_snapshot ? (
            <Row label="Length" value={`${booking.duration_minutes_snapshot} min`} />
          ) : null}
          <Row label="Location" value={String(booking.location_type)} />
          {loc ? (
            <Row
              label="Address"
              value={`${loc.street_address}, ${loc.suburb} ${loc.postcode} ${loc.state}`}
            />
          ) : null}
          {loc?.parking_notes ? <Row label="Parking" value={loc.parking_notes} /> : null}
          {loc?.access_notes ? <Row label="Access notes" value={loc.access_notes} /> : null}
          {booking.customer_notes ? (
            <Row label="Notes for therapist" value={booking.customer_notes as string} />
          ) : null}
          {booking.price_cents_snapshot != null ? (
            <Row
              label="Indicative price"
              value={formatAud(booking.price_cents_snapshot as number)}
            />
          ) : null}
        </Card>

        {CANCELLABLE.includes(status) ? (
          <Card className="flex flex-col gap-component">
            <CardTitle className="text-subtitle">Manage booking</CardTitle>
            <CancelBookingButton bookingId={id} />
          </Card>
        ) : null}
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-compact border-b border-border pb-component last:border-0 last:pb-0 tablet:flex-row tablet:gap-card-gap">
      <span className="text-description font-medium text-bb-text-display tablet:w-40 tablet:shrink-0 capitalize">
        {label}
      </span>
      <span className="whitespace-pre-line text-description text-bb-text-description">
        {value}
      </span>
    </div>
  );
}
