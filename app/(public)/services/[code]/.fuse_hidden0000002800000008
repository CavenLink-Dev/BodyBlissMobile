import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Clock,
  HeartHandshake,
  Info,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServicesWithPricing, getComingSoonService } from "@/lib/catalogue";
import { NotifyMe } from "@/components/notify-me";
import {
  getServiceDetail,
  getServiceFaqs,
  PREPARATION_STEPS,
  SEEK_ADVICE,
} from "@/lib/service-details";
import { formatAud } from "@/lib/format";

/*
  Service detail — everything a customer needs to decide: what's included,
  how it may help, who it suits, things to consider, and every duration
  with its price. Each duration links straight into the booking
  flow with the service (and length) pre-selected.
*/

type Params = Promise<{ code: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { code } = await params;
  const comingSoon = getComingSoonService(code);
  if (comingSoon) {
    return {
      title: `${comingSoon.name} (coming soon) | Body Bliss`,
      description: comingSoon.description,
    };
  }
  const services = await getServicesWithPricing();
  const service = services.find((s) => s.code === code);
  // 404 here (before streaming starts) so unknown services return a real 404.
  if (!service) notFound();
  return {
    title: `${service.name} | Body Bliss Mobile Massage`,
    description: `${service.description} Durations, prices and what's included. A vetted therapist comes to you across Adelaide.`,
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { code } = await params;

  const comingSoon = getComingSoonService(code);
  if (comingSoon) {
    return (
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-content flex-col gap-section">
          <nav aria-label="Breadcrumb">
            <Link
              href="/services"
              className="inline-flex min-h-hit-target items-center gap-compact text-nav font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All services &amp; prices
            </Link>
          </nav>

          <header className="flex flex-col gap-component">
            <Badge variant="secondary" className="w-fit">Coming Soon</Badge>
            <h1 className="font-heading text-display text-bb-text-display">
              {comingSoon.name}
            </h1>
            <p className="max-w-prose text-subtitle text-bb-text-subtitle">
              {comingSoon.description}
            </p>
            <p className="max-w-prose text-description text-bb-text-description">
              We&apos;re bringing qualified practitioners on board now, with the
              same approval process, upfront pricing and at-home convenience as
              our massage services. Leave your email and you&apos;ll be first to
              know when bookings open.
            </p>
          </header>

          <NotifyMe treatment={comingSoon.name} />

          <section aria-labelledby="meanwhile-heading">
            <Card variant="highlight" className="flex flex-col items-start gap-component">
              <h2
                id="meanwhile-heading"
                className="font-heading text-title font-semibold text-primary-foreground"
              >
                In The Meantime
              </h2>
              <p className="max-w-prose text-description text-primary-foreground">
                Our mobile massage services are available now across Adelaide,
                including remedial and deep tissue work for problem areas.
              </p>
              <Button asChild variant="secondary">
                <Link href="/services">Browse Massage Services</Link>
              </Button>
            </Card>
          </section>
        </div>
      </main>
    );
  }

  const services = await getServicesWithPricing();
  const service = services.find((s) => s.code === code);
  if (!service) notFound();

  const detail = getServiceDetail(service.code);

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        {/* Breadcrumb / back */}
        <nav aria-label="Breadcrumb">
          <Link
            href="/services"
            className="inline-flex min-h-hit-target items-center gap-compact text-nav font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All services &amp; prices
          </Link>
        </nav>

        {/* Header */}
        <header className="flex flex-col gap-component">
          <div className="flex flex-wrap items-center gap-component">
            <h1 className="font-heading text-display text-bb-text-display">
              {service.name}
            </h1>
            {service.fromPriceCents != null ? (
              <Badge variant="secondary">from {formatAud(service.fromPriceCents)}</Badge>
            ) : null}
          </div>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            {detail.tagline}
          </p>
          <p className="max-w-prose text-description text-bb-text-description">
            {detail.intro}
          </p>
        </header>

        {/* Durations & prices, the decision point */}
        <section aria-labelledby="durations-heading" className="flex flex-col gap-card-gap">
          <h2
            id="durations-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Choose Your Length
          </h2>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
            {service.variants.map((v) => (
              <Card key={v.id} className="flex h-full flex-col gap-component">
                <div className="flex items-center gap-compact">
                  <Clock aria-hidden="true" className="size-5 text-primary" />
                  <CardTitle className="text-subtitle">
                    {v.durationMinutes} minutes
                  </CardTitle>
                </div>
                <p className="flex-1 font-heading text-title font-semibold text-bb-text-display">
                  {formatAud(v.priceCents)}
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link
                    href={`/book?service=${service.code}&variant=${v.id}`}
                    aria-label={`Book ${service.name}, ${v.durationMinutes} minutes`}
                  >
                    Select &amp; Book
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
          <p className="text-caption text-bb-text-caption">
            Prices include travel, the massage table and all equipment. No hidden fees.
          </p>
        </section>

        {/* What's included / how it may help */}
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
          <section aria-labelledby="includes-heading">
            <Card className="flex h-full flex-col gap-card-gap">
              <div className="flex items-center gap-component">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <Sparkles className="size-6 text-primary" />
                </span>
                <h2
                  id="includes-heading"
                  className="font-heading text-subtitle text-bb-text-subtitle"
                >
                  What&apos;s included
                </h2>
              </div>
              <ul className="flex flex-col gap-component">
                {detail.includes.map((item) => (
                  <li key={item} className="flex items-start gap-compact">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-success"
                    />
                    <span className="text-description text-bb-text-description">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section aria-labelledby="help-heading">
            <Card className="flex h-full flex-col gap-card-gap">
              <div className="flex items-center gap-component">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <HeartHandshake className="size-6 text-primary" />
                </span>
                <h2
                  id="help-heading"
                  className="font-heading text-subtitle text-bb-text-subtitle"
                >
                  How it may help
                </h2>
              </div>
              <ul className="flex flex-col gap-component">
                {detail.mayHelp.map((item) => (
                  <li key={item} className="flex items-start gap-compact">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-success"
                    />
                    <span className="text-description text-bb-text-description">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-caption text-bb-text-caption">
                Massage supports general wellbeing, it isn&apos;t a medical
                treatment or a substitute for professional health advice.
              </p>
            </Card>
          </section>
        </div>

        {/* Who it suits / considerations */}
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
          <section aria-labelledby="suits-heading">
            <Card className="flex h-full flex-col gap-card-gap">
              <div className="flex items-center gap-component">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <BadgeCheck className="size-6 text-primary" />
                </span>
                <h2
                  id="suits-heading"
                  className="font-heading text-subtitle text-bb-text-subtitle"
                >
                  Who it&apos;s for
                </h2>
              </div>
              <ul className="flex flex-col gap-component">
                {detail.suitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-compact">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-success"
                    />
                    <span className="text-description text-bb-text-description">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section aria-labelledby="considerations-heading">
            <Card className="flex h-full flex-col gap-card-gap">
              <div className="flex items-center gap-component">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <Info className="size-6 text-primary" />
                </span>
                <h2
                  id="considerations-heading"
                  className="font-heading text-subtitle text-bb-text-subtitle"
                >
                  Good to know
                </h2>
              </div>
              <ul className="flex flex-col gap-component">
                {detail.considerations.map((item) => (
                  <li key={item} className="flex items-start gap-compact">
                    <Info
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-description text-bb-text-description">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        </div>

        {/* Preparation & medical guidance */}
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
          <section aria-labelledby="prep-heading">
            <Card className="flex h-full flex-col gap-card-gap">
              <h2
                id="prep-heading"
                className="font-heading text-subtitle text-bb-text-subtitle"
              >
                Getting ready
              </h2>
              <ul className="flex flex-col gap-component">
                {PREPARATION_STEPS.map((item) => (
                  <li key={item} className="flex items-start gap-compact">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-success"
                    />
                    <span className="text-description text-bb-text-description">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <section aria-labelledby="advice-heading">
            <Card className="flex h-full flex-col gap-card-gap">
              <h2
                id="advice-heading"
                className="font-heading text-subtitle text-bb-text-subtitle"
              >
                Check with your health practitioner first if…
              </h2>
              <ul className="flex flex-col gap-component">
                {SEEK_ADVICE.map((item) => (
                  <li key={item} className="flex items-start gap-compact">
                    <Info
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-description text-bb-text-description">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-caption text-bb-text-caption">
                This website doesn&apos;t provide medical advice, when in
                doubt, ask your doctor or health practitioner.
              </p>
            </Card>
          </section>
        </div>

        {/* Service FAQs */}
        <section aria-labelledby="service-faq-heading" className="flex flex-col gap-card-gap">
          <h2
            id="service-faq-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Common Questions
          </h2>
          <div className="flex flex-col gap-component">
            {getServiceFaqs(service.code).map((f) => (
              <details
                key={f.q}
                className="group rounded border border-border bg-card p-card-padding"
              >
                <summary className="flex min-h-hit-target cursor-pointer list-none items-center justify-between gap-component font-heading text-subtitle text-bb-text-subtitle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  {f.q}
                </summary>
                <p className="mt-component max-w-prose text-description text-bb-text-description">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Other services */}
        {services.length > 1 ? (
          <section aria-labelledby="other-heading" className="flex flex-col gap-card-gap">
            <h2
              id="other-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Other Massages
            </h2>
            <ul className="flex flex-wrap gap-compact">
              {services
                .filter((s) => s.code !== service.code)
                .map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.code}`}
                      className="inline-flex min-h-hit-target items-center rounded-full border border-border bg-card px-4 text-description text-bb-text-description transition-colors duration-fade hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ) : null}

        {/* CTA */}
        <section aria-labelledby="detail-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="detail-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Ready For Your {service.name}?
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Book in a couple of minutes. A vetted therapist brings everything
              needed, and the price shown is all-inclusive.
            </p>
            <Button asChild variant="secondary">
              <Link href={`/book?service=${service.code}`}>Book Now</Link>
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}
