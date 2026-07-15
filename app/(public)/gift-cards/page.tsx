import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { GiftCardPurchase } from "@/components/gift-card-purchase";

export const metadata: Metadata = {
  title: "Gift cards — Body Bliss Mobile Massage",
  description:
    "Give the gift of a Body Bliss mobile massage. Choose an amount, add a message, and it's delivered by email.",
};

/*
  Gift cards — DEMO MODE. The purchase flow is a complete, simulated
  checkout (see components/gift-card-purchase.tsx). REAL: DEMO-MODE.md §5.
*/

export default function GiftCardsPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-section">
        <section className="flex flex-col gap-card-gap" aria-labelledby="gift-heading">
          <h1 id="gift-heading" className="font-heading text-display text-bb-text-display">
            Give The Gift Of Body Bliss
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            A Body Bliss gift card lets someone you care about book a vetted
            massage therapist to their own home, hotel or workplace across
            Adelaide.
          </p>
        </section>

        <GiftCardPurchase />

        <section aria-labelledby="how-gift-heading" className="flex flex-col gap-card-gap">
          <h2
            id="how-gift-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
            <Card className="flex h-full flex-col gap-component">
              <Gift aria-hidden="true" className="size-8 text-primary" />
              <CardTitle className="text-subtitle">You send it</CardTitle>
              <CardDescription>
                Choose an amount, add a message, and the gift card is delivered
                to their inbox.
              </CardDescription>
            </Card>
            <Card className="flex h-full flex-col gap-component">
              <Sparkles aria-hidden="true" className="size-8 text-primary" />
              <CardTitle className="text-subtitle">They choose</CardTitle>
              <CardDescription>
                The recipient picks the massage, time and place that suits them
                and redeems the code at checkout.
              </CardDescription>
            </Card>
            <Card className="flex h-full flex-col gap-component">
              <Users aria-hidden="true" className="size-8 text-primary" />
              <CardTitle className="text-subtitle">We come to them</CardTitle>
              <CardDescription>
                A vetted therapist arrives with everything needed — they just
                relax.
              </CardDescription>
            </Card>
          </div>
          <p className="text-caption text-bb-text-caption">
            Gift cards are valid for 3 years from purchase, per Australian
            consumer law.
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
              You can book one for yourself in a couple of minutes.
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
