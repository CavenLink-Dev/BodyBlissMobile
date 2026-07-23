"use client";

import * as React from "react";
import { CheckCircle2, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldTextarea } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";

/*
  Report a concern — DEMO MODE. Validates locally and shows a simulated
  confirmation; nothing is sent anywhere.
*/

const TOPICS = [
  "A booking or payment",
  "Therapist conduct",
  "Customer conduct (I'm a therapist)",
  "Personal safety",
  "Gift card help",
  "Lost property",
  "Privacy",
  "Something else",
] as const;

export function ReportConcernForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [topic, setTopic] = React.useState<string>(TOPICS[0]);
  const [reference, setReference] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [ref, setRef] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Please enter a valid email address.";
    if (details.trim().length < 10)
      errs.details = "Please tell us a little more so we can help properly.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800)); // simulated send
    setRef(`RC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <Card className="flex flex-col items-start gap-component" role="status">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary" aria-hidden="true">
          <CheckCircle2 className="size-6 text-secondary-foreground" />
        </span>
        <CardTitle className="text-subtitle">Concern received</CardTitle>
        <CardDescription>
          Thank you. Our support team will acknowledge this within one
          business day at {email}, and prioritise anything involving safety.
        </CardDescription>
        <p className="text-caption text-bb-text-caption">Reference: {ref}</p>
        <Button
          type="button"
          variant="quiet"
          className="border border-border"
          onClick={() => {
            setDone(false);
            setDetails("");
            setReference("");
          }}
        >
          Report something else
        </Button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-component">
      <div className="flex items-center gap-component">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold-wash" aria-hidden="true">
          <ShieldAlert className="size-6 text-primary" />
        </span>
        <CardTitle className="text-subtitle">Report a concern</CardTitle>
      </div>
      <CardDescription>
        Tell us about anything that didn&apos;t feel right, a booking issue,
        conduct, safety, or something else. Safety reports are prioritised.
      </CardDescription>
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-component">
        <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
          <Field
            id="concernName"
            label="Your name"
            autoComplete="name"
            required
            value={name}
            error={errors.name}
            onChange={(e) => setName(e.target.value)}
          />
          <Field
            id="concernEmail"
            label="Your email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            error={errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <SelectField
          id="concernTopic"
          label="What is this about?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>
        <Field
          id="concernRef"
          label="Booking reference (if relevant)"
          hint="e.g. BB-XXXXXX, helps us find the booking quickly."
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <FieldTextarea
          id="concernDetails"
          label="What happened?"
          required
          value={details}
          error={errors.details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <Button type="submit" variant="primary" disabled={submitting} className="w-full tablet:w-auto">
          {submitting ? "Sending…" : "Submit Report"}
        </Button>
        <p className="text-caption text-bb-text-caption">
          Reports are simulated in this prototype, nothing is sent.
        </p>
      </form>
    </Card>
  );
}
