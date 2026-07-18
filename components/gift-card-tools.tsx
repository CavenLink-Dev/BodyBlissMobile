"use client";

import * as React from "react";
import { Mail, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { toast } from "@/components/toaster";
import { findGiftCard, type DemoGiftCard } from "@/lib/demo-store";
import { formatAud } from "@/lib/format";

/*
  Gift card self-service tools — DEMO MODE. Balance check and resend work
  against the cards stored in this browser (plus the seeded demo card
  GIFT-DEMO-2026). Nothing is sent anywhere.
*/

export function GiftCardTools() {
  const [balanceCode, setBalanceCode] = React.useState("");
  const [balanceError, setBalanceError] = React.useState<string | undefined>();
  const [found, setFound] = React.useState<DemoGiftCard | null>(null);

  const [resendCode, setResendCode] = React.useState("");
  const [resendError, setResendError] = React.useState<string | undefined>();

  function checkBalance(e: React.FormEvent) {
    e.preventDefault();
    const card = findGiftCard(balanceCode);
    if (!card) {
      setFound(null);
      setBalanceError(
        "We couldn't find that gift card. Codes look like GIFT-XXXX-XXXX, try the demo card GIFT-DEMO-2026.",
      );
      return;
    }
    setBalanceError(undefined);
    setFound(card);
  }

  function resend(e: React.FormEvent) {
    e.preventDefault();
    const card = findGiftCard(resendCode);
    if (!card) {
      setResendError(
        "We couldn't find that gift card. Check the code and try again.",
      );
      return;
    }
    setResendError(undefined);
    toast(
      `Gift card resent to ${card.recipientEmail} (simulated, no email is sent in this demo).`,
    );
  }

  return (
    <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
      <Card className="flex h-full flex-col gap-component">
        <div className="flex items-center gap-component">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-muted" aria-hidden="true">
            <Wallet className="size-6 text-primary" />
          </span>
          <CardTitle className="text-subtitle">Check a balance</CardTitle>
        </div>
        <form noValidate onSubmit={checkBalance} className="flex flex-col gap-component">
          <Field
            id="balanceCode"
            label="Gift card code"
            placeholder="GIFT-XXXX-XXXX"
            autoComplete="off"
            value={balanceCode}
            error={balanceError}
            onChange={(e) => setBalanceCode(e.target.value)}
          />
          <Button type="submit" variant="quiet" className="w-full border border-border">
            Check Balance
          </Button>
        </form>
        {found ? (
          <div className="rounded border border-border bg-cream p-3" role="status">
            <p className="text-description text-bb-text-description">
              <span className="font-medium text-bb-text-display">{found.code}</span>
              <br />
              Remaining balance:{" "}
              <span className="font-heading font-semibold text-bb-text-display">
                {formatAud(found.balanceCents)}
              </span>{" "}
              of {formatAud(found.amountCents)}
              <br />
              For {found.recipientName} · valid 3 years from purchase.
            </p>
          </div>
        ) : null}
      </Card>

      <Card className="flex h-full flex-col gap-component">
        <div className="flex items-center gap-component">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-muted" aria-hidden="true">
            <Mail className="size-6 text-primary" />
          </span>
          <CardTitle className="text-subtitle">Resend a gift card</CardTitle>
        </div>
        <CardDescription>
          Lost the email? We&apos;ll send the gift card to the recipient again.
        </CardDescription>
        <form noValidate onSubmit={resend} className="flex flex-col gap-component">
          <Field
            id="resendCode"
            label="Gift card code"
            placeholder="GIFT-XXXX-XXXX"
            autoComplete="off"
            value={resendCode}
            error={resendError}
            onChange={(e) => setResendCode(e.target.value)}
          />
          <Button type="submit" variant="quiet" className="w-full border border-border">
            Resend Gift Card
          </Button>
        </form>
      </Card>
    </div>
  );
}
