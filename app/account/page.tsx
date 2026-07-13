import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMyBookings, getMyAddresses, type MyBooking } from "@/lib/account";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

export const metadata: Metadata = { title: "My account — Body Bliss Mobile Massage" };

function BookingRow({ booking }: { booking: MyBooking }) {
  return (
    <Card className="flex flex-col gap-compact">
      <div className="flex items-start justify-between gap-component">
        <CardTitle className="text-subtitle">
          {booking.serviceName ?? "Massage booking"}
        </CardTitle>
        <Badge variant="secondary">{statusLabel(booking.status)}</Badge>
      </div>
      <p className="flex items-center gap-compact text-description text-bb-text-description">
        <CalendarClock aria-hidden="true" className="size-4" />
        {formatDateTime(booking.requestedStart)}
        {booking.durationMinutes ? ` · ${booking.durationMinutes} min` : ""}
      </p>
      <div className="flex items-center justify-between gap-component">
        <span className="text-description text-bb-text-description capitalize">
          {booking.locationType}
        </span>
        {booking.priceCents != null ? (
          <span className="text-description font-medium text-bb-text-display">
            {formatAud(booking.priceCents)}
          </span>
        ) : null}
      </div>
      <div>
        <Button asChild variant="quiet">
          <Link href={`/account/bookings/${booking.id}`}>View booking</Link>
        </Button>
      </div>
    </Card>
  );
}

export default async function AccountPage() {
  const [{ upcoming, past }, addresses] = await Promise.all([
    getMyBookings(),
    getMyAddresses(),
  ]);

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-section">
        <div className="flex flex-wrap items-center justify-between gap-component">
          <h1 className="font-heading text-display text-bb-text-display">My Account</h1>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="quiet">
              Sign out
            </Button>
          </form>
        </div>

        {/* Upcoming */}
        <section className="flex flex-col gap-card-gap" aria-labelledby="upcoming-heading">
          <h2
            id="upcoming-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Upcoming Bookings
          </h2>
          {upcoming.length === 0 ? (
            <Card className="flex flex-col items-start gap-component">
              <CardDescription>You have no upcoming bookings.</CardDescription>
              <Button asChild variant="secondary">
                <Link href="/book">Book a massage</Link>
              </Button>
            </Card>
          ) : (
            <div className="flex flex-col gap-card-gap">
              {upcoming.map((b) => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          )}
        </section>

        {/* Past */}
        {past.length > 0 ? (
          <section className="flex flex-col gap-card-gap" aria-labelledby="past-heading">
            <h2
              id="past-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Past Bookings
            </h2>
            <div className="flex flex-col gap-card-gap">
              {past.map((b) => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Saved addresses */}
        <section className="flex flex-col gap-card-gap" aria-labelledby="addresses-heading">
          <h2
            id="addresses-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Saved Addresses
          </h2>
          {addresses.length === 0 ? (
            <Card>
              <CardDescription>
                You haven&apos;t saved any addresses yet. Addresses you use when
                booking can be saved for next time.
              </CardDescription>
            </Card>
          ) : (
            <div className="flex flex-col gap-component">
              {addresses.map((a) => (
                <Card key={a.id} variant="row" className="items-start">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-description font-medium text-bb-text-display">
                      {a.label}
                    </span>
                    <span className="text-description text-bb-text-description">
                      {a.streetAddress}, {a.suburb} {a.postcode}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
