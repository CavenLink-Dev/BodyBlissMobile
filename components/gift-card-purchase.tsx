"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Download, Gift, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldTextarea } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";
import { PaymentForm } from "@/components/payment/payment-form";
import { addDemoGiftCard, type DemoGiftCard } from "@/lib/demo-store";
import { formatAud } from "@/lib/format";
import {
  GiftCardVisual,
  downloadGiftCardPng,
  type GiftCardArt,
} from "@/components/gift-card-visual";

/*
  DEMO MODE — complete gift-card checkout: amount (preset or custom) →
  recipient & sender details → live preview → simulated payment → gift
  code. The "purchased" card is stored only in this browser and no email
  is sent. REAL: payment provider + gift card tables + recipient email —
  DEMO-MODE.md §5.
*/

const AMOUNTS_CENTS = [15000, 20000, 25000, 30000] as const;

type Stage = "details" | "payment" | "done";

export function GiftCardPurchase() {
  const [stage, setStage] = React.useState<Stage>("details");
  const [giveMethod, setGiveMethod] = React.useState<"email" | "download">("email");
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
      if (!Number.isFinite(dollars) || dollars < 50 || dollars > 600)
        errs.customAmount = "Choose an amount between $50 and $600.";
    }
    // Recipient name is required when emailing; optional when printing yourself.
    if (giveMethod === "email" && recipientName.trim().length < 2)
      errs.recipientName = "Please enter the recipient's name.";
    if (giveMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim()))
      errs.recipientEmail = "Please enter a valid email address.";
    if (buyerName.trim().length < 2)
      errs.buyerName = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail.trim()))
      errs.buyerEmail = "Please enter a valid email for your receipt.";
    if (giveMethod === "email" && delivery === "schedule" && !deliveryDate)
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

  /* Artwork used for the on-screen preview AND the PNG download. */
  const art: GiftCardArt = {
    amount: effectiveCents > 0 ? formatAud(effectiveCents) : "$—",
    to: recipientName,
    from: anonymous ? "a secret admirer" : buyerName,
    message,
    code: card?.code,
  };

  /* Live preview used at every stage. */
  const preview = <GiftCardVisual art={art} />;

  if (stage === "done" && card) {
    const emailed = giveMethod === "email";
    return (
      <Card className="flex flex-col gap-card-gap" role="status">
        <div className="flex items-center gap-component">
          <span
            className="bb-anim-pop inline-flex size-14 items-center justify-center rounded-full bg-secondary shadow-rest"
            aria-hidden="true"
          >
            <Gift className="size-7 text-secondary-foreground" />
          </span>
          <CardTitle className="text-title">
            {emailed ? "Gift card sent" : "Your gift card is ready"}
          </CardTitle>
        </div>

        {preview}

        <CardDescription>
          {emailed ? (
            <>
              {card.recipientName} will receive this gift card at{" "}
              {card.recipientEmail}{" "}
              {card.deliveryDate
                ? `on ${card.deliveryDate}`
                : "within a few minutes"}
              , with instructions to redeem the code at checkout. Your receipt
              has been sent to {card.buyerEmail}. Valid for three years.
            </>
          ) : (
            <>
              Download or print your gift card below and give it whenever you
              like. Your receipt has been sent to {card.buyerEmail}. The code is
              already active and valid for three years.
            </>
          )}
        </CardDescription>

        <div className="flex flex-col gap-component tablet:flex-row">
          <Button
            type="button"
            variant="primary"
            className="w-full tablet:w-auto"
            onClick={() => {
              void downloadGiftCardPng(art);
            }}
          >
            <Download aria-hidden="true" className="size-5" />
            Download gift card
          </Button>
          <Button
            type="button"
            variant="quiet"
            className="w-full border border-border tablet:w-auto"
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
          buttonLabel={`Pay ${formatAud(effectiveCents)}`}
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
                      ? "border-camel bg-gold-wash font-bold text-bb-text-display"
                      : "border-border bg-card text-bb-text-subtitle hover:border-camel/60",
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
                Choose my own amount ($50 to $600)
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
            {effectiveCents >= 28999
              ? "Enough for a couples massage."
              : effectiveCents >= 19999
                ? "Enough for a 90 minute massage."
                : effectiveCents >= 14999
                  ? "Enough for a one hour massage."
                  : "A lovely contribution towards any massage."}
          </p>
        </fieldset>

        {/* How to give it */}
        <fieldset className="flex flex-col gap-component">
          <legend className="text-description font-medium text-bb-text-display">
            How would you like to give it?
          </legend>
          <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
            {(
              [
                {
                  value: "email",
                  icon: Mail,
                  title: "Email it to them",
                  desc: "We'll send the card straight to their inbox.",
                },
                {
                  value: "download",
                  icon: Download,
                  title: "Print or download",
                  desc: "Get a printable card to give in person.",
                },
              ] as const
            ).map((opt) => {
              const selected = giveMethod === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setGiveMethod(opt.value)}
                  className={cn(
                    "flex items-start gap-component rounded border p-card-padding text-left transition-colors duration-fade",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    selected
                      ? "border-camel bg-gold-wash"
                      : "border-border bg-card hover:border-camel/60",
                  )}
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-wash" aria-hidden="true">
                    <opt.icon className="size-6 text-espresso" />
                  </span>
                  <span className="flex flex-col gap-compact">
                    <span className="font-heading text-subtitle text-bb-text-subtitle">
                      {opt.title}
                    </span>
                    <span className="text-description text-bb-text-description">
                      {opt.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Who it's for */}
        <fieldset className="flex flex-col gap-component">
          <legend className="text-description font-medium text-bb-text-display">
            Who is it for?
          </legend>
          <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
            <Field
              id="recipientName"
              label={giveMethod === "email" ? "Their name" : "Their name (optional)"}
              autoComplete="off"
              required={giveMethod === "email"}
              value={recipientName}
              error={errors.recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            {giveMethod === "email" ? (
              <Field
                id="recipientEmail"
                type="email"
                label="Their email"
                hint="The gift card is delivered by email."
                inputMode="email"
                autoComplete="off"
                required
                value={recipientEmail}
                error={errors.recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
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
        </fieldset>

        {/* From you */}
        <fieldset className="flex flex-col gap-component">
          <legend className="text-description font-medium text-bb-text-display">
            From you
          </legend>
          <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
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
        </fieldset>

        {/* Rarely needed extras, tucked away */}
        <details className="group rounded border border-border bg-cream p-3">
          <summary className="flex min-h-hit-target cursor-pointer list-none items-center justify-between text-description font-medium text-bb-text-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {giveMethod === "email"
              ? "More options: send later or send anonymously"
              : "More options: send anonymously"}
            <ChevronLeft aria-hidden="true" className="size-5 -rotate-90 transition-transform duration-fade group-open:rotate-90" />
          </summary>
          <div className="mt-component flex flex-col gap-component">
            <label className="flex items-center gap-component">
              <Checkbox
                checked={anonymous}
                onCheckedChange={(v) => setAnonymous(v === true)}
              />
              <span className="text-description text-bb-text-description">
                Keep my name off the gift card (give anonymously)
              </span>
            </label>
            {giveMethod === "email" ? (
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
            ) : null}
          </div>
        </details>

        {/* Live preview of the actual gift card */}
        <div className="flex flex-col gap-compact">
          <span className="text-description font-medium text-bb-text-display">
            Preview
          </span>
          {preview}
        </div>

        <Button type="submit" variant="primary" className="w-full tablet:w-auto">
          Continue to payment
        </Button>
      </form>
    </Card>
  );
}
