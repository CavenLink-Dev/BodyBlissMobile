import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

export const metadata: Metadata = {
  title: "Booking request sent — Body Bliss Mobile Massage",
  robots: { index: false },
};

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: booking } = await supabase
    .from("bookings")
    .select(
      "id, status, requested_start, location_type, service_name_snapshot, duration_minutes_snapshot, price_cents_snapshot",
    )
    .eq("id", id)
    .maybeSingle();

  if (!booking) {
    return (
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-md flex-col gap-card-gap">
          <h1 className="font-heading text-title font-semibold text-bb-text-title">
            Booking not found
          </h1>
          <p className="text-description text-bb-text-description">
            We couldn&apos;t find this booking. You may need to sign in.
          </p>
          <Button asChild variant="secondary">
            <Link href="/account">Go to my account</Link>
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
            Request Sent
          </h1>
          <p className="text-description text-bb-text-description">
            Thanks — your booking request is in. We&apos;ll confirm a therapist
            and the final price before any payment is taken.
          </p>
        </div>

        <Card className="flex flex-col gap-card-gap">
          <div className="flex items-center justify-between gap-component">
            <CardTitle className="text-subtitle">
              {booking.service_name_snapshot ?? "Massage booking"}
            </CardTitle>
            <Badge variant="secondary">{statusLabel(booking.status as string)}</Badge>
          </div>
          <CardDescription>
            {formatDateTime(booking.requested_start as string)}
            {booking.duration_minutes_snapshot
              ? ` · ${booking.duration_minutes_snapshot} min`
              : ""}
          </CardDescription>
          {booking.price_cents_snapshot != null ? (
            <p className="text-description text-bb-text-description">
              Indicative price:{" "}
              <span className="font-medium text-bb-text-display">
                {formatAud(booking.price_cents_snapshot as number)}
              </span>
            </p>
          ) : null}
        </Card>

        <Button asChild variant="secondary">
          <Link href="/account">View my bookings</Link>
        </Button>
      </div>
    </main>
  );
}
