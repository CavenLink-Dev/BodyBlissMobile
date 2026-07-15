"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, FlaskConical, Gift } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldTextarea } from "@/components/ui/field";
import { PaymentForm } from "@/components/payment/payment-form";
import { addDemoGiftCard, type DemoGiftCard } from "@/lib/demo-store";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — complete gift-card checkout: amount → recipient → simulated
  payment → gift code. The "purchased" card is stored only in this browser
  and no email is sent. REAL: payment provider + gift card tables + an email
  to the recipient — DEMO-MODE.md §5.
*/

const AMOUNTS_CENTS = [5000, 10000, 15000, 20000] as const;

type Stage = "details" | "payment" | "done";

export function GiftCardPurchase() {
  const [stage, setStage] = React.useState<Stage>("details");
  const [amountCents, setAmountCents] = React.useState<number>(10000);
  const [recipientName, setRecipientName] = React.useState("");
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [card, setCard] = React.useState<DemoGiftCard | null>(null);

  function continueToPayment(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (recipientName.trim().length < 2)
      errs.recipientName = "Please enter the recipient's name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim()))
      errs.recipientEmail = "Please enter a valid email address.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStage("payment");
  }

  function onPaid() {
    setCard(
      addDemoGiftCard({
        amountCents,
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        message: message.trim(),
      }),
    );
    setStage("done");
  }

  if (stage === "done" && card) {
    return (
      <Card className="flex flex-col gap-card-gap" role="status">
        <div className="flex items-center gap-component">
          <span
            className="inline-flex size-12 items-center justify-center rounded-full bg-secondary"
            aria-hidden="true"
          >
            <Gift className="size-6 text-secondary-foreground" />
          </span>
          <CardTitle className="text-subtitle">Gift card purchased</CardTitle>
        </div>

        <p
          className="flex items-start gap-compact rounded border border-border bg-background p-3 text-description text-bb-text-description"
          role="note"
        >
          <FlaskConical aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <span>
            <span className="font-medium text-bb-text-display">Test mode.</span>{" "}
            No payment was taken and no email was sent — this is a
            demonstration.
          </span>
        </p>

        {/* The gift card itself — charcoal, gold accent, like the brand */}
        <div className="rounded bg-primary p-card-padding text-primary-foreground">
          <div className="flex flex-col gap-component">
            <span className="font-heading text-subtitle">Body Bliss Gift Card</span>
            <span className="font-heading text-display">{formatAud(card.amountCents)}</span>
            <span aria-hidden="true" className="h-1 w-12 rounded bg-secondary" />
            <p className="text-description">For {card.recipientName}</p>
            {card.message ? (
              <p className="text-description">&ldquo;{card.message}&rdquo;</p>
            ) : null}
            <p className="text-description">
              Code:{" "}
              <span className="font-heading font-bold tracking-wider">{card.code}</span>
            </p>
          </div>
        </div>

        <CardDescription>
          In the live site, {card.recipientName} would receive this gift card
          at {card.recipientEmail} with instructions to redeem it during
          booking.
        </CardDescription>

        <div className="flex flex-col gap-component tablet:flex-row">
          <Button
            type="button"
            variant="secondary"
            className="w-full tablet:w-auto"
            onClick={() => {
              setStage("details");
              setRecipientName("");
              setRecipientEmail("");
              setMessage("");
              setCard(null);
            }}
          >
            Buy another
          </Button>
          <Button asChild variant="quiet" className="w-full tablet:w-auto">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Card>
    );
  }

  if (stage === "payment") {
    return (
      <div className="flex flex-col gap-card-gap">
        <PaymentForm
          amountCents={amountCents}
          buttonLabel={`Pay ${formatAud(amountCents)} for gift card`}
          onPaid={onPaid}
        />
        <div>
          <Button type="button" variant="quiet" onClick={() => setStage("details")}>
            <ChevronLeft aria-hidden="true" className="size-5" />
            Back to details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="flex flex-col gap-card-gap">
      <CardTitle className="text-subtitle">Buy a gift card</CardTitle>
      <form noValidate onSubmit={continueToPayment} className="flex flex-col gap-card-gap">
        <fieldset className="flex flex-col gap-component">
          <legend className="text-description font-medium text-bb-text-display">
            Amount
          </legend>
          <div className="grid grid-cols-2 gap-component tablet:grid-cols-4">
            {AMOUNTS_CENTS.map((cents) => {
              const selected = amountCents === cents;
              return (
                <button
                  key={cents}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAmountCents(cents)}
                  className={cn(
                    "inline-flex min-h-hit-target items-center justify-center rounded border font-heading text-subtitle transition-colors duration-fade",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    selected
                      ? "border-transparent bg-secondary font-bold text-secondary-foreground shadow-secondary-inner"
                      : "border-border bg-card text-bb-text-subtitle hover:border-primary",
                  )}
                >
                  {formatAud(cents)}
                </button>
              );
            })}
          </div>
          <p className="text-caption text-bb-text-caption">
            Enough for a{" "}
            {amountCents >= 15000
              ? "90-minute massage and more"
              : amountCents >= 10000
                ? "60-minute massage"
                : "corporate chair session or part of any massage"}
            .
          </p>
        </fieldset>

        <Field
          id="recipientName"
          name="recipientName"
          label="Recipient's name"
          autoComplete="off"
          required
          value={recipientName}
          error={errors.recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
        <Field
          id="recipientEmail"
          name="recipientEmail"
          type="email"
          label="Recipient's email"
          hint="The gift card is delivered by email."
          inputMode="email"
          autoComplete="off"
          required
          value={recipientEmail}
          error={errors.recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <FieldTextarea
          id="giftMessage"
          name="giftMessage"
          label="Personal message"
          hint="Optional — shown on the gift card."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button type="submit" variant="secondary" className="w-full tablet:w-auto">
          Continue to payment
        </Button>
      </form>
    </Card>
  );
}
