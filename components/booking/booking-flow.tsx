"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  Gift,
  Lock,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldTextarea } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";
import { PaymentForm } from "@/components/payment/payment-form";
import { TherapistAvatar } from "@/components/therapists/therapist-card";
import { formatAud } from "@/lib/format";
import type { ServiceWithPricing } from "@/lib/catalogue-types";
import {
  useDemoUser,
  addDemoBooking,
  findGiftCard,
  redeemGiftCard,
  PROMO_CODES,
} from "@/lib/demo-store";
import { therapistsForService, getTherapist } from "@/lib/therapists";
import { travelFeeForSuburb } from "@/lib/service-areas";

/*
  Booking flow — DEMO MODE. A complete multi-step booking journey backed
  only by local state and lib/demo-store (localStorage). Nothing is sent
  to any server. Steps:
    1  Massage & time   — service, length, people, date, sample time slots
    2  Therapist        — match me, or choose a sample therapist
    3  Your details     — guest checkout or demo sign-in
    4  Location         — address, access, parking, pets, safety
    5  Preferences      — pressure, focus/avoid areas, health notes, consent
    6  Review           — totals, travel fee, gift card / promo codes, terms
    7  Payment          — simulated card checkout → confirmation page
  REAL: restore the createBookingRequest server action + a payment
  provider — DEMO-MODE.md §3–4.
*/

const STEPS = [
  "Massage",
  "Therapist",
  "Details",
  "Location",
  "Preferences",
  "Review",
  "Pay",
] as const;

const LOCATION_TYPES = [
  { value: "home", label: "My home" },
  { value: "hotel", label: "A hotel" },
  { value: "workplace", label: "A workplace" },
  { value: "event", label: "An event" },
] as const;

const STAIRS_OPTIONS = [
  "No stairs — step-free access",
  "A few steps",
  "One flight of stairs",
  "Several flights of stairs",
] as const;

const LIFT_OPTIONS = ["Not applicable", "Lift available", "No lift"] as const;

const PRESSURE_OPTIONS = ["Light", "Medium", "Firm", "Let my therapist advise"] as const;

/* Deterministic sample availability — same date always shows the same
   slots, with a plausible spread and quieter Sundays. No API. */
function sampleSlots(dateStr: string): string[] {
  if (!dateStr) return [];
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return [];
  const isSunday = date.getDay() === 0;
  const base = isSunday
    ? ["10:00", "11:30", "13:00", "14:30", "16:00"]
    : ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
  // Drop a deterministic ~third of slots so days look realistically different.
  let seed = 0;
  for (const ch of dateStr) seed = (seed * 31 + ch.charCodeAt(0)) % 997;
  const slots = base.filter((_, i) => (seed + i * 7) % 3 !== 0);
  // Hide past times for today.
  const today = new Date();
  if (dateStr === today.toISOString().slice(0, 10)) {
    const nowHM = `${String(today.getHours() + 2).padStart(2, "0")}:${String(
      today.getMinutes(),
    ).padStart(2, "0")}`;
    return slots.filter((s) => s >= nowHM);
  }
  return slots;
}

type BookingState = {
  serviceCode: string;
  variantId: string;
  people: 1 | 2;
  date: string;
  time: string;
  therapistChoice: "match" | string; // "match" or therapist id
  genderPref: string;
  bookingFor: "myself" | "someone-else";
  fullName: string;
  email: string;
  phone: string;
  locationType: "home" | "hotel" | "workplace" | "event";
  streetAddress: string;
  suburb: string;
  postcode: string;
  unit: string;
  parking: string;
  stairs: string;
  lift: string;
  intercom: string;
  entryNotes: string;
  pets: string;
  accessibility: string;
  safeSpace: boolean;
  pressure: string;
  focusAreas: string;
  avoidAreas: string;
  pregnancy: string;
  allergies: string;
  mobility: string;
  healthNotes: string;
  notesConsent: boolean;
  acceptTerms: boolean;
};

export function BookingFlow({
  services,
  initialServiceCode,
  initialVariantId,
  initialTherapistId,
}: {
  services: ServiceWithPricing[];
  initialServiceCode?: string;
  initialVariantId?: string;
  initialTherapistId?: string;
}) {
  const router = useRouter();
  const { user } = useDemoUser();

  const firstService =
    services.find((s) => s.code === initialServiceCode) ?? services[0];
  const firstVariant =
    firstService?.variants.find((v) => v.id === initialVariantId) ??
    firstService?.variants[0];

  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<BookingState>({
    serviceCode: firstService?.code ?? "",
    variantId: firstVariant?.id ?? "",
    people: firstService?.code === "couples" ? 2 : 1,
    date: "",
    time: "",
    therapistChoice: initialTherapistId ?? "match",
    genderPref: "No preference",
    bookingFor: "myself",
    fullName: "",
    email: "",
    phone: "",
    locationType: "home",
    streetAddress: "",
    suburb: "",
    postcode: "",
    unit: "",
    parking: "",
    stairs: STAIRS_OPTIONS[0],
    lift: LIFT_OPTIONS[0],
    intercom: "",
    entryNotes: "",
    pets: "",
    accessibility: "",
    safeSpace: false,
    pressure: "Medium",
    focusAreas: "",
    avoidAreas: "",
    pregnancy: "",
    allergies: "",
    mobility: "",
    healthNotes: "",
    notesConsent: false,
    acceptTerms: false,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitError, setSubmitError] = React.useState<string | undefined>();
  const [codeInput, setCodeInput] = React.useState("");
  const [appliedCode, setAppliedCode] = React.useState<
    | { type: "gift"; code: string; appliedCents: number }
    | { type: "promo"; code: string; label: string; appliedCents: number }
    | null
  >(null);
  const [codeError, setCodeError] = React.useState<string | undefined>();
  const topRef = React.useRef<HTMLDivElement>(null);

  // Pre-fill contact details from the demo session once available.
  React.useEffect(() => {
    if (user) {
      setData((d) => ({
        ...d,
        fullName: d.fullName || user.name,
        email: d.email || user.email,
        phone: d.phone || user.phone || "",
      }));
    }
  }, [user]);

  const set = <K extends keyof BookingState>(key: K, value: BookingState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const focusTop = () =>
    topRef.current?.scrollIntoView({ block: "start", behavior: "auto" });

  const selectedService = services.find((s) => s.code === data.serviceCode);
  const selectedVariant = selectedService?.variants.find(
    (v) => v.id === data.variantId,
  );
  const isCouples = data.serviceCode === "couples";
  const people = isCouples ? 1 : data.people; // couples price already covers two
  const baseCents = (selectedVariant?.priceCents ?? 0) * people;
  const travelFeeCents = travelFeeForSuburb(data.postcode) || travelFeeForSuburb(data.suburb);
  const discountCents = Math.min(
    appliedCode?.appliedCents ?? 0,
    baseCents + travelFeeCents,
  );
  const totalCents = Math.max(0, baseCents + travelFeeCents - discountCents);

  const availableTherapists = therapistsForService(data.serviceCode).filter(
    (t) =>
      data.genderPref === "No preference" ||
      t.gender === data.genderPref.toLowerCase(),
  );
  const chosenTherapist =
    data.therapistChoice !== "match" ? getTherapist(data.therapistChoice) : undefined;

  const slots = sampleSlots(data.date);

  function onServiceChange(code: string) {
    const svc = services.find((s) => s.code === code);
    setData((d) => ({
      ...d,
      serviceCode: code,
      variantId: svc?.variants[0]?.id ?? "",
      people: code === "couples" ? 2 : d.people,
      therapistChoice:
        d.therapistChoice !== "match" &&
        getTherapist(d.therapistChoice)?.specialties.includes(code)
          ? d.therapistChoice
          : "match",
    }));
  }

  /* ---------- validation per step ---------- */

  function validateMassageStep() {
    const e: Record<string, string> = {};
    if (!data.variantId) e.variantId = "Please choose a length.";
    if (!data.date) e.date = "Please choose a date.";
    else if (data.date < new Date().toISOString().slice(0, 10))
      e.date = "Please choose today or a future date.";
    if (!data.time) e.time = "Please choose an appointment time.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateDetailsStep() {
    const e: Record<string, string> = {};
    if (data.fullName.trim().length < 2) e.fullName = "Please enter the full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      e.email = "Please enter a valid email address.";
    if (data.phone.replace(/\D/g, "").length < 8)
      e.phone = "Please enter a contact phone number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateLocationStep() {
    const e: Record<string, string> = {};
    if (data.streetAddress.trim().length < 5)
      e.streetAddress = "Please enter the street address for the massage.";
    if (data.suburb.trim().length < 2) e.suburb = "Please enter your suburb.";
    if (!/^\d{4}$/.test(data.postcode.trim()))
      e.postcode = "Please enter a 4-digit postcode.";
    if (!data.safeSpace)
      e.safeSpace =
        "Please confirm the space is safe and appropriate for a professional treatment.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePreferencesStep() {
    const e: Record<string, string> = {};
    if (!data.notesConsent)
      e.notesConsent =
        "Please consent to sharing relevant notes with your assigned therapist.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !validateMassageStep()) return;
    if (step === 2 && !validateDetailsStep()) return;
    if (step === 3 && !validateLocationStep()) return;
    if (step === 4 && !validatePreferencesStep()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    focusTop();
  }

  function back() {
    setSubmitError(undefined);
    setStep((s) => Math.max(s - 1, 0));
    focusTop();
  }

  /* ---------- gift cards & promo codes ---------- */

  function applyCode() {
    const code = codeInput.trim().toUpperCase();
    if (!code) {
      setCodeError("Enter a gift card or promo code.");
      return;
    }
    const promo = PROMO_CODES[code];
    if (promo) {
      setAppliedCode({
        type: "promo",
        code,
        label: promo.label,
        appliedCents: Math.round((baseCents + travelFeeCents) * (promo.percentOff / 100)),
      });
      setCodeError(undefined);
      return;
    }
    const card = findGiftCard(code);
    if (card && card.balanceCents > 0) {
      setAppliedCode({
        type: "gift",
        code: card.code,
        appliedCents: Math.min(card.balanceCents, baseCents + travelFeeCents),
      });
      setCodeError(undefined);
      return;
    }
    if (card) {
      setCodeError("That gift card has no remaining balance.");
    } else {
      setCodeError(
        "We couldn't find that code. Check it and try again — codes look like GIFT-XXXX-XXXX.",
      );
    }
  }

  /* ---------- review → payment ---------- */

  function goToPayment() {
    if (!data.acceptTerms) {
      setSubmitError("Please accept the booking terms to continue to payment.");
      return;
    }
    setSubmitError(undefined);
    setStep(6);
    focusTop();
  }

  function composeNotes() {
    return [
      data.unit ? `Unit/room: ${data.unit}` : "",
      data.parking ? `Parking: ${data.parking}` : "",
      data.stairs ? `Stairs: ${data.stairs}` : "",
      data.lift !== "Not applicable" ? `Lift: ${data.lift}` : "",
      data.intercom ? `Gate/intercom: ${data.intercom}` : "",
      data.entryNotes ? `Entry: ${data.entryNotes}` : "",
      data.pets ? `Pets: ${data.pets}` : "",
      data.accessibility ? `Accessibility: ${data.accessibility}` : "",
      `Pressure: ${data.pressure}`,
      data.focusAreas ? `Focus on: ${data.focusAreas}` : "",
      data.avoidAreas ? `Avoid: ${data.avoidAreas}` : "",
      data.pregnancy ? `Pregnancy: ${data.pregnancy}` : "",
      data.allergies ? `Allergies/sensitivities: ${data.allergies}` : "",
      data.mobility ? `Mobility: ${data.mobility}` : "",
      data.healthNotes ? `Health notes: ${data.healthNotes}` : "",
      data.bookingFor === "someone-else" ? "Booked on behalf of another person." : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  /* DEMO MODE — after the simulated payment, store the booking in this
     browser and show the confirmation. */
  function onPaid() {
    if (appliedCode?.type === "gift") {
      redeemGiftCard(appliedCode.code, appliedCode.appliedCents);
    }
    const booking = addDemoBooking({
      serviceCode: data.serviceCode,
      serviceName: selectedService?.name ?? "Massage",
      durationMinutes: selectedVariant?.durationMinutes ?? 0,
      priceCents: baseCents,
      travelFeeCents: travelFeeCents || undefined,
      discountCents: discountCents || undefined,
      giftCardCode: appliedCode?.type === "gift" ? appliedCode.code : undefined,
      totalCents,
      date: data.date,
      time: data.time,
      therapistId: chosenTherapist?.id,
      therapistName: chosenTherapist?.name ?? "Matched by Body Bliss",
      locationType: data.locationType,
      streetAddress: data.streetAddress.trim(),
      suburb: data.suburb.trim(),
      postcode: data.postcode.trim(),
      notes: composeNotes(),
      guestName: data.fullName.trim(),
      guestEmail: data.email.trim(),
      guestPhone: data.phone.trim(),
    });
    router.push(`/book/confirmation/${booking.id}`);
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

  const navButtons = (
    <div className="flex flex-col gap-component tablet:flex-row-reverse tablet:justify-start">
      <Button type="submit" variant="secondary" className="w-full tablet:w-auto">
        Continue
      </Button>
      {step > 0 ? (
        <Button type="button" variant="quiet" className="w-full tablet:w-auto" onClick={back}>
          <ChevronLeft aria-hidden="true" className="size-5" />
          Back
        </Button>
      ) : null}
    </div>
  );

  return (
    <div ref={topRef} className="flex flex-col gap-card-gap scroll-mt-24">
      <StepIndicator current={step} />

      {/* ---------------- Step 1: Massage & time ---------------- */}
      {step === 0 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-card-gap"
          aria-labelledby="step-massage-heading"
        >
          <div className="flex flex-col gap-compact">
            <h2 id="step-massage-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Your massage &amp; time
            </h2>
            <p className="text-description text-bb-text-description">
              Choose your treatment, length and a time that suits you.
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

          {isCouples ? (
            <p className="rounded border border-border bg-cream p-3 text-description text-bb-text-description">
              Couples massage covers two people — two therapists arrive
              together with two tables.
            </p>
          ) : (
            <SelectField
              id="people"
              label="Number of people"
              hint="For two people we run back-to-back sessions with the same therapist."
              value={String(data.people)}
              onChange={(e) => set("people", Number(e.target.value) === 2 ? 2 : 1)}
            >
              <option value="1">1 person</option>
              <option value="2">2 people (back-to-back)</option>
            </SelectField>
          )}

          <Field
            id="date"
            label="Date"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            required
            value={data.date}
            error={errors.date}
            onChange={(e) => {
              set("date", e.target.value);
              set("time", "");
            }}
          />

          {data.date && !errors.date ? (
            <fieldset className="flex flex-col gap-component">
              <legend className="text-description font-medium text-foreground">
                Available times
              </legend>
              {slots.length === 0 ? (
                <p className="rounded border border-border bg-cream p-3 text-description text-bb-text-description">
                  No appointments left on that date — try the next day, or a
                  nearby date. Availability shown is sample data for this
                  prototype.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-compact tablet:grid-cols-5">
                  {slots.map((slot) => {
                    const selected = data.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => set("time", slot)}
                        className={cn(
                          "inline-flex min-h-hit-target items-center justify-center rounded border text-description font-medium transition-colors duration-fade",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          selected
                            ? "border-transparent bg-secondary font-semibold text-secondary-foreground shadow-secondary-inner"
                            : "border-border bg-card text-bb-text-description hover:border-primary",
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
              {errors.time ? (
                <p className="text-description font-medium text-destructive" role="alert">
                  {errors.time}
                </p>
              ) : null}
              <p className="text-caption text-bb-text-caption">
                Sample availability for demonstration.
              </p>
            </fieldset>
          ) : null}

          {selectedVariant ? (
            <p className="text-description text-bb-text-description">
              Estimated price:{" "}
              <span className="font-medium text-bb-text-display">
                {formatAud(baseCents)}
              </span>{" "}
              — includes travel (metro), table and equipment.
            </p>
          ) : null}

          {navButtons}
        </form>
      )}

      {/* ---------------- Step 2: Therapist ---------------- */}
      {step === 1 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-card-gap"
          aria-labelledby="step-therapist-heading"
        >
          <div className="flex flex-col gap-compact">
            <h2 id="step-therapist-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Choose your therapist
            </h2>
            <p className="text-description text-bb-text-description">
              Let us match you automatically, or pick from the sample team.
              Profiles are fictional demonstration data.
            </p>
          </div>

          <SelectField
            id="genderPref"
            label="Therapist gender preference"
            value={data.genderPref}
            onChange={(e) => set("genderPref", e.target.value)}
          >
            <option>No preference</option>
            <option>Female</option>
            <option>Male</option>
          </SelectField>

          <fieldset className="flex flex-col gap-component">
            <legend className="sr-only">Therapist selection</legend>

            <button
              type="button"
              aria-pressed={data.therapistChoice === "match"}
              onClick={() => set("therapistChoice", "match")}
              className={cn(
                "flex items-start gap-component rounded border p-card-padding text-left transition-colors duration-fade",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                data.therapistChoice === "match"
                  ? "border-secondary bg-cream shadow-rest"
                  : "border-border bg-card hover:border-primary",
              )}
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                <Users className="size-6 text-primary" />
              </span>
              <span className="flex flex-col gap-compact">
                <span className="font-heading text-subtitle text-bb-text-subtitle">
                  Match me automatically
                  {data.therapistChoice === "match" ? (
                    <Check aria-hidden="true" className="ml-2 inline size-5 text-success" />
                  ) : null}
                </span>
                <span className="text-description text-bb-text-description">
                  We&apos;ll assign the best available approved therapist for
                  your massage, time and preferences.
                </span>
              </span>
            </button>

            {availableTherapists.map((t) => {
              const selected = data.therapistChoice === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => set("therapistChoice", t.id)}
                  className={cn(
                    "flex items-start gap-component rounded border p-card-padding text-left transition-colors duration-fade",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    selected
                      ? "border-secondary bg-cream shadow-rest"
                      : "border-border bg-card hover:border-primary",
                  )}
                >
                  <TherapistAvatar therapist={t} className="size-12 text-subtitle" />
                  <span className="flex min-w-0 flex-col gap-compact">
                    <span className="font-heading text-subtitle text-bb-text-subtitle">
                      {t.name}
                      {selected ? (
                        <Check aria-hidden="true" className="ml-2 inline size-5 text-success" />
                      ) : null}
                    </span>
                    <span className="text-description capitalize text-bb-text-description">
                      {t.gender} · {t.yearsExperience} years experience
                    </span>
                    <span className="text-description text-bb-text-description">
                      {t.shortBio}
                    </span>
                  </span>
                </button>
              );
            })}

            {availableTherapists.length === 0 ? (
              <p className="rounded border border-border bg-cream p-3 text-description text-bb-text-description">
                No sample therapist matches those preferences for this massage
                — choose &ldquo;Match me automatically&rdquo; and we&apos;ll
                assign a suitable therapist.
              </p>
            ) : null}
          </fieldset>

          {navButtons}
        </form>
      )}

      {/* ---------------- Step 3: Your details ---------------- */}
      {step === 2 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-card-gap"
          aria-labelledby="step-details-heading"
        >
          <div className="flex flex-col gap-compact">
            <h2 id="step-details-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Your details
            </h2>
            <p className="text-description text-bb-text-description">
              We only use these to confirm and manage this booking.
            </p>
          </div>

          {user ? (
            <p className="flex items-start gap-compact rounded border border-border bg-cream p-3 text-description text-bb-text-description">
              <BadgeCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
              Signed in as {user.name} ({user.email}) — details pre-filled below.
            </p>
          ) : (
            <Card variant="row" className="flex-col items-start gap-component">
              <CardDescription>
                Continue as a guest below, or sign in to save this booking to an
                account. (Sign-in is simulated in this prototype.)
              </CardDescription>
              <div className="flex flex-col gap-component tablet:flex-row">
                <Button asChild variant="quiet" className="w-full tablet:w-auto">
                  <Link href="/login?next=/book">Sign in</Link>
                </Button>
                <Button asChild variant="quiet" className="w-full tablet:w-auto">
                  <Link href="/signup?next=/book">Create account</Link>
                </Button>
              </div>
            </Card>
          )}

          <SelectField
            id="bookingFor"
            label="Who is this booking for?"
            value={data.bookingFor}
            onChange={(e) =>
              set("bookingFor", e.target.value as BookingState["bookingFor"])
            }
          >
            <option value="myself">Myself</option>
            <option value="someone-else">Someone else</option>
          </SelectField>

          <Field
            id="fullName"
            label={data.bookingFor === "myself" ? "Full name" : "Recipient's full name"}
            autoComplete="name"
            required
            value={data.fullName}
            error={errors.fullName}
            onChange={(e) => set("fullName", e.target.value)}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            hint="Your booking confirmation goes here."
            inputMode="email"
            autoComplete="email"
            required
            value={data.email}
            error={errors.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <Field
            id="phone"
            label="Mobile number"
            hint="So your therapist can reach you on the day."
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={data.phone}
            error={errors.phone}
            onChange={(e) => set("phone", e.target.value)}
          />

          {navButtons}
        </form>
      )}

      {/* ---------------- Step 4: Location & access ---------------- */}
      {step === 3 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-card-gap"
          aria-labelledby="step-location-heading"
        >
          <div className="flex flex-col gap-compact">
            <h2 id="step-location-heading" className="font-heading text-title font-semibold text-bb-text-title">
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

          {travelFeeCents > 0 ? (
            <p className="rounded border border-border bg-cream p-3 text-description text-bb-text-description" role="status">
              A {formatAud(travelFeeCents)} travel fee applies for this suburb —
              it&apos;s included in your total before you pay.
            </p>
          ) : null}

          <Field
            id="unit"
            label="Unit, apartment or hotel room"
            hint="Optional — unit number, room number, floor."
            value={data.unit}
            onChange={(e) => set("unit", e.target.value)}
          />

          <FieldTextarea
            id="parking"
            label="Parking information"
            hint="Where can the therapist park? Driveway, street, visitor bay, etc."
            value={data.parking}
            onChange={(e) => set("parking", e.target.value)}
          />

          <div className="grid grid-cols-1 gap-component tablet:grid-cols-2">
            <SelectField
              id="stairs"
              label="Stairs"
              value={data.stairs}
              onChange={(e) => set("stairs", e.target.value)}
            >
              {STAIRS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectField>
            <SelectField
              id="lift"
              label="Lift access"
              value={data.lift}
              onChange={(e) => set("lift", e.target.value)}
            >
              {LIFT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectField>
          </div>

          <Field
            id="intercom"
            label="Gate or intercom instructions"
            hint="Buzzer number, gate code, or 'call on arrival'."
            value={data.intercom}
            onChange={(e) => set("intercom", e.target.value)}
          />

          <FieldTextarea
            id="entryNotes"
            label="Entry notes"
            hint="Which entrance, landmarks, anything that helps us find you."
            value={data.entryNotes}
            onChange={(e) => set("entryNotes", e.target.value)}
          />

          <Field
            id="pets"
            label="Pets"
            hint="e.g. 'Friendly dog — will be in the yard.'"
            value={data.pets}
            onChange={(e) => set("pets", e.target.value)}
          />

          <FieldTextarea
            id="accessibility"
            label="Accessibility requirements"
            hint="Anything we should adjust for access or mobility. Optional."
            value={data.accessibility}
            onChange={(e) => set("accessibility", e.target.value)}
          />

          <div className="flex flex-col gap-compact">
            <label className="flex items-start gap-component">
              <Checkbox
                checked={data.safeSpace}
                onCheckedChange={(v) => set("safeSpace", v === true)}
                aria-describedby="safe-space-text"
                className="mt-0.5"
              />
              <span id="safe-space-text" className="text-description text-bb-text-description">
                I confirm the space is safe, clean and appropriate for a
                professional massage treatment.
              </span>
            </label>
            {errors.safeSpace ? (
              <p className="text-description font-medium text-destructive" role="alert">
                {errors.safeSpace}
              </p>
            ) : null}
          </div>

          {navButtons}
        </form>
      )}

      {/* ---------------- Step 5: Treatment preferences ---------------- */}
      {step === 4 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="flex flex-col gap-card-gap"
          aria-labelledby="step-prefs-heading"
        >
          <div className="flex flex-col gap-compact">
            <h2 id="step-prefs-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Treatment preferences
            </h2>
            <p className="text-description text-bb-text-description">
              Help your therapist tailor the session. Everything here is
              optional except the consent at the end.
            </p>
          </div>

          <SelectField
            id="pressure"
            label="Preferred pressure"
            value={data.pressure}
            onChange={(e) => set("pressure", e.target.value)}
          >
            {PRESSURE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </SelectField>

          <Field
            id="focusAreas"
            label="Areas to focus on"
            hint="e.g. shoulders, lower back, legs."
            value={data.focusAreas}
            onChange={(e) => set("focusAreas", e.target.value)}
          />
          <Field
            id="avoidAreas"
            label="Areas to avoid"
            hint="Anywhere you'd prefer not to be massaged."
            value={data.avoidAreas}
            onChange={(e) => set("avoidAreas", e.target.value)}
          />
          <Field
            id="pregnancy"
            label="Pregnancy"
            hint="If pregnant, how many weeks? We only book pregnancy massage from 12 weeks."
            value={data.pregnancy}
            onChange={(e) => set("pregnancy", e.target.value)}
          />
          <Field
            id="allergies"
            label="Allergies or sensitivities"
            hint="e.g. nut oils, fragrances, latex."
            value={data.allergies}
            onChange={(e) => set("allergies", e.target.value)}
          />
          <Field
            id="mobility"
            label="Mobility requirements"
            hint="e.g. difficulty lying flat, need help getting on the table."
            value={data.mobility}
            onChange={(e) => set("mobility", e.target.value)}
          />
          <FieldTextarea
            id="healthNotes"
            label="Health notes (optional)"
            hint="Injuries, conditions or recent surgery you'd like your therapist to know about. Share only what you're comfortable with."
            value={data.healthNotes}
            onChange={(e) => set("healthNotes", e.target.value)}
          />

          <p className="flex items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description">
            <Lock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              Massage supports general wellbeing — this website doesn&apos;t
              provide medical advice. If you&apos;re managing a health
              condition, recovering from surgery, or your pregnancy is
              high-risk, please check with your health practitioner before
              booking.
            </span>
          </p>

          <div className="flex flex-col gap-compact">
            <label className="flex items-start gap-component">
              <Checkbox
                checked={data.notesConsent}
                onCheckedChange={(v) => set("notesConsent", v === true)}
                aria-describedby="notes-consent-text"
                className="mt-0.5"
              />
              <span id="notes-consent-text" className="text-description text-bb-text-description">
                I consent to the relevant notes above being shared with my
                assigned therapist so they can prepare for the appointment. See
                our{" "}
                <Link href="/privacy" className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  privacy policy
                </Link>
                .
              </span>
            </label>
            {errors.notesConsent ? (
              <p className="text-description font-medium text-destructive" role="alert">
                {errors.notesConsent}
              </p>
            ) : null}
          </div>

          {navButtons}
        </form>
      )}

      {/* ---------------- Step 6: Review ---------------- */}
      {step === 5 && (
        <div className="flex flex-col gap-card-gap" aria-labelledby="step-review-heading">
          <div className="flex flex-col gap-compact">
            <h2 id="step-review-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Review your booking
            </h2>
            <p className="text-description text-bb-text-description">
              Check the details below before you continue to payment.
            </p>
          </div>

          <Card className="flex flex-col gap-card-gap">
            <ReviewRow label="Massage" value={selectedService?.name ?? "—"} />
            <ReviewRow
              label="Length"
              value={
                selectedVariant
                  ? `${selectedVariant.durationMinutes} min${!isCouples && data.people === 2 ? " × 2 people" : ""}`
                  : "—"
              }
            />
            <ReviewRow label="Date" value={data.date || "—"} />
            <ReviewRow label="Time" value={data.time || "—"} />
            <ReviewRow
              label="Therapist"
              value={
                chosenTherapist
                  ? `${chosenTherapist.name} (sample profile)`
                  : "Matched by Body Bliss"
              }
            />
            <ReviewRow label="For" value={data.fullName || "—"} />
            <ReviewRow
              label="Address"
              value={`${data.unit ? `${data.unit}, ` : ""}${data.streetAddress}, ${data.suburb} ${data.postcode}`}
            />
            <ReviewRow
              label="Preferences"
              value={[
                `${data.pressure} pressure`,
                data.focusAreas && `focus: ${data.focusAreas}`,
                data.avoidAreas && `avoid: ${data.avoidAreas}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            />
            <ReviewRow label="Massage price" value={formatAud(baseCents)} />
            {travelFeeCents > 0 ? (
              <ReviewRow label="Travel fee" value={formatAud(travelFeeCents)} />
            ) : null}
            {discountCents > 0 && appliedCode ? (
              <ReviewRow
                label={appliedCode.type === "gift" ? "Gift card" : "Promo code"}
                value={`−${formatAud(discountCents)} (${appliedCode.code})`}
              />
            ) : null}
            <ReviewRow label="Total" value={formatAud(totalCents)} emphasis />
          </Card>

          {/* Gift card / promo code */}
          <Card className="flex flex-col gap-component">
            <div className="flex items-center gap-component">
              <Gift aria-hidden="true" className="size-5 text-primary" />
              <CardTitle className="text-subtitle">Gift card or promo code</CardTitle>
            </div>
            {appliedCode ? (
              <div className="flex flex-wrap items-center justify-between gap-component">
                <p className="text-description text-bb-text-description" role="status">
                  <span className="font-medium text-bb-text-display">
                    {appliedCode.code}
                  </span>{" "}
                  applied — you save {formatAud(discountCents)}.
                </p>
                <Button
                  type="button"
                  variant="quiet"
                  onClick={() => {
                    setAppliedCode(null);
                    setCodeInput("");
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-component tablet:flex-row tablet:items-end">
                <Field
                  id="codeInput"
                  label="Code"
                  hint="Try the demo gift card GIFT-DEMO-2026 or promo WELCOME10."
                  autoComplete="off"
                  value={codeInput}
                  error={codeError}
                  onChange={(e) => setCodeInput(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="quiet"
                  className="w-full border border-border tablet:w-auto"
                  onClick={applyCode}
                >
                  Apply code
                </Button>
              </div>
            )}
          </Card>

          <p className="flex items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
            <span>
              Free cancellation until your therapist is on the way. Payment is
              simulated in this demo — nothing is ever charged.
            </span>
          </p>

          <label className="flex items-start gap-component">
            <Checkbox
              checked={data.acceptTerms}
              onCheckedChange={(v) => set("acceptTerms", v === true)}
              aria-describedby="terms-text"
              className="mt-0.5"
            />
            <span id="terms-text" className="text-description text-bb-text-description">
              I agree to the{" "}
              <Link href="/terms" className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                booking terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                privacy policy
              </Link>
              .
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
              onClick={goToPayment}
            >
              {totalCents === 0 ? "Continue" : "Continue to payment"}
            </Button>
            <Button type="button" variant="quiet" className="w-full tablet:w-auto" onClick={back}>
              <ChevronLeft aria-hidden="true" className="size-5" />
              Back
            </Button>
          </div>
        </div>
      )}

      {/* ---------------- Step 7: Payment ---------------- */}
      {step === 6 && (
        <div className="flex flex-col gap-card-gap" aria-labelledby="step-pay-heading">
          <div className="flex flex-col gap-compact">
            <h2 id="step-pay-heading" className="font-heading text-title font-semibold text-bb-text-title">
              Payment
            </h2>
            <p className="text-description text-bb-text-description">
              {selectedService?.name}, {selectedVariant?.durationMinutes} min ·{" "}
              {data.date} at {data.time}
            </p>
          </div>

          {totalCents === 0 ? (
            <Card className="flex flex-col items-start gap-component">
              <CardTitle className="text-subtitle">Nothing to pay</CardTitle>
              <CardDescription>
                Your gift card covers the full amount. Confirm below to complete
                this demonstration booking.
              </CardDescription>
              <Button type="button" variant="secondary" onClick={onPaid}>
                Complete Demo Booking
              </Button>
            </Card>
          ) : (
            <PaymentForm
              amountCents={totalCents}
              buttonLabel={`Complete Demo Booking — ${formatAud(totalCents)}`}
              onPaid={onPaid}
            />
          )}

          <div>
            <Button type="button" variant="quiet" onClick={back}>
              <ChevronLeft aria-hidden="true" className="size-5" />
              Back to review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
  Booking progress — an accessible progress bar. Screen readers get a real
  progressbar with aria-valuetext ("Step 3 of 7: Details"); sighted users
  get the step name, the count, and a smoothly animating gold fill (the
  global reduced-motion rule zeroes the transition).
*/
function StepIndicator({ current }: { current: number }) {
  const percent = Math.round(((current + 1) / STEPS.length) * 100);
  return (
    <div className="flex flex-col gap-compact">
      <div className="flex items-baseline justify-between gap-component">
        <p className="font-heading text-subtitle font-semibold text-bb-text-display">
          {STEPS[current]}
        </p>
        <p className="text-description text-bb-text-description">
          Step {current + 1} of {STEPS.length}
        </p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={current + 1}
        aria-valuetext={`Step ${current + 1} of ${STEPS.length}: ${STEPS[current]}`}
        aria-label="Booking progress"
        className="h-2.5 w-full overflow-hidden rounded-full bg-linen"
      >
        <div
          className="h-full rounded-full bg-secondary transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-caption text-bb-text-caption" aria-hidden="true">
        {percent}% complete
      </p>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex flex-col gap-compact border-b border-border pb-component last:border-0 last:pb-0 tablet:flex-row tablet:gap-card-gap">
      <span className="text-description font-medium text-bb-text-display tablet:w-40 tablet:shrink-0">
        {label}
      </span>
      <span
        className={cn(
          "text-description",
          emphasis
            ? "font-heading text-subtitle font-semibold text-bb-text-display"
            : "text-bb-text-description",
        )}
      >
        {value}
      </span>
    </div>
  );
}
