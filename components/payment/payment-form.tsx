"use client";

import * as React from "react";
import { CreditCard, Lock, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { formatAud } from "@/lib/format";

/*
  DEMO MODE — a payment form that looks and behaves like a real card
  checkout (formatting, validation, processing state) but never charges
  anything and never sends card data anywhere. The inputs are validated
  for shape only and then discarded.
  REAL: replace with a Stripe Payment Element + payment intent —
  DEMO-MODE.md §4.
*/

function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function expiryInFuture(value: string): boolean {
  const m = value.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const month = Number(m[1]);
  if (month < 1 || month > 12) return false;
  const year = 2000 + Number(m[2]);
  const now = new Date();
  return (
    year > now.getFullYear() ||
    (year === now.getFullYear() && month >= now.getMonth() + 1)
  );
}

export function PaymentForm({
  amountCents,
  buttonLabel,
  onPaid,
}: {
  amountCents: number;
  /** Defaults to "Pay {amount}". */
  buttonLabel?: string;
  onPaid: () => void | Promise<void>;
}) {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [declined, setDeclined] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDeclined(false);
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please enter the name on the card.";
    if (number.replace(/\D/g, "").length !== 16)
      errs.number = "Please enter a 16-digit card number.";
    if (!expiryInFuture(expiry))
      errs.expiry = "Please enter a valid future expiry (MM/YY).";
    if (!/^\d{3,4}$/.test(cvc)) errs.cvc = "Please enter the 3 or 4 digit CVC.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setProcessing(true);
    // Simulated processing delay — nothing is sent anywhere.
    await new Promise((r) => setTimeout(r, 1400));
    // Simulated decline: any card number ending in 0002 fails, so the
    // failed-payment state can be demonstrated.
    if (number.replace(/\D/g, "").endsWith("0002")) {
      setProcessing(false);
      setDeclined(true);
      return;
    }
    await onPaid();
  }

  return (
    <Card className="flex flex-col gap-card-gap">
      <div className="flex items-center gap-component">
        <span
          className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
          aria-hidden="true"
        >
          <CreditCard className="size-6 text-primary" />
        </span>
        <div className="flex flex-col">
          <span className="font-heading text-subtitle text-bb-text-subtitle">
            Card payment
          </span>
          <span className="text-description text-bb-text-description">
            Total: <span className="font-medium text-bb-text-display">{formatAud(amountCents)}</span>
          </span>
        </div>
      </div>

      <p
        className="flex items-start gap-compact rounded border border-border bg-background p-3 text-description text-bb-text-description"
        role="note"
      >
        <Lock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
        <span>
          <span className="font-medium text-bb-text-display">Test mode.</span>{" "}
          This is a demonstration — no payment is taken and card details are
          never stored or sent. Any valid-looking card works; a number ending
          in 0002 simulates a declined payment.
        </span>
      </p>

      {declined ? (
        <p
          className="rounded border border-destructive bg-card p-3 text-description font-medium text-destructive"
          role="alert"
        >
          Your card was declined (simulated). Nothing was charged — try a
          different card number, or any number not ending in 0002.
        </p>
      ) : null}

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-component">
        <Field
          id="cardName"
          name="cardName"
          label="Name on card"
          autoComplete="cc-name"
          required
          value={name}
          error={errors.name}
          onChange={(e) => setName(e.target.value)}
        />
        <Field
          id="cardNumber"
          name="cardNumber"
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          required
          value={number}
          error={errors.number}
          onChange={(e) => setNumber(formatCardNumber(e.target.value))}
        />
        <div className="grid grid-cols-2 gap-component">
          <Field
            id="cardExpiry"
            name="cardExpiry"
            label="Expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            required
            value={expiry}
            error={errors.expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          />
          <Field
            id="cardCvc"
            name="cardCvc"
            label="CVC"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            required
            value={cvc}
            error={errors.cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
        </div>
        <Button type="submit" variant="secondary" disabled={processing} className="w-full">
          {processing ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" />
              Processing…
            </>
          ) : (
            (buttonLabel ?? `Pay ${formatAud(amountCents)}`)
          )}
        </Button>
        <p className="text-caption text-bb-text-caption">
          Payments are simulated in this demo. In the live site this step is
          handled by a secure payment provider.
        </p>
      </form>
    </Card>
  );
}
