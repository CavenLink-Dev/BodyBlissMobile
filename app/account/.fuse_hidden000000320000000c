"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  CreditCard,
  Gift,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";
import { toast } from "@/components/toaster";
import {
  useDemoUser,
  useDemoBookings,
  useDemoGiftCards,
  useDemoPrefs,
  saveDemoPrefs,
  signOutDemo,
  signInDemoAccount,
  type DemoBooking,
} from "@/lib/demo-store";
import { getTherapist } from "@/lib/therapists";
import { TherapistAvatar } from "@/components/therapists/therapist-card";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — account area backed entirely by browser storage
  (lib/demo-store). Signed-out visitors get a polished chooser including a
  one-tap pre-filled demo account. REAL: Supabase auth + RLS-scoped reads
  (lib/account.ts) — see DEMO-MODE.md §2.
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
        <span className="text-description text-bb-text-description">
          {booking.therapistName ?? "Matched therapist"} ·{" "}
          <span className="capitalize">{booking.locationType}</span>
        </span>
        <span className="text-description font-medium text-bb-text-display">
          {formatAud(booking.totalCents ?? booking.priceCents)}
        </span>
      </div>
      <div className="flex flex-wrap gap-component">
        <Button asChild variant="quiet">
          <Link href={`/account/bookings/${booking.id}`}>Manage booking</Link>
        </Button>
        <Button asChild variant="quiet">
          <Link href={`/book?service=${booking.serviceCode}`}>Rebook</Link>
        </Button>
      </div>
    </Card>
  );
}

/* ---------------- Signed-out state ---------------- */

function SignedOut() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-md flex-col gap-card-gap">
        <div className="flex flex-col gap-compact">
          <h1 className="font-heading text-display text-bb-text-display">
            My Account
          </h1>
          <p className="text-description text-bb-text-description">
            Sign in to manage bookings, save your details and rebook in
            seconds. Everything here is simulated, no real account is
            created.
          </p>
        </div>

        <Card className="flex flex-col gap-component">
          <CardTitle className="text-subtitle">Try the demo account</CardTitle>
          <CardDescription>
            One tap, no details needed, explore a pre-filled account with
            upcoming and past bookings, saved addresses and preferences.
          </CardDescription>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              signInDemoAccount();
              toast("Signed in to the demo account.");
            }}
          >
            <Sparkles aria-hidden="true" className="size-5" />
            View Demo Account
          </Button>
        </Card>

        <div className="flex flex-col gap-component">
          <Button asChild variant="primary" className="w-full">
            <Link href="/login?next=/account">Sign In</Link>
          </Button>
          <Button asChild variant="quiet" className="w-full border border-border">
            <Link href="/signup?next=/account">Create Account</Link>
          </Button>
          <Button asChild variant="quiet" className="w-full">
            <Link href="/book">Continue as Guest, book without an account</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Signed-in account ---------------- */

export default function AccountPage() {
  const router = useRouter();
  const { user, ready } = useDemoUser();
  const bookings = useDemoBookings();
  const giftCards = useDemoGiftCards();
  const prefs = useDemoPrefs();

  const [pressure, setPressure] = React.useState<string | null>(null);
  const [focusAreas, setFocusAreas] = React.useState<string | null>(null);
  const [allergies, setAllergies] = React.useState<string | null>(null);

  if (!ready) {
    return (
      <main className="px-page-inline py-page-block" aria-busy="true">
        <div
          className="mx-auto flex max-w-3xl flex-col gap-card-gap"
          role="status"
          aria-label="Loading account"
        >
          <div className="h-12 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-36 animate-pulse rounded bg-muted" />
          <div className="h-36 animate-pulse rounded bg-muted" />
          <span className="sr-only">Loading your account…</span>
        </div>
      </main>
    );
  }

  if (!user) return <SignedOut />;

  const now = new Date();
  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" && new Date(bookingStart(b)) >= now,
  );
  const past = bookings.filter(
    (b) => b.status !== "confirmed" || new Date(bookingStart(b)) < now,
  );
  const addresses = Array.from(
    new Map(
      bookings.map((b) => [`${b.streetAddress}|${b.suburb}|${b.postcode}`, b]),
    ).values(),
  );
  const preferredTherapists = prefs.preferredTherapistIds
    .map(getTherapist)
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const giftBalance = giftCards.reduce((sum, c) => sum + c.balanceCents, 0);

  function savePreferences() {
    saveDemoPrefs({
      pressure: pressure ?? prefs.pressure,
      focusAreas: focusAreas ?? prefs.focusAreas,
      allergies: allergies ?? prefs.allergies,
    });
    toast("Treatment preferences saved.");
  }

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-section">
        {/* Profile header */}
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
              <p className="text-description text-bb-text-description">
                {user.email}
                {user.phone ? ` · ${user.phone}` : ""}
              </p>
              {user.isDemoAccount ? (
                <p className="text-caption text-bb-text-caption">
                  Demonstration account, all data is sample data in this
                  browser.
                </p>
              ) : null}
            </div>
          </div>
          <Button
            type="button"
            variant="quiet"
            onClick={() => {
              signOutDemo();
              toast("Signed out.");
              router.push("/");
            }}
          >
            Sign Out
          </Button>
        </div>

        {/* Upcoming */}
        <section className="flex flex-col gap-card-gap" aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="font-heading text-title font-semibold text-bb-text-title">
            Upcoming Bookings
          </h2>
          {upcoming.length === 0 ? (
            <Card className="flex flex-col items-start gap-component">
              <CardDescription>
                You have no upcoming bookings, your next massage is a couple
                of minutes away.
              </CardDescription>
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
        <section className="flex flex-col gap-card-gap" aria-labelledby="past-heading">
          <h2 id="past-heading" className="font-heading text-title font-semibold text-bb-text-title">
            Previous Bookings
          </h2>
          {past.length === 0 ? (
            <Card>
              <CardDescription>
                Completed and cancelled bookings will appear here.
              </CardDescription>
            </Card>
          ) : (
            <div className="flex flex-col gap-card-gap">
              {past.map((b) => (
                <BookingRow key={b.id} booking={b} />
              ))}
            </div>
          )}
        </section>

        {/* Saved addresses */}
        <section className="flex flex-col gap-card-gap" aria-labelledby="addresses-heading">
          <h2 id="addresses-heading" className="font-heading text-title font-semibold text-bb-text-title">
            Saved Addresses
          </h2>
          {addresses.length === 0 ? (
            <Card>
              <CardDescription>
                You haven&apos;t saved any addresses yet. Addresses you use when
                booking are saved here for next time.
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

        {/* Preferred therapists */}
        <section className="flex flex-col gap-card-gap" aria-labelledby="preferred-heading">
          <h2 id="preferred-heading" className="font-heading text-title font-semibold text-bb-text-title">
            Preferred Therapists
          </h2>
          {preferredTherapists.length === 0 ? (
            <Card className="flex flex-col items-start gap-component">
              <CardDescription>
                No preferred therapists yet. Browse the team and select someone
                you&apos;d like to see again.
              </CardDescription>
              <Button asChild variant="quiet" className="border border-border">
                <Link href="/therapists">Browse therapists</Link>
              </Button>
            </Card>
          ) : (
            <div className="flex flex-col gap-component">
              {preferredTherapists.map((t) => (
                <Card key={t.id} variant="row" className="items-center">
                  <TherapistAvatar therapist={t} className="size-11 text-description" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-description font-medium text-bb-text-display">
                      {t.name}
                    </span>
                    <span className="truncate text-description text-bb-text-description">
                      {t.shortBio}
                    </span>
                  </div>
                  <Button asChild variant="quiet">
                    <Link href={`/book?therapist=${t.id}`}>Book</Link>
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Treatment preferences */}
        <section className="flex flex-col gap-card-gap" aria-labelledby="prefs-heading">
          <h2 id="prefs-heading" className="font-heading text-title font-semibold text-bb-text-title">
            Treatment Preferences
          </h2>
          <Card className="flex flex-col gap-component">
            <SelectField
              id="prefPressure"
              label="Preferred pressure"
              value={pressure ?? prefs.pressure}
              onChange={(e) => setPressure(e.target.value)}
            >
              {["Light", "Medium", "Firm", "Let my therapist advise"].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </SelectField>
            <Field
              id="prefFocus"
              label="Usual focus areas"
              value={focusAreas ?? prefs.focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
            />
            <Field
              id="prefAllergies"
              label="Allergies or sensitivities"
              value={allergies ?? prefs.allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
            <div>
              <Button type="button" variant="secondary" onClick={savePreferences}>
                Save Preferences
              </Button>
            </div>
          </Card>
        </section>

        {/* Gift cards & payment */}
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
          <section aria-labelledby="gift-heading">
            <Card className="flex h-full flex-col gap-component">
              <div className="flex items-center gap-component">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                  <Gift className="size-6 text-primary" />
                </span>
                <h2 id="gift-heading" className="font-heading text-subtitle text-bb-text-subtitle">
                  Gift Card Balance
                </h2>
              </div>
              <p className="font-heading text-title font-semibold text-bb-text-display">
                {formatAud(giftBalance)}
              </p>
              <CardDescription>
                Across {giftCards.length} card{giftCards.length === 1 ? "" : "s"} in
                this browser. Apply a code at checkout to redeem.
              </CardDescription>
              <Button asChild variant="quiet" className="w-fit border border-border">
                <Link href="/gift-cards">Gift card tools</Link>
              </Button>
            </Card>
          </section>

          <section aria-labelledby="payment-heading">
            <Card className="flex h-full flex-col gap-component">
              <div className="flex items-center gap-component">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                  <CreditCard className="size-6 text-primary" />
                </span>
                <h2 id="payment-heading" className="font-heading text-subtitle text-bb-text-subtitle">
                  Payment Methods
                </h2>
              </div>
              <p className="text-description text-bb-text-description">
                Visa •••• 4242 <span className="text-bb-text-caption">(placeholder)</span>
              </p>
              <CardDescription>
                Saved cards are placeholders in this prototype, no real
                payment details are ever stored.
              </CardDescription>
              <Button
                type="button"
                variant="quiet"
                className="w-fit border border-border"
                onClick={() => toast("Card management is simulated in this prototype.")}
              >
                Manage cards
              </Button>
            </Card>
          </section>
        </div>

        {/* Communication preferences */}
        <section className="flex flex-col gap-card-gap" aria-labelledby="comms-heading">
          <h2 id="comms-heading" className="font-heading text-title font-semibold text-bb-text-title">
            Communication Preferences
          </h2>
          <Card className="flex flex-col gap-component">
            <label className="flex items-center gap-component">
              <Checkbox
                checked={prefs.smsReminders}
                onCheckedChange={(v) => {
                  saveDemoPrefs({ smsReminders: v === true });
                  toast("Communication preferences updated.");
                }}
              />
              <span className="text-description text-bb-text-description">
                SMS reminders the day before my booking
              </span>
            </label>
            <label className="flex items-center gap-component">
              <Checkbox
                checked={prefs.marketingEmails}
                onCheckedChange={(v) => {
                  saveDemoPrefs({ marketingEmails: v === true });
                  toast("Communication preferences updated.");
                }}
              />
              <span className="text-description text-bb-text-description">
                Occasional offers and news by email
              </span>
            </label>
            <CardDescription>
              Booking confirmations are always sent, they&apos;re part of the
              service. (All messages are simulated in this prototype.)
            </CardDescription>
          </Card>
        </section>
      </div>
    </main>
  );
}
