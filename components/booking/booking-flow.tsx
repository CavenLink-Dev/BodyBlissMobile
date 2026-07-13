"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, Lock, ShieldCheck, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldTextarea } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";
import { formatAud } from "@/lib/format";
import type { ServiceWithPricing } from "@/lib/catalogue-types";
import { createBookingRequest } from "@/app/(public)/book/actions";

/*
  Booking flow — request-to-book (no payment). Driven by the live service
  catalogue; on submit it calls the createBookingRequest server action which
  writes the booking, its location and consent server-side. Steps:
    1  Location & access
    2  Massage, time & therapist (auto-match for now)
    3  Review, accept terms, send request
*/

const STEPS = ["Location & access", "Massage & time", "Review & send"] as const;

const LOCATION_TYPES = [
  { value: "home", label: "My home" },
  { value: "hotel", label: "A hotel" },
  { value: "workplace", label: "A workplace" },
] as const;

const STAIRS_OPTIONS = [
  "No stairs — step-free access",
  "A few steps",
  "One flight of stairs",
  "Several flights of stairs",
] as const;

type BookingState = {
  locationType: "home" | "hotel" | "workplace";
  streetAddress: string;
  suburb: string;
  postcode: string;
  parking: string;
  stairs: string;
  accessibility: string;
  otherInfo: string;
  locationNotes: string;
  therapistNotes: string;
  serviceCode: string;
  variantId: string;
  date: string;
  time: string;
  acceptTerms: boolean;
};

export function BookingFlow({
  services,
  initialServiceCode,
  isAuthed,
}: {
  services: ServiceWithPricing[];
  initialServiceCode?: string;
  isAuthed: boolean;
}) {
  const router = useRouter();

  const firstService =
    services.find((s) => s.code === initialServiceCode) ?? services[0];
  const firstVariant = firstService?.variants[0];

  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<BookingState>({
    locationType: "home",
    streetAddress: "",
    suburb: "",
    postcode: "",
    parking: "",
    stairs: STAIRS_OPTIONS[0],
    accessibility: "",
    otherInfo: "",
    locationNotes: "",
    therapistNotes: "",
    serviceCode: firstService?.code ?? "",
    variantId: firstVariant?.id ?? "",
    date: "",
    time: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | undefined>();
  const topRef = React.useRef<HTMLDivElement>(null);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const focusTop = () =>
    topRef.current?.scrollIntoView({ block: "start", behavior: "auto" });

  const selectedService = services.find((s) => s.code === data.serviceCode);
  const selectedVariant = selectedService?.variants.find(
    (v) => v.id === data.variantId,
  );

  function onServiceChange(code: string) {
    const svc = services.find((s) => s.code === code);
    setData((d) => ({
      ...d,
      serviceCode: code,
      variantId: svc?.variants[0]?.id ?? "",
    }));
  }

  function validateStep1() {
    const e: Record<string, string> = {};
    if (data.streetAddress.trim().length < 5)
      e.streetAddress = "Please enter the street address for the massage.";
    if (data.suburb.trim().length < 2) e.suburb = "Please enter your suburb.";
    if (!/^\d{4}$/.test(data.postcode.trim()))
      e.postcode = "Please enter a 4-digit postcode.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!data.variantId) e.variantId = "Please choose a length.";
    if (!data.date) e.date = "Please choose a date.";
    if (!data.time) e.time = "Please choose a time.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    focusTop();
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    focusTop();
  }

  function composeAccessNotes() {
    return [
      data.stairs ? `Stairs: ${data.stairs}` : "",
      data.accessibility ? `Accessibility: ${data.accessibility}` : "",
      data.otherInfo ? `Other: ${data.otherInfo}` : "",
      data.locationNotes ? `Entry/location: ${data.locationNotes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function submit() {
    if (!data.acceptTerms) {
      setSubmitError("Please accept the booking terms to send your request.");
      return;
    }
    setSubmitting(true);
    setSubmitError(undefined);
    const result = await createBookingRequest({
      serviceVariantId: data.variantId,
      locationType: data.locationType,
      date: data.date,
      time: data.time,
      streetAddress: data.streetAddress.trim(),
      suburb: data.suburb.trim(),
      postcode: data.postcode.trim(),
      state: "SA",
      parkingNotes: data.parking,
      accessNotes: composeAccessNotes(),
      customerNotes: data.therapistNotes,
      therapistPreference: "match",
      acceptTerms: true,
    });

    if (result.ok) {
      router.push(`/book/confirmation/${result.bookingId}`);
      return;
    }
    if (result.error === "auth") {
      router.push("/login?next=/book");
      return;
    }
    setSubmitting(false);
    setSubmitError(
      result.error === "unavailable"
        ? "That massage option isn't available. Please choose another."
        : "Something went wrong sending your request. Please try again.",
    );
  }

  if (!firstService) {
    return (
      <Card>
        <CardDescription>
          Booking is briefly unavailable while we finalise our services. Please
          check back shortly.
        </CardDescription>
      </Card>
    );
  }

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
            <h2 id="step1-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Where should we come?
            </h2>
            <p className="text-description text-bb-text-description">
              These details help your therapist arrive prepared and on time.
            </p>
          </div>

          <SelectField
            id="locationType"
            label="Where is the massage?"
            value={data.locationType}
            onChange={(e) =>
              set("locationType", e.target.value as BookingState["locationType"])
            }
          >
            {LOCATION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </SelectField>

          <Field
            id="streetAddress"
            label="Street address"
            hint="Where the massage will take place."
            autoComplete="street-address"
            required
            value={data.streetAddress}
            error={errors.streetAddress}
            onChange={(e) => set("streetAddress", e.target.value)}
          />

          <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
            <Field
              id="suburb"
              label="Suburb"
              autoComplete="address-level2"
              required
              value={data.suburb}
              error={errors.suburb}
              onChange={(e) => set("suburb", e.target.value)}
            />
            <Field
              id="postcode"
              label="Postcode"
              inputMode="numeric"
              autoComplete="postal-code"
              required
              value={data.postcode}
              error={errors.postcode}
              onChange={(e) => set("postcode", e.target.value)}
            />
          </div>

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
            label="Entry & location notes"
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
              You don&apos;t have to share health information. Anything you add is
              only used to prepare for your appointment and is shared with your
              therapist once your booking is confirmed. See our{" "}
              <Link href="/help" className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
            <h2 id="step2-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Your massage &amp; time
            </h2>
            <p className="text-description text-bb-text-description">
              Choose your massage and preferred time. We&apos;ll match you with a
              vetted therapist.
            </p>
          </div>

          <SelectField
            id="service"
            label="Massage"
            value={data.serviceCode}
            onChange={(e) => onServiceChange(e.target.value)}
          >
            {services.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="variant"
            label="Length"
            value={data.variantId}
            error={errors.variantId}
            onChange={(e) => set("variantId", e.target.value)}
          >
            {selectedService?.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.durationMinutes} min
                {v.priceCents != null ? ` — ${formatAud(v.priceCents)}` : ""}
              </option>
            ))}
          </SelectField>

          <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
            <Field
              id="date"
              label="Preferred date"
              type="date"
              required
              value={data.date}
              error={errors.date}
              onChange={(e) => set("date", e.target.value)}
            />
            <Field
              id="time"
              label="Preferred time"
              type="time"
              required
              value={data.time}
              error={errors.time}
              onChange={(e) => set("time", e.target.value)}
            />
          </div>

          <Card variant="row" className="items-start">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-muted" aria-hidden="true">
              <Users className="size-6 text-primary" />
            </span>
            <div className="flex flex-col gap-compact">
              <CardTitle className="text-subtitle">We&apos;ll match you</CardTitle>
              <CardDescription>
                We&apos;ll assign the best available vetted therapist for your
                massage and time. Choosing a specific therapist becomes available
                as our therapist team comes online.
              </CardDescription>
            </div>
          </Card>

          {selectedVariant ? (
            <p className="text-description text-bb-text-description">
              Indicative price:{" "}
              <span className="font-medium text-bb-text-display">
                {formatAud(selectedVariant.priceCents)}
              </span>{" "}
              — confirmed before you pay.
            </p>
          ) : null}

          <div className="flex flex-col gap-component tablet:flex-row-reverse tablet:justify-start">
            <Button type="button" variant="secondary" className="w-full tablet:w-auto" onClick={next}>
              Continue
            </Button>
            <Button type="button" variant="quiet" className="w-full tablet:w-auto" onClick={back}>
              <ChevronLeft aria-hidden="true" className="size-5" />
              Back
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-card-gap" aria-labelledby="step3-heading">
          <div className="flex flex-col gap-compact">
            <h2 id="step3-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Review your request
            </h2>
            <p className="text-description text-bb-text-description">
              Check the details below before you send your request.
            </p>
          </div>

          <Card className="flex flex-col gap-card-gap">
            <ReviewRow label="Massage" value={selectedService?.name ?? "—"} />
            <ReviewRow
              label="Length"
              value={selectedVariant ? `${selectedVariant.durationMinutes} min` : "—"}
            />
            <ReviewRow label="Date" value={data.date || "—"} />
            <ReviewRow label="Time" value={data.time || "—"} />
            <ReviewRow label="Therapist" value="Automatic match" />
            <ReviewRow
              label="Address"
              value={`${data.streetAddress}, ${data.suburb} ${data.postcode}`}
            />
            <ReviewRow
              label="Indicative price"
              value={selectedVariant ? formatAud(selectedVariant.priceCents) : "—"}
            />
          </Card>

          <p className="flex items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
            <span>
              This sends a booking request. We&apos;ll confirm a therapist and the
              final price before any payment is taken — nothing is charged now.
            </span>
          </p>

          {isAuthed ? (
            <>
              <label className="flex items-start gap-component">
                <Checkbox
                  checked={data.acceptTerms}
                  onCheckedChange={(v) => set("acceptTerms", v === true)}
                  aria-describedby="terms-text"
                  className="mt-0.5"
                />
                <span id="terms-text" className="text-description text-bb-text-description">
                  I agree to the{" "}
                  <Link href="/help" className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    booking terms
                  </Link>{" "}
                  and understand my request will be confirmed before payment.
                </span>
              </label>

              {submitError ? (
                <p className="text-description font-medium text-destructive" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="flex flex-col gap-component tablet:flex-row-reverse tablet:justify-start">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full tablet:w-auto"
                  disabled={submitting}
                  onClick={submit}
                >
                  {submitting ? "Sending…" : "Send request"}
                </Button>
                <Button type="button" variant="quiet" className="w-full tablet:w-auto" onClick={back}>
                  <ChevronLeft aria-hidden="true" className="size-5" />
                  Back
                </Button>
              </div>
            </>
          ) : (
            <Card variant="row" className="flex-col items-start gap-component">
              <CardDescription>
                Create a free account or sign in to send your booking request and
                manage it afterwards.
              </CardDescription>
              <div className="flex flex-col gap-component tablet:flex-row">
                <Button asChild variant="secondary" className="w-full tablet:w-auto">
                  <Link href="/login?next=/book">Sign in</Link>
                </Button>
                <Button asChild variant="quiet" className="w-full tablet:w-auto">
                  <Link href="/signup?next=/book">Create account</Link>
                </Button>
              </div>
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
        const state = i < current ? "done" : i === current ? "current" : "upcoming";
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
              {state === "done" ? <Check aria-hidden="true" className="size-4" /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-description tablet:inline",
                state === "current" ? "font-semibold text-bb-text-display" : "text-bb-text-description",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn("h-0.5 flex-1 rounded", i < current ? "bg-primary" : "bg-border")}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
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
