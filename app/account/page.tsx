"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarClock, MapPin, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useDemoUser,
  useDemoBookings,
  signOutDemo,
  type DemoBooking,
} from "@/lib/demo-store";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — account page reads the browser-stored demo session and
  bookings. REAL: Supabase auth + getMyBookings/getMyAddresses (lib/account.ts)
  — see DEMO-MODE.md §2.
*/

function bookingStart(b: DemoBooking): string {
  return `${b.date}T${b.time}`;
}

function BookingRow({ booking }: { booking: DemoBooking }) {
  return (
    <Card className="flex flex-col gap-compact">
      <div className="flex items-start justify-between gap-component">
        <CardTitle className="text-subtitle">{booking.serviceName}</CardTitle>
        <Badge variant="secondary">{statusLabel(booking.status)}</Badge>
      </div>
      <p className="flex items-center gap-compact text-description text-bb-text-description">
        <CalendarClock aria-hidden="true" className="size-4" />
        {formatDateTime(bookingStart(booking))} · {booking.durationMinutes} min
      </p>
      <div className="flex items-center justify-between gap-component">
        <span className="text-description capitalize text-bb-text-description">
          {booking.locationType}
        </span>
        <span className="text-description font-medium text-bb-text-display">
          {formatAud(booking.priceCents)}
        </span>
      </div>
      <div>
        <Button asChild variant="quiet">
          <Link href={`/account/bookings/${booking.id}`}>View booking</Link>
        </Button>
      </div>
    </Card>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, ready } = useDemoUser();
  const bookings = useDemoBookings();

  React.useEffect(() => {
    if (ready && !user) router.replace("/login?next=/account");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <main className="px-page-inline py-page-block" aria-busy="true">
        <div className="mx-auto flex max-w-3xl flex-col gap-card-gap">
          <p className="text-description text-bb-text-description" role="status">
            Loading your account…
          </p>
        </div>
      </main>
    );
  }

  const now = new Date();
  const upcoming = bookings.filter(
    (b) => b.status !== "cancelled" && new Date(bookingStart(b)) >= now,
  );
  const past = bookings.filter(
    (b) => b.status === "cancelled" || new Date(bookingStart(b)) < now,
  );
  const addresses = Array.from(
    new Map(
      bookings.map((b) => [
        `${b.streetAddress}|${b.suburb}|${b.postcode}`,
        b,
      ]),
    ).values(),
  );

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-section">
        <div className="flex flex-wrap items-center justify-between gap-component">
          <div className="flex items-center gap-component">
            <span
              className="inline-flex size-12 items-center justify-center rounded-full bg-secondary"
              aria-hidden="true"
            >
              <UserRound className="size-6 text-secondary-foreground" />
            </span>
            <div className="flex flex-col">
              <h1 className="font-heading text-title font-semibold capitalize text-bb-text-title">
                {user.name}
              </h1>
              <p className="text-description text-bb-text-description">{user.email}</p>
            </div>
          </div>
          <Button
            type="button"
            variant="quiet"
            onClick={() => {
              signOutDemo();
              router.push("/");
            }}
          >
            Sign out
          </Button>
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

        {/* Past / cancelled */}
        {past.length > 0 ? (
          <section className="flex flex-col gap-card-gap" aria-labelledby="past-heading">
            <h2
              id="past-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Past &amp; Cancelled
            </h2>
            <div className="flex flex-col gap-card-gap">
              {past.map((b) => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Saved addresses (derived from bookings made in this browser) */}
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
                booking are saved for next time.
              </CardDescription>
            </Card>
          ) : (
            <div className="flex flex-col gap-component">
              {addresses.map((a) => (
                <Card key={a.id} variant="row" className="items-start">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-description font-medium capitalize text-bb-text-display">
                      {a.locationType}
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
