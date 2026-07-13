"use client";

import * as React from "react";
import { Check, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Field } from "@/components/ui/field";

/*
  Gift-card interest capture — UI-only for now (no backend wired, no price
  or terms invented). When gift cards launch this posts to Supabase. Simple
  email validation with a visible error; success is announced via role.
*/

export function GiftCardInterest() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [done, setDone] = React.useState(false);

  if (done) {
    return (
      <Card variant="highlight" className="flex flex-col items-start gap-component" role="status">
        <span
          className="inline-flex size-12 items-center justify-center rounded-full bg-secondary"
          aria-hidden="true"
        >
          <Check className="size-6 text-secondary-foreground" />
        </span>
        <CardTitle className="text-primary-foreground">You&apos;re on the list</CardTitle>
        <CardDescription className="text-primary-foreground">
          We&apos;ll let you know the moment Body Bliss gift cards are available.
        </CardDescription>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-card-gap">
      <div className="flex items-center gap-component">
        <span
          className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
          aria-hidden="true"
        >
          <Mail className="size-6 text-primary" />
        </span>
        <CardTitle className="text-subtitle">Get notified at launch</CardTitle>
      </div>
      <form
        noValidate
        className="flex flex-col gap-component"
        onSubmit={(e) => {
          e.preventDefault();
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
          if (!ok) {
            setError("Please enter a valid email address.");
            return;
          }
          setError(undefined);
          setDone(true);
        }}
      >
        <Field
          id="giftEmail"
          name="email"
          type="email"
          label="Email address"
          hint="We'll only use this to tell you when gift cards go live."
          autoComplete="email"
          value={email}
          error={error}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Button type="submit" variant="secondary" className="w-full tablet:w-auto">
            Notify me
          </Button>
        </div>
      </form>
    </Card>
  );
}
