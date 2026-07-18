"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileDown, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FieldTextarea } from "@/components/ui/field";
import { toast } from "@/components/toaster";
import {
  getDemoBooking,
  cancelDemoBooking,
  markBookingReviewed,
  type DemoBooking,
} from "@/lib/demo-store";
import { statusLabel, formatDateTime } from "@/lib/booking";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — booking detail reads from browser storage; cancel, rebook,
  receipt and review are all simulated. REAL: Supabase bookings reads and
  the cancel_booking flow — DEMO-MODE.md §3.
*/

export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const [booking, setBooking] = React.useState<DemoBooking | null | undefined>(
    undefined,
  );
  const [confirming, setConfirming] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);
  const [reviewOpen, setReviewOpen] = React.useState(false);
  const [reviewStars, setReviewStars] = React.useState(5);
  const [reviewText, setReviewText] = React.useState("");

  React.useEffect(() => {
    setBooking(getDemoBooking(params.id));
  }, [params.id]);

  if (booking === undefined) {
    return (
      <main className="px-page-inline py-page-block" aria-busy="true">
        <div className="mx-auto flex max-w-3xl flex-col gap-card-gap" role="status" aria-label="Loading booking">
          <div className="h-10 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-56 animate-pulse rounded bg-muted" />
          <span className="sr-only">Loading booking…</span>
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
            We couldn&apos;t find this booking in this browser, demo bookings
            are stored locally, so they don&apos;t follow you between devices.
          </p>
          <Button asChild variant="secondary">
            <Link href="/account">Back to my account</Link>
          </Button>
        </div>
      </main>
    );
  }

  const isPast =
    new Date(`${booking.date}T${booking.time}`) < new Date() ||
    booking.status === "completed";

  async function onCancel() {
    setCancelling(true);
    await new Promise((r) => setTimeout(r, 600)); // simulated round-trip
    cancelDemoBooking(booking!.id);
    setBooking(getDemoBooking(booking!.id));
    setCancelling(false);
    setConfirming(false);
    toast("Booking cancelled. Nothing was charged (test mode).");
  }

  function submitReview() {
    markBookingReviewed(booking!.id);
    setBooking(getDemoBooking(booking!.id));
    setReviewOpen(false);
    toast("Thanks, your review was saved (simulated).");
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
          <Row
            label="Therapist"
            value={booking.therapistName ?? "Matched by Body Bliss"}
          />
          <Row label="Location" value={booking.locationType} />
          <Row
            label="Address"
            value={`${booking.streetAddress}, ${booking.suburb} ${booking.postcode} SA`}
          />
          {booking.notes ? <Row label="Notes" value={booking.notes} /> : null}
          <Row label="Massage" value={formatAud(booking.priceCents)} />
          {booking.travelFeeCents ? (
            <Row label="Travel fee" value={formatAud(booking.travelFeeCents)} />
          ) : null}
          {booking.discountCents ? (
            <Row
              label="Gift card / promo"
              value={`−${formatAud(booking.discountCents)}`}
            />
          ) : null}
          <Row
            label="Total (test mode)"
            value={formatAud(booking.totalCents ?? booking.priceCents)}
          />
        </Card>

        {/* Actions */}
        <Card className="flex flex-col gap-component">
          <CardTitle className="text-subtitle">Manage booking</CardTitle>
          <div className="flex flex-wrap gap-component">
            <Button asChild variant="secondary">
              <Link href={`/book?service=${booking.serviceCode}`}>Rebook</Link>
            </Button>
            <Button
              type="button"
              variant="quiet"
              className="border border-border"
              onClick={() =>
                toast("Receipt downloaded (simulated, this is a demonstration).")
              }
            >
              <FileDown aria-hidden="true" className="size-5" />
              Download Receipt
            </Button>
            {isPast && booking.status !== "cancelled" && !booking.reviewed ? (
              <Button
                type="button"
                variant="quiet"
                className="border border-border"
                onClick={() => setReviewOpen((v) => !v)}
              >
                <Star aria-hidden="true" className="size-5" />
                Leave a Review
              </Button>
            ) : null}
          </div>

          {booking.reviewed ? (
            <CardDescription>
              You&apos;ve reviewed this booking, thank you.
            </CardDescription>
          ) : null}

          {reviewOpen ? (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                submitReview();
              }}
              className="flex flex-col gap-component rounded border border-border bg-cream p-3"
            >
              <fieldset className="flex flex-col gap-compact">
                <legend className="text-description font-medium text-foreground">
                  Your rating
                </legend>
                <div className="flex gap-compact">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={reviewStars >= n}
                      aria-label={`${n} star${n === 1 ? "" : "s"}`}
                      onClick={() => setReviewStars(n)}
                      className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Star
                        aria-hidden="true"
                        className={cn(
                          "size-6",
                          reviewStars >= n
                            ? "fill-bb-star text-bb-star"
                            : "text-border",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>
              <FieldTextarea
                id="reviewText"
                label="Your review"
                hint="How was the experience?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <div className="flex flex-wrap gap-component">
                <Button type="submit" variant="secondary">
                  Submit Review
                </Button>
                <Button type="button" variant="quiet" onClick={() => setReviewOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : null}
        </Card>

        {/* Cancellation */}
        {booking.status === "confirmed" && !isPast ? (
          <Card className="flex flex-col gap-component">
            <CardTitle className="text-subtitle">Cancel booking</CardTitle>
            {confirming ? (
              <>
                <CardDescription>
                  Cancel this booking? This can&apos;t be undone. Cancellation
                  is free until your therapist is on the way.
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
        ) : booking.status === "cancelled" ? (
          <Card role="status">
            <CardDescription>
              This booking has been cancelled. Nothing was charged (test
              mode). You can rebook the same massage above any time.
            </CardDescription>
          </Card>
        ) : null}
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
