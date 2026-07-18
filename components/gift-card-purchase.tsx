"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, FlaskConical, Gift } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldTextarea } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";
import { PaymentForm } from "@/components/payment/payment-form";
import { addDemoGiftCard, type DemoGiftCard } from "@/lib/demo-store";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — complete gift-card checkout: amount (preset or custom) →
  recipient & sender details → live preview → simulated payment → gift
  code. The "purchased" card is stored only in this browser and no email
  is sent. REAL: payment provider + gift card tables + recipient email —
  DEMO-MODE.md §5.
*/

const AMOUNTS_CENTS = [5000, 10000, 15000, 20000] as const;

type Stage = "details" | "payment" | "done";

export function GiftCardPurchase() {
  const [stage, setStage] = React.useState<Stage>("details");
  const [amountCents, setAmountCents] = React.useState<number>(10000);
  const [customAmount, setCustomAmount] = React.useState("");
  const [useCustom, setUseCustom] = React.useState(false);
  const [recipientName, setRecipientName] = React.useState("");
  const [recipientEmail, setRecipientEmail] = React.useState("");
  const [buyerName, setBuyerName] = React.useState("");
  const [buyerEmail, setBuyerEmail] = React.useState("");
  const [anonymous, setAnonymous] = React.useState(false);
  const [delivery, setDelivery] = React.useState<"now" | "schedule">("now");
  const [deliveryDate, setDeliveryDate] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [card, setCard] = React.useState<DemoGiftCard | null>(null);

  const effectiveCents = useCustom
    ? Math.round(Number(customAmount || 0) * 100)
    : amountCents;

  function continueToPayment(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (useCustom) {
      const dollars = Number(customAmount);
      if (!Number.isFinite(dollars) || dollars < 25 || dollars > 500)
        errs.customAmount = "Choose an amount between $25 and $500.";
    }
    if (recipientName.trim().length < 2)
      errs.recipientName = "Please enter the recipient's name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim()))
      errs.recipientEmail = "Please enter a valid email address.";
    if (buyerName.trim().length < 2)
      errs.buyerName = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail.trim()))
      errs.buyerEmail = "Please enter a valid email for your receipt.";
    if (delivery === "schedule" && !deliveryDate)
      errs.deliveryDate = "Choose a delivery date, or switch to 'Send now'.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStage("payment");
  }

  function onPaid() {
    setCard(
      addDemoGiftCard({
        amountCents: effectiveCents,
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        buyerName: buyerName.trim(),
        buyerEmail: buyerEmail.trim(),
        anonymous,
        deliveryDate: delivery === "schedule" ? deliveryDate : undefined,
        message: message.trim(),
      }),
    );
    setStage("done");
  }

  /* Live preview used at every stage. */
  const preview = (
    <div className="rounded bg-primary p-card-padding text-primary-foreground" aria-label="Gift card preview">
      <div className="flex flex-col gap-component">
        <span className="font-heading text-subtitle">Body Bliss Gift Card</span>
        <span className="font-heading text-display">
          {effectiveCents > 0 ? formatAud(effectiveCents) : "$—"}
        </span>
        <span aria-hidden="true" className="h-1 w-12 rounded bg-secondary" />
        <p className="text-description">
          For {recipientName.trim() || "someone special"}
        </p>
        {message.trim() ? (
          <p className="text-description">&ldquo;{message.trim()}&rdquo;</p>
        ) : null}
        <p className="text-description">
          From {anonymous ? "a secret admirer" : buyerName.trim() || "you"}
        </p>
        {card ? (
          <p className="text-description">
            Code:{" "}
            <span className="font-heading font-bold tracking-wider">{card.code}</span>
          </p>
        ) : null}
      </div>
    </div>
  );

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
            No payment was taken and no email was sent, this is a
            demonstration.
          </span>
        </p>

        {preview}

        <CardDescription>
          In the live site, {card.recipientName} would receive this gift card
          at {card.recipientEmail}{" "}
          {card.deliveryDate
            ? `on ${card.deliveryDate}`
            : "within a few minutes"}
          , with instructions to redeem the code at checkout. A receipt would
          go to {card.buyerEmail}. The card is valid for three years.
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
            <Link href="/book">Book a massage</Link>
          </Button>
        </div>
      </Card>
    );
  }

  if (stage === "payment") {
    return (
      <div className="flex flex-col gap-card-gap">
        {preview}
        <PaymentForm
          amountCents={effectiveCents}
          buttonLabel={`Complete Demo Purchase, ${formatAud(effectiveCents)}`}
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
              const selected = !useCustom && amountCents === cents;
              return (
                <button
                  key={cents}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setUseCustom(false);
                    setAmountCents(cents);
                  }}
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
          <div className="flex flex-col gap-compact">
            <label className="flex items-center gap-component">
              <Checkbox
                checked={useCustom}
                onCheckedChange={(v) => setUseCustom(v === true)}
              />
              <span className="text-description text-bb-text-description">
                Choose my own amount ($25–$500)
              </span>
            </label>
            {useCustom ? (
              <Field
                id="customAmount"
                label="Custom amount (AUD)"
                inputMode="decimal"
                placeholder="e.g. 135"
                value={customAmount}
                error={errors.customAmount}
                onChange={(e) =>
                  setCustomAmount(e.target.value.replace(/[^\d.]/g, ""))
                }
              />
            ) : null}
          </div>
          <p className="text-caption text-bb-text-caption">
            {effectiveCents >= 23800
              ? "Enough for a couples massage."
              : effectiveCents >= 15000
                ? "Enough for a 90-minute massage and more."
                : effectiveCents >= 10000
                  ? "Enough for a 60-minute massage."
                  : "A lovely contribution towards any massage."}
          </p>
        </fieldset>

        <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
          <Field
            id="recipientName"
            label="Recipient's name"
            autoComplete="off"
            required
            value={recipientName}
            error={errors.recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <Field
            id="recipientEmail"
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
          <Field
            id="buyerName"
            label="Your name"
            autoComplete="name"
            required
            value={buyerName}
            error={errors.buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
          <Field
            id="buyerEmail"
            type="email"
            label="Your email"
            hint="For your receipt."
            inputMode="email"
            autoComplete="email"
            required
            value={buyerEmail}
            error={errors.buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
          />
        </div>

        <label className="flex items-center gap-component">
          <Checkbox
            checked={anonymous}
            onCheckedChange={(v) => setAnonymous(v === true)}
          />
          <span className="text-description text-bb-text-description">
            Keep my name off the gift card (send anonymously)
          </span>
        </label>

        <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
          <SelectField
            id="delivery"
            label="Delivery"
            value={delivery}
            onChange={(e) => setDelivery(e.target.value as "now" | "schedule")}
          >
            <option value="now">Send now</option>
            <option value="schedule">Schedule for a date</option>
          </SelectField>
          {delivery === "schedule" ? (
            <Field
              id="deliveryDate"
              label="Delivery date"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              value={deliveryDate}
              error={errors.deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          ) : null}
        </div>

        <FieldTextarea
          id="giftMessage"
          label="Personal message"
          hint="Optional, shown on the gift card."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {preview}

        <Button type="submit" variant="secondary" className="w-full tablet:w-auto">
          Continue to payment
        </Button>
      </form>
    </Card>
  );
}
