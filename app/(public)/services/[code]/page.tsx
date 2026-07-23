import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServicesWithPricing, getComingSoonService } from "@/lib/catalogue";
import { NotifyMe } from "@/components/notify-me";
import {
  getServiceDetail,
  getServiceFaqs,
  PREPARATION_STEPS,
  SEEK_ADVICE,
} from "@/lib/service-details";
import { ServiceIllustration } from "@/components/service-illustrations";
import { formatAud } from "@/lib/format";

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
  if (!service) notFound();
  return {
    title: `${service.name} | Body Bliss Mobile Massage`,
    description: `${service.description} A vetted therapist comes to you across Adelaide.`,
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { code } = await params;

  /* ── Coming-soon treatment ── */
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
              <Button asChild variant="primary">
                <Link href="/services">Browse Massage Services</Link>
              </Button>
            </Card>
          </section>
        </div>
      </main>
    );
  }

  /* ── Active service detail ── */
  const services = await getServicesWithPricing();
  const service = services.find((s) => s.code === code);
  if (!service) notFound();

  const detail = getServiceDetail(service.code);
  const faqs = getServiceFaqs(service.code);

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        {/* Back */}
        <nav aria-label="Breadcrumb">
          <Link
            href="/services"
            className="inline-flex min-h-hit-target items-center gap-compact text-nav font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All services &amp; prices
          </Link>
        </nav>

        {/* Hero */}
        <header className="flex flex-col gap-component">
          <div className="w-full max-w-lg overflow-hidden rounded border border-border shadow-rest">
            <ServiceIllustration code={service.code} />
          </div>
          <h1 className="font-heading text-display text-bb-text-display">
            {service.name}
          </h1>
          <p className="text-subtitle text-bb-text-subtitle">
            {detail.tagline}
          </p>
          <p className="text-description text-bb-text-description">
            {detail.intro}
          </p>

          {/* Pricing */}
          {service.variants.length > 0 && (
            <ul className="flex flex-col divide-y divide-border rounded border border-border bg-card">
              {service.variants.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-component px-card-padding py-3"
                >
                  <span className="text-description text-bb-text-description">
                    {v.durationMinutes} minutes
                  </span>
                  <span className="text-subtitle font-semibold text-bb-text-title">
                    {formatAud(v.priceCents)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Button asChild variant="primary" className="w-full tablet:w-fit">
            <Link href={`/book?service=${service.code}`}>Book Now</Link>
          </Button>
          <p className="text-caption text-bb-text-caption">
            Everything is included — travel, the table and all equipment.
          </p>
        </header>

        {/* Clean single-column info sections */}
        <InfoSection id="includes-heading" title="What's Included" items={detail.includes} />

        <InfoSection
          id="help-heading"
          title="How It May Help"
          items={detail.mayHelp}
          note="Massage supports general wellbeing — it isn't a medical treatment or a substitute for professional health advice."
        />

        <InfoSection id="suits-heading" title="Who It's For" items={detail.suitableFor} />

        <InfoSection id="considerations-heading" title="Good to Know" items={detail.considerations} />

        <InfoSection id="prep-heading" title="Getting Ready" items={PREPARATION_STEPS} />

        <InfoSection
          id="advice-heading"
          title="Check With Your Practitioner First If…"
          items={SEEK_ADVICE}
          note="This website doesn't provide medical advice — when in doubt, ask your doctor or health practitioner."
        />

        {/* FAQs */}
        {faqs.length > 0 && (
          <section aria-labelledby="service-faq-heading" className="flex flex-col gap-card-gap">
            <h2
              id="service-faq-heading"
              className="font-heading text-subtitle font-semibold text-bb-text-title"
            >
              Common Questions
            </h2>
            <div className="flex flex-col gap-component">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded border border-border bg-card p-card-padding"
                >
                  <summary className="flex min-h-hit-target cursor-pointer list-none items-center justify-between gap-component font-heading text-subtitle text-bb-text-subtitle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    {f.q}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 shrink-0 transition-transform duration-fade group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-component max-w-prose text-description text-bb-text-description">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Other services */}
        {services.length > 1 && (
          <section aria-labelledby="other-heading" className="flex flex-col gap-card-gap">
            <h2
              id="other-heading"
              className="font-heading text-subtitle font-semibold text-bb-text-title"
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
        )}

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
              Book in a couple of minutes. Pick your length, see the price, and
              a vetted therapist brings everything needed.
            </p>
            <Button asChild variant="primary">
              <Link href={`/book?service=${service.code}`}>Book Now</Link>
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}

/* Clean, consistent info section: a calm heading + tidy bullet list. */
function InfoSection({
  id,
  title,
  items,
  note,
}: {
  id: string;
  title: string;
  items: readonly string[];
  note?: string;
}) {
  return (
    <section className="flex flex-col gap-component" aria-labelledby={id}>
      <h2
        id={id}
        className="font-heading text-subtitle font-semibold text-bb-text-title"
      >
        {title}
      </h2>
      <ul className="flex flex-col gap-compact">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-component text-description text-bb-text-description"
          >
            <span
              aria-hidden="true"
              className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-primary/60"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="text-caption text-bb-text-caption">{note}</p>
      ) : null}
    </section>
  );
}
