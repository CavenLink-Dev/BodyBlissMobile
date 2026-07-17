"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldTextarea } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";

/*
  Corporate quote request — DEMO MODE. Validates locally and shows a
  simulated confirmation. Nothing is sent anywhere.
*/

type FormState = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  date: string;
  location: string;
  staffCount: string;
  eventHours: string;
  sessionLength: string;
  therapists: string;
  access: string;
  recurrence: string;
  invoiceNotes: string;
  extra: string;
};

const INITIAL: FormState = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  date: "",
  location: "",
  staffCount: "",
  eventHours: "2",
  sessionLength: "15",
  therapists: "Let Body Bliss recommend",
  access: "",
  recurrence: "One-off event",
  invoiceNotes: "",
  extra: "",
};

export function CorporateQuoteForm() {
  const [data, setData] = React.useState<FormState>(INITIAL);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [ref, setRef] = React.useState("");

  const set = <K extends keyof FormState>(key: K, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (data.company.trim().length < 2) errs.company = "Please enter your company name.";
    if (data.contact.trim().length < 2) errs.contact = "Please enter a contact person.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      errs.email = "Please enter a valid work email.";
    if (data.phone.replace(/\D/g, "").length < 8)
      errs.phone = "Please enter a contact phone number.";
    if (!data.date) errs.date = "Please choose an approximate event date.";
    if (data.location.trim().length < 3)
      errs.location = "Please enter the event location or suburb.";
    if (!/^\d+$/.test(data.staffCount.trim()))
      errs.staffCount = "Roughly how many staff? A number is fine.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900)); // simulated send
    setRef(`CQ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <Card className="flex flex-col items-start gap-card-gap" role="status">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary" aria-hidden="true">
          <CheckCircle2 className="size-6 text-secondary-foreground" />
        </span>
        <CardTitle className="text-title">Enquiry received</CardTitle>
        <CardDescription>
          Thanks, {data.contact.split(" ")[0]}. In the live site, our corporate
          team would come back to {data.email} within one business day with a
          tailored quote for {data.company}.
        </CardDescription>
        <p
          className="flex items-start gap-compact rounded border border-border bg-background p-3 text-description text-bb-text-description"
          role="note"
        >
          <FlaskConical aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <span>
            <span className="font-medium text-bb-text-display">Test mode.</span>{" "}
            This is a demonstration — no enquiry was sent anywhere.
          </span>
        </p>
        <p className="text-caption text-bb-text-caption">Enquiry ref: {ref}</p>
        <div className="flex flex-col gap-component tablet:flex-row">
          <Button asChild variant="secondary" className="w-full tablet:w-auto">
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            type="button"
            variant="quiet"
            className="w-full tablet:w-auto"
            onClick={() => {
              setData(INITIAL);
              setDone(false);
            }}
          >
            Send another enquiry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-card-gap">
      <CardTitle className="text-subtitle">Request a corporate quote</CardTitle>
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-component">
        <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
          <Field
            id="company"
            label="Company name"
            required
            value={data.company}
            error={errors.company}
            onChange={(e) => set("company", e.target.value)}
          />
          <Field
            id="contact"
            label="Contact person"
            required
            value={data.contact}
            error={errors.contact}
            onChange={(e) => set("contact", e.target.value)}
          />
          <Field
            id="corpEmail"
            label="Work email"
            type="email"
            inputMode="email"
            required
            value={data.email}
            error={errors.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <Field
            id="corpPhone"
            label="Phone number"
            type="tel"
            inputMode="tel"
            required
            value={data.phone}
            error={errors.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <Field
            id="eventDate"
            label="Event date"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            required
            value={data.date}
            error={errors.date}
            onChange={(e) => set("date", e.target.value)}
          />
          <Field
            id="location"
            label="Event location"
            hint="Suburb or venue."
            required
            value={data.location}
            error={errors.location}
            onChange={(e) => set("location", e.target.value)}
          />
          <Field
            id="staffCount"
            label="Number of staff"
            inputMode="numeric"
            required
            value={data.staffCount}
            error={errors.staffCount}
            onChange={(e) => set("staffCount", e.target.value)}
          />
          <SelectField
            id="eventHours"
            label="Approximate event duration"
            value={data.eventHours}
            onChange={(e) => set("eventHours", e.target.value)}
          >
            {["1", "2", "3", "4", "5", "6", "Full day"].map((h) => (
              <option key={h} value={h}>
                {h === "Full day" ? h : `${h} hour${h === "1" ? "" : "s"}`}
              </option>
            ))}
          </SelectField>
          <SelectField
            id="sessionLength"
            label="Session length per person"
            value={data.sessionLength}
            onChange={(e) => set("sessionLength", e.target.value)}
          >
            {["10", "15", "20", "30"].map((m) => (
              <option key={m} value={m}>
                {m} minutes
              </option>
            ))}
          </SelectField>
          <SelectField
            id="therapists"
            label="Number of therapists"
            value={data.therapists}
            onChange={(e) => set("therapists", e.target.value)}
          >
            {["Let Body Bliss recommend", "1", "2", "3", "4+"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </SelectField>
          <SelectField
            id="recurrence"
            label="One-off or recurring?"
            value={data.recurrence}
            onChange={(e) => set("recurrence", e.target.value)}
          >
            {["One-off event", "Monthly", "Fortnightly", "Weekly", "Not sure yet"].map(
              (r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ),
            )}
          </SelectField>
        </div>

        <FieldTextarea
          id="access"
          label="Parking and building access"
          hint="Loading dock, visitor parking, lifts, sign-in requirements."
          value={data.access}
          onChange={(e) => set("access", e.target.value)}
        />
        <FieldTextarea
          id="invoiceNotes"
          label="Invoice or purchase-order notes"
          hint="PO numbers, billing contact, anything your accounts team needs."
          value={data.invoiceNotes}
          onChange={(e) => set("invoiceNotes", e.target.value)}
        />
        <FieldTextarea
          id="extra"
          label="Additional requirements"
          hint="Quiet room availability, accessibility, timing constraints."
          value={data.extra}
          onChange={(e) => set("extra", e.target.value)}
        />

        <Button type="submit" variant="secondary" disabled={submitting} className="w-full tablet:w-auto">
          {submitting ? "Sending…" : "Request Quote"}
        </Button>
        <p className="text-caption text-bb-text-caption">
          Enquiries are simulated in this prototype — nothing is sent.
        </p>
      </form>
    </Card>
  );
}
