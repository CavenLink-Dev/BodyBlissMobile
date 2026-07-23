"use client";

import * as React from "react";
import { BellRing, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

/*
  "Notify me" for coming-soon treatments — DEMO MODE. Validates locally and
  confirms in place; nothing is sent anywhere.
*/

export function NotifyMe({ treatment }: { treatment: string }) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | undefined>();
  const [done, setDone] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(undefined);
    setDone(true);
  }

  if (done) {
    return (
      <p
        className="flex items-start gap-compact rounded border border-border bg-cream p-3 text-description text-bb-text-description"
        role="status"
      >
        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
        <span>
          You&apos;re on the list, we&apos;ll email you when {treatment}{" "}
          launches. (Simulated, nothing is sent in this prototype.)
        </span>
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-component tablet:flex-row tablet:items-end"
    >
      <Field
        id="notifyEmail"
        label="Email me when it launches"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        error={error}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" variant="secondary" className="w-full tablet:w-auto">
        <BellRing aria-hidden="true" className="size-5" />
        Notify Me
      </Button>
    </form>
  );
}
