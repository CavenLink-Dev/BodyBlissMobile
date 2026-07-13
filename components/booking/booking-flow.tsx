"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  Lock,
  Star,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field, FieldTextarea } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";
import { SERVICES, THERAPISTS_SAMPLE } from "@/lib/content";

/*
  Booking flow — UI-only, client-side state (structured so it maps cleanly
  to the Supabase booking tables later). Follows the brief's order:
    Step 1  Location & access details
    Step 2  Booking options + therapist profiles ("Let us match you" first
            and largest, per the design foundation)
    Step 3  Review the request (clearly a preview — no price is invented and
            nothing is charged; online payment/confirmation opens later)
  Accessibility: one <form> per step, labelled fields, required-field
  validation with focus moved to the first error, a visible step indicator,
  and back/continue controls with 48px hit targets.
*/

const STEPS = ["Location & access", "Choose therapist", "Review request"] as const;

const LOCATION_TYPES = [
  "House",
  "Apartment or unit",
  "Hotel",
  "Workplace",
  "Other",
] as const;

const STAIRS_OPTIONS = [
  "No stairs — step-free access",
  "A few steps",
  "One flight of stairs",
  "Several flights of stairs",
] as const;

type BookingState = {
  // Step 1 — location & access
  address: string;
  locationType: string;
  parking: string;
  stairs: string;
  accessibility: string;
  otherInfo: string;
  locationNotes: string;
  therapistNotes: string;
  // Step 2 — booking options
  service: string;
  preferredDate: string;
  preferredTime: string;
  therapistId: string; // "match" = let us match you
};

const INITIAL: BookingState = {
  address: "",
  locationType: "House",
  parking: "",
  stairs: STAIRS_OPTIONS[0],
  accessibility: "",
  otherInfo: "",
  locationNotes: "",
  therapistNotes: "",
  service: SERVICES[0].slug,
  preferredDate: "",
  preferredTime: "",
  therapistId: "match",
};

export function BookingFlow() {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<BookingState>(INITIAL);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const topRef = React.useRef<HTMLDivElement>(null);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const focusTop = () =>
    topRef.current?.scrollIntoView({ block: "start", behavior: "auto" });

  function validateStep1() {
    const e: Record<string, string> = {};
    if (data.address.trim().length < 5) {
      e.address = "Please enter the street address where the massage will take place.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !validateStep1()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    focusTop();
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    focusTop();
  }

  const selectedTherapist =
    data.therapistId === "match"
      ? null
      : THERAPISTS_SAMPLE.find((t) => t.id === data.therapistId) ?? null;

  const selectedService = SERVICES.find((s) => s.slug === data.service);

  return (
    <div ref={topRef} className="flex flex-col gap-card-gap scroll-mt-24">
      <StepIndicator current={step} />

      {step === 0 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-card-gap"
          aria-labelledby="step1-heading"
        >
          <div className="flex flex-col gap-compact">
            <h2
              id="step1-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Where should we come?
            </h2>
            <p className="text-description text-bb-text-description">
              These details help your therapist arrive prepared and on time.
            </p>
          </div>

          <Field
            id="address"
            name="address"
            label="Address"
            hint="Street address where the massage will take place."
            autoComplete="street-address"
            required
            value={data.address}
            error={errors.address}
            onChange={(e) => set("address", e.target.value)}
          />

          <SelectField
            id="locationType"
            label="Location details"
            hint="What kind of place is it?"
            value={data.locationType}
            onChange={(e) => set("locationType", e.target.value)}
          >
            {LOCATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </SelectField>

          <FieldTextarea
            id="parking"
            label="Parking information"
            hint="Where can the therapist park? Driveway, street, visitor bay, etc."
            value={data.parking}
            onChange={(e) => set("parking", e.target.value)}
          />

          <SelectField
            id="stairs"
            label="Stairs"
            hint="How much climbing is there to reach the massage space?"
            value={data.stairs}
            onChange={(e) => set("stairs", e.target.value)}
          >
            {STAIRS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </SelectField>

          <FieldTextarea
            id="accessibility"
            label="Accessibility requirements"
            hint="Anything we should adjust for access or mobility. Optional — only share what you're comfortable with."
            value={data.accessibility}
            onChange={(e) => set("accessibility", e.target.value)}
          />

          <FieldTextarea
            id="otherInfo"
            label="Anything else the therapist should know"
            hint="Pets, whether a massage table can be set up, room to work in, etc."
            value={data.otherInfo}
            onChange={(e) => set("otherInfo", e.target.value)}
          />

          <FieldTextarea
            id="locationNotes"
            label="Location notes"
            hint="Which entrance, buzzer or gate code, unit number, landmarks."
            value={data.locationNotes}
            onChange={(e) => set("locationNotes", e.target.value)}
          />

          <FieldTextarea
            id="therapistNotes"
            label="Notes for the therapist"
            hint="Preferred pressure, areas to focus on or avoid, oil preferences or allergies."
            value={data.therapistNotes}
            onChange={(e) => set("therapistNotes", e.target.value)}
          />

          <p className="flex items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description">
            <Lock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              You don&apos;t have to share health information. Anything you add
              here is only used to prepare for your appointment and is shared
              with your therapist once your booking is confirmed. See our{" "}
              <Link
                href="/help"
                className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                privacy &amp; safety information
              </Link>
              .
            </span>
          </p>

          <div className="flex flex-col gap-component tablet:flex-row-reverse tablet:justify-start">
            <Button type="submit" variant="secondary" className="w-full tablet:w-auto">
              Continue
            </Button>
          </div>
        </form>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-card-gap" aria-labelledby="step2-heading">
          <div className="flex flex-col gap-compact">
            <h2
              id="step2-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Your massage &amp; therapist
            </h2>
            <p className="text-description text-bb-text-description">
              Pick your massage and preferred time, then let us match you or
              choose a therapist yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
            <SelectField
              id="service"
              label="Massage"
              value={data.service}
              onChange={(e) => set("service", e.target.value)}
            >
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </SelectField>
            <Field
              id="preferredDate"
              label="Preferred date"
              type="date"
              value={data.preferredDate}
              onChange={(e) => set("preferredDate", e.target.value)}
            />
            <Field
              id="preferredTime"
              label="Preferred time"
              type="time"
              value={data.preferredTime}
              onChange={(e) => set("preferredTime", e.target.value)}
            />
          </div>

          <fieldset className="flex flex-col gap-component">
            <legend className="mb-compact font-heading text-subtitle text-bb-text-subtitle">
              Choose your therapist
            </legend>

            {/* "Let us match you" — first and largest */}
            <TherapistOption
              selected={data.therapistId === "match"}
              onSelect={() => set("therapistId", "match")}
              title="Let us match you"
              recommended
              description="We'll assign the best available vetted therapist for your massage and time. The quickest way to book."
              icon={<Users aria-hidden="true" className="size-6 text-primary" />}
            />

            <p className="mt-compact text-description font-medium text-bb-text-description">
              Or choose someone yourself
            </p>

            {THERAPISTS_SAMPLE.map((t) => (
              <TherapistOption
                key={t.id}
                selected={data.therapistId === t.id}
                onSelect={() => set("therapistId", t.id)}
                title={t.firstName}
                description={`${t.headline} · ${t.experience}`}
                meta={
                  <span className="flex flex-wrap items-center gap-compact">
                    <span className="inline-flex items-center gap-1 text-description text-bb-text-description">
                      <Star
                        aria-hidden="true"
                        className="size-4 fill-bb-star text-bb-star"
                      />
                      {t.rating.toFixed(1)}
                      <span className="text-caption text-bb-text-caption">
                        (new)
                      </span>
                    </span>
                    {t.focus.map((f) => (
                      <Badge key={f} variant="secondary">
                        {f}
                      </Badge>
                    ))}
                  </span>
                }
              />
            ))}
          </fieldset>

          <div className="flex flex-col gap-component tablet:flex-row-reverse tablet:justify-start">
            <Button
              type="button"
              variant="secondary"
              className="w-full tablet:w-auto"
              onClick={next}
            >
              Continue
            </Button>
            <Button
              type="button"
              variant="quiet"
              className="w-full tablet:w-auto"
              onClick={back}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
              Back
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-card-gap" aria-labelledby="step3-heading">
          <div className="flex flex-col gap-compact">
            <h2
              id="step3-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Review your request
            </h2>
            <p className="text-description text-bb-text-description">
              Check the details below before you send your request.
            </p>
          </div>

          <Card className="flex flex-col gap-card-gap">
            <ReviewRow label="Massage" value={selectedService?.name ?? "—"} />
            <ReviewRow
              label="Preferred date"
              value={data.preferredDate || "No preference"}
            />
            <ReviewRow
              label="Preferred time"
              value={data.preferredTime || "No preference"}
            />
            <ReviewRow
              label="Therapist"
              value={
                selectedTherapist
                  ? selectedTherapist.firstName
                  : "Let us match you"
              }
            />
            <ReviewRow label="Address" value={data.address || "—"} />
            <ReviewRow label="Location" value={data.locationType} />
            <ReviewRow label="Stairs" value={data.stairs} />
            {data.parking ? (
              <ReviewRow label="Parking" value={data.parking} />
            ) : null}
            {data.accessibility ? (
              <ReviewRow label="Accessibility" value={data.accessibility} />
            ) : null}
            {data.locationNotes ? (
              <ReviewRow label="Location notes" value={data.locationNotes} />
            ) : null}
            {data.therapistNotes ? (
              <ReviewRow label="Notes for therapist" value={data.therapistNotes} />
            ) : null}
          </Card>

          {!submitted ? (
            <>
              <p className="flex items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-success"
                />
                <span>
                  This is a preview of the booking experience. Online payment
                  and confirmation open soon — no payment is taken and nothing
                  is booked yet.
                </span>
              </p>
              <div className="flex flex-col gap-component tablet:flex-row-reverse tablet:justify-start">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full tablet:w-auto"
                  onClick={() => {
                    setSubmitted(true);
                    focusTop();
                  }}
                >
                  Send request
                </Button>
                <Button
                  type="button"
                  variant="quiet"
                  className="w-full tablet:w-auto"
                  onClick={back}
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                  Back
                </Button>
              </div>
            </>
          ) : (
            <Card
              variant="highlight"
              className="flex flex-col items-start gap-component"
              role="status"
            >
              <span
                className="inline-flex size-12 items-center justify-center rounded-full bg-secondary"
                aria-hidden="true"
              >
                <Check className="size-6 text-secondary-foreground" />
              </span>
              <CardTitle className="text-primary-foreground">
                Thanks — this is where your request would go
              </CardTitle>
              <CardDescription className="text-primary-foreground">
                In the live service we&apos;d confirm a therapist and time, then
                take payment only once your booking is confirmed. For now, this
                is a preview of the flow.
              </CardDescription>
              <Button asChild variant="secondary">
                <Link href="/">Back to home</Link>
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-compact" aria-label="Booking progress">
      {STEPS.map((label, i) => {
        const state =
          i < current ? "done" : i === current ? "current" : "upcoming";
        return (
          <li key={label} className="flex flex-1 items-center gap-compact">
            <span
              className={cn(
                "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-description font-semibold",
                state === "done" && "bg-primary text-primary-foreground",
                state === "current" && "bg-secondary text-secondary-foreground",
                state === "upcoming" && "border border-border bg-card text-bb-text-description",
              )}
              aria-current={state === "current" ? "step" : undefined}
            >
              {state === "done" ? (
                <Check aria-hidden="true" className="size-4" />
              ) : (
                i + 1
              )}
            </span>
            <span
              className={cn(
                "hidden text-description tablet:inline",
                state === "current"
                  ? "font-semibold text-bb-text-display"
                  : "text-bb-text-description",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "h-0.5 flex-1 rounded",
                  i < current ? "bg-primary" : "bg-border",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function TherapistOption({
  selected,
  onSelect,
  title,
  description,
  meta,
  icon,
  recommended,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
  meta?: React.ReactNode;
  icon?: React.ReactNode;
  recommended?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-start gap-component rounded border p-card-padding text-left",
        "transition-colors duration-fade",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selected
          ? "border-primary bg-card ring-2 ring-primary"
          : "border-border bg-card hover:bg-foreground/5",
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-primary bg-primary" : "border-border",
        )}
        aria-hidden="true"
      >
        {selected ? <Check className="size-4 text-primary-foreground" /> : null}
      </span>
      <span className="flex flex-1 flex-col gap-compact">
        <span className="flex flex-wrap items-center gap-compact">
          {icon}
          <span className="font-heading text-subtitle text-bb-text-subtitle">
            {title}
          </span>
          {recommended ? <Badge variant="secondary">Recommended</Badge> : null}
        </span>
        <span className="text-description text-bb-text-description">
          {description}
        </span>
        {meta}
      </span>
    </button>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-compact border-b border-border pb-component last:border-0 last:pb-0 tablet:flex-row tablet:gap-card-gap">
      <span className="text-description font-medium text-bb-text-display tablet:w-40 tablet:shrink-0">
        {label}
      </span>
      <span className="text-description text-bb-text-description">{value}</span>
    </div>
  );
}
