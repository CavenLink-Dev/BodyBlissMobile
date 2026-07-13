import Link from "next/link";
import {
  CalendarCheck,
  MapPin,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { BookNowBar } from "@/components/book-now-bar";
import { SERVICES } from "@/lib/content";

/*
  Home — mobile-first. Order mirrors the brief: hero (prominent Book Now) →
  How It Works → testimonials carousel → why trust Body Bliss → services →
  repeated Book Now. No invented pricing, policy wording or availability
  claims. The nine-years signal is used in the hero + About only.
*/

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Tell us what you need",
    body: "Choose your massage, when you'd like it, and where — home, hotel or workplace.",
  },
  {
    icon: MapPin,
    title: "Share the details",
    body: "Add your address, parking, stairs and any access notes so your therapist arrives ready.",
  },
  {
    icon: Sparkles,
    title: "Relax at your place",
    body: "A vetted therapist brings everything needed. Afterwards you can review and rebook.",
  },
];

const TRUST = [
  {
    icon: BadgeCheck,
    title: "Vetted therapists",
    body: "Every therapist is qualified and checked before they can take a booking.",
  },
  {
    icon: CreditCard,
    title: "Pay after it's confirmed",
    body: "You're only charged once your booking is confirmed — no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Your details stay private",
    body: "Your address is only shared with your therapist once your booking is confirmed.",
  },
  {
    icon: HeartHandshake,
    title: "Nine years of Body Bliss care",
    body: "The mobile service of Body Bliss Massage & Day Spa, caring for Adelaide since day one.",
  },
];

export default function Home() {
  return (
    <>
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-content flex-col gap-section">
          {/* Hero */}
          <section
            className="flex flex-col gap-card-gap"
            aria-labelledby="hero-heading"
          >
            <span className="inline-flex w-fit items-center gap-compact rounded-full border border-border bg-card px-3 py-1 text-description font-medium text-bb-text-description">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              Mobile massage across Adelaide
            </span>
            <h1
              id="hero-heading"
              className="font-heading text-display text-bb-text-display"
            >
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
          </section>

          {/* How It Works */}
          <section
            className="flex flex-col gap-card-gap"
            aria-labelledby="how-heading"
          >
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
            <div>
              <Button asChild variant="secondary">
                <Link href="/book">Book Now</Link>
              </Button>
            </div>
          </section>

          {/* Testimonials carousel */}
          <div className="flex flex-col gap-compact">
            <TestimonialsCarousel />
            <p className="text-caption text-bb-text-caption">
              Sample reviews shown for layout — real customer reviews appear here
              once booking opens.
            </p>
          </div>

          {/* Why trust Body Bliss */}
          <section
            className="flex flex-col gap-card-gap"
            aria-labelledby="trust-heading"
          >
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

          {/* Services */}
          <section
            className="flex flex-col gap-card-gap"
            aria-labelledby="services-heading"
          >
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
                See all
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
              {SERVICES.map((s) => (
                <Card key={s.slug} className="flex h-full flex-col gap-component">
                  <div className="flex items-center justify-between gap-component">
                    <CardTitle className="text-subtitle">{s.name}</CardTitle>
                    <Badge variant="secondary">{s.duration}</Badge>
                  </div>
                  <CardDescription className="flex-1">{s.blurb}</CardDescription>
                  <div>
                    <Button asChild variant="quiet">
                      <Link href="/book">Book this</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-caption text-bb-text-caption">
              Prices are announced when booking opens.
            </p>
          </section>

          {/* Closing CTA */}
          <section aria-labelledby="cta-heading">
            <Card
              variant="highlight"
              className="flex flex-col items-start gap-card-gap"
            >
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
        </div>
      </main>

      <BookNowBar />
    </>
  );
}
