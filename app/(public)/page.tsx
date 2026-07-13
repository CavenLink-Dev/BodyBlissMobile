import Link from "next/link";
import {
  CalendarCheck,
  MapPin,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  Lock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ServicesCarousel } from "@/components/services-carousel";
import { BookNowBar } from "@/components/book-now-bar";
import { Reveal } from "@/components/reveal";
import { getServicesWithPricing } from "@/lib/catalogue";

/*
  Home — mobile-first, adapted from the service-booking layout in the Figma
  reference. Order: hero (prominent Book Now) → trust strip → services + live
  pricing → how it works → why choose → therapist preview (honest, no fake
  profiles) → reviews (clearly-labelled sample) → preparation → FAQ → final CTA.
  No invented safety claims; pricing is indicative and labelled.
*/

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Choose your massage",
    body: "Pick the massage, length and time that suits you.",
  },
  {
    icon: MapPin,
    title: "Tell us where",
    body: "Add your address, parking and access notes so your therapist arrives ready.",
  },
  {
    icon: Sparkles,
    title: "Relax at your place",
    body: "A vetted therapist brings everything needed. Afterwards you can rebook in seconds.",
  },
];

const TRUST = [
  {
    icon: BadgeCheck,
    title: "Reviewed & approved therapists",
    body: "Therapists are reviewed and approved before they can take bookings — only approved therapists ever appear.",
  },
  {
    icon: CreditCard,
    title: "Confirmed before you pay",
    body: "You see the price up front and it's confirmed before payment. No hidden fees.",
  },
  {
    icon: Lock,
    title: "Your details stay private",
    body: "Your exact address is only shared with your therapist once your booking is confirmed.",
  },
  {
    icon: ShieldCheck,
    title: "Support if you need it",
    body: "Real support and a way to report any concern about a booking.",
  },
];

const PREP = [
  "A quiet room with a little space to set up a massage table.",
  "Somewhere to park, or a note on where to park nearby.",
  "Let us know about pets, stairs or access ahead of time.",
];

const FAQS = [
  {
    q: "Where do you operate?",
    a: "Across the Adelaide metro area. You can check your suburb when you book.",
  },
  {
    q: "Do I need my own massage table?",
    a: "No. Your therapist brings a professional massage table, linens and everything needed.",
  },
  {
    q: "Can I choose my therapist?",
    a: "Yes. You can let us match you with the best available therapist, or choose one yourself during booking.",
  },
  {
    q: "When am I charged?",
    a: "Prices are indicative until your booking is confirmed. For now bookings are sent as a request and payment is arranged on confirmation.",
  },
  {
    q: "What if I need to cancel?",
    a: "You can manage or cancel a booking from your account. Cancellation terms are shown before you confirm.",
  },
];

export default async function Home() {
  const services = await getServicesWithPricing();

  return (
    <>
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-content flex-col gap-section">
          {/* Hero */}
          <section className="flex flex-col gap-card-gap" aria-labelledby="hero-heading">
            <span className="inline-flex w-fit items-center gap-compact rounded-full border border-border bg-card px-3 py-1 text-description font-medium text-bb-text-description">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              Mobile massage across Adelaide
            </span>
            <h1 id="hero-heading" className="font-heading text-display text-bb-text-display">
              Massage That Comes To You
            </h1>
            <p className="max-w-prose text-subtitle text-bb-text-subtitle">
              Book a vetted massage therapist to your home, hotel or workplace —
              backed by nine years of Body Bliss massage and wellness experience.
            </p>
            <div className="mt-1 flex flex-col gap-component tablet:flex-row">
              <Button asChild variant="secondary" className="w-full tablet:w-auto">
                <Link href="/book">Book Now</Link>
              </Button>
              <Button asChild variant="quiet" className="w-full tablet:w-auto">
                <Link href="/gift-cards">Buy a Gift Card</Link>
              </Button>
            </div>
            {/* quick trust strip */}
            <ul className="mt-1 flex flex-wrap gap-compact">
              {["Reviewed therapists", "Confirmed before you pay", "Adelaide metro"].map(
                (t) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-compact rounded-full bg-muted px-3 py-1 text-description text-bb-text-description"
                  >
                    <BadgeCheck aria-hidden="true" className="size-4 text-primary" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </section>

          {/* Services + live pricing */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="services-heading">
            <div className="flex items-end justify-between gap-component">
              <h2
                id="services-heading"
                className="font-heading text-title font-semibold text-bb-text-title"
              >
                Our Massages
              </h2>
              <Link
                href="/services"
                className="inline-flex min-h-hit-target items-center gap-compact text-nav font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                All prices
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            {services.length === 0 ? (
              <Card>
                <CardDescription>
                  Our services are being finalised and will appear here shortly.
                </CardDescription>
              </Card>
            ) : (
              <ServicesCarousel services={services} />
            )}
            <p className="text-caption text-bb-text-caption">
              Prices are indicative and confirmed before you pay.
            </p>
          </section>
          </Reveal>

          {/* How It Works */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="how-heading">
            <h2
              id="how-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              How It Works
            </h2>
            <ol className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <Card className="flex h-full flex-col gap-component">
                    <div className="flex items-center gap-component">
                      <span
                        className="inline-flex size-12 items-center justify-center rounded-full bg-secondary"
                        aria-hidden="true"
                      >
                        <step.icon className="size-6 text-secondary-foreground" />
                      </span>
                      <span className="font-heading text-subtitle text-bb-text-subtitle">
                        Step {i + 1}
                      </span>
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.body}</CardDescription>
                  </Card>
                </li>
              ))}
            </ol>
          </section>
          </Reveal>

          {/* Why choose */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="trust-heading">
            <h2
              id="trust-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Why Choose Body Bliss
            </h2>
            <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
              {TRUST.map((item) => (
                <Card key={item.title} variant="row" className="items-start">
                  <span
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-muted"
                    aria-hidden="true"
                  >
                    <item.icon className="size-6 text-primary" />
                  </span>
                  <div className="flex flex-col gap-compact">
                    <CardTitle className="text-subtitle">{item.title}</CardTitle>
                    <CardDescription>{item.body}</CardDescription>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          </Reveal>

          {/* Therapist preview — honest, no fabricated profiles */}
          <Reveal>
          <section aria-labelledby="therapists-heading">
            <Card className="flex flex-col items-start gap-component">
              <h2
                id="therapists-heading"
                className="font-heading text-title font-semibold text-bb-text-title"
              >
                Our Therapists
              </h2>
              <p className="max-w-prose text-description text-bb-text-description">
                Every therapist is reviewed and approved before they can take
                bookings. When you book, you can see who&apos;s available and
                choose for yourself, or let us match you.
              </p>
              <Button asChild variant="quiet">
                <Link href="/therapists">Learn about our therapists</Link>
              </Button>
            </Card>
          </section>
          </Reveal>

          {/* Reviews (labelled sample) */}
          <Reveal>
          <div className="flex flex-col gap-compact">
            <TestimonialsCarousel />
            <p className="text-caption text-bb-text-caption">
              Sample reviews shown for layout — real customer reviews appear here
              once booking opens.
            </p>
          </div>
          </Reveal>

          {/* Preparation guidance */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="prep-heading">
            <h2
              id="prep-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Getting Ready
            </h2>
            <Card variant="row" className="items-start">
              <ul className="flex flex-col gap-component">
                {PREP.map((p) => (
                  <li key={p} className="flex items-start gap-component">
                    <BadgeCheck
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-success"
                    />
                    <span className="text-description text-bb-text-description">{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
          </Reveal>

          {/* FAQ — accessible native accordion */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-component">
              {FAQS.map((f) => (
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
                  <p className="mt-component text-description text-bb-text-description">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
          </Reveal>

          {/* Final CTA */}
          <Reveal>
          <section aria-labelledby="cta-heading">
            <Card variant="highlight" className="flex flex-col items-start gap-card-gap">
              <h2
                id="cta-heading"
                className="font-heading text-title font-semibold text-primary-foreground"
              >
                Ready When You Are
              </h2>
              <p className="max-w-prose text-description text-primary-foreground">
                Book a vetted therapist to your door, or treat someone with a
                Body Bliss gift card.
              </p>
              <div className="flex flex-col gap-component tablet:flex-row">
                <Button asChild variant="secondary" className="w-full tablet:w-auto">
                  <Link href="/book">Book Now</Link>
                </Button>
                <Button
                  asChild
                  variant="quiet"
                  className="w-full text-primary-foreground active:bg-primary-foreground/10 tablet:w-auto"
                >
                  <Link href="/gift-cards">Buy a Gift Card</Link>
                </Button>
              </div>
            </Card>
          </section>
          </Reveal>
        </div>
      </main>

      <BookNowBar />
    </>
  );
}
