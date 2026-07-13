import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { GiftCardInterest } from "@/components/gift-card-interest";

export const metadata: Metadata = {
  title: "Gift cards — Body Bliss Mobile Massage",
  description:
    "Body Bliss mobile massage gift cards are coming soon. Register your interest to be notified at launch.",
};

/*
  Gift cards — secondary action. Not yet on sale, so no amounts, prices or
  terms are shown (all owner/legal decision gates). Register-interest only.
*/

export default function GiftCardsPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-section">
        <section className="flex flex-col gap-card-gap" aria-labelledby="gift-heading">
          <span className="inline-flex w-fit items-center gap-compact rounded-full border border-border bg-card px-3 py-1 text-description font-medium text-bb-text-description">
            <Sparkles aria-hidden="true" className="size-4 text-primary" />
            Coming soon
          </span>
          <h1 id="gift-heading" className="font-heading text-display text-bb-text-display">
            Give The Gift Of Body Bliss
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            A Body Bliss gift card will let someone you care about book a vetted
            massage therapist to their own home, hotel or workplace across
            Adelaide.
          </p>
        </section>

        <GiftCardInterest />

        <section aria-labelledby="how-gift-heading" className="flex flex-col gap-card-gap">
          <h2
            id="how-gift-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            How gift cards will work
          </h2>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
            <Card className="flex h-full flex-col gap-component">
              <Gift aria-hidden="true" className="size-8 text-primary" />
              <CardTitle className="text-subtitle">Choose a gift card</CardTitle>
              <CardDescription>
                Pick a Body Bliss gift card to send by email — details announced
                at launch.
              </CardDescription>
            </Card>
            <Card className="flex h-full flex-col gap-component">
              <Sparkles aria-hidden="true" className="size-8 text-primary" />
              <CardTitle className="text-subtitle">They choose a massage</CardTitle>
              <CardDescription>
                The recipient picks the massage, time and place that suits them.
              </CardDescription>
            </Card>
            <Card className="flex h-full flex-col gap-component">
              <Gift aria-hidden="true" className="size-8 text-primary" />
              <CardTitle className="text-subtitle">A therapist comes to them</CardTitle>
              <CardDescription>
                A vetted therapist arrives with everything needed — they just
                relax.
              </CardDescription>
            </Card>
          </div>
          <p className="text-caption text-bb-text-caption">
            Pricing and gift card terms will be published before gift cards go
            on sale.
          </p>
        </section>

        <section aria-labelledby="book-instead-heading">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="book-instead-heading"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Want a massage now?
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              You can start a booking today.
            </p>
            <Button asChild variant="secondary">
              <Link href="/book">Book Now</Link>
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}
