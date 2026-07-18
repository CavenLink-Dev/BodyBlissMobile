import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Home, Leaf, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About | Body Bliss Mobile Massage",
  description:
    "Body Bliss Mobile Massage brings nine years of Adelaide massage and wellness experience from Body Bliss Massage & Day Spa to your home, hotel or workplace.",
};

/*
  About — the story and values. The nine-years message is approved for hero
  + About. No invented history beyond the approved facts: the day spa, nine
  years in Adelaide, and the mobile service extending it.
*/

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Care first",
    body: "The same care our day-spa clients know, brought to wherever you're most comfortable.",
  },
  {
    icon: ShieldCheck,
    title: "Trust built in",
    body: "Vetted therapists, private handling of your details, and upfront all-inclusive prices.",
  },
  {
    icon: Home,
    title: "Comfort of your space",
    body: "No travel, no waiting rooms, no rushing back into traffic afterwards, just rest.",
  },
  {
    icon: Leaf,
    title: "Simple and honest",
    body: "Clear services, clear prices, plain-English policies. Nothing you don't need.",
  },
];

export default function AboutPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <header className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            About Body Bliss
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Nine years of Adelaide massage and wellness experience, now at
            your door.
          </p>
        </header>

        <section aria-labelledby="story-heading" className="flex flex-col gap-component">
          <h2
            id="story-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Our Story
          </h2>
          <p className="max-w-prose text-description text-bb-text-description">
            Body Bliss Mobile Massage comes from the team behind Body Bliss
            Massage and Day Spa. Since 2017 our day spas on Prospect Road in
            Prospect and The Parade in Norwood have welcomed Adelaide locals
            seven days a week, earning a 4.9 star rating from more than 1,500
            reviews for relaxation, deep tissue, aromatherapy and cupping
            treatments.
          </p>
          <p className="max-w-prose text-description text-bb-text-description">
            The mobile service is a simple idea. We take the treatments our
            clients already love and deliver them wherever people are most
            relaxed, whether that is at home after a long week, in a hotel room
            during a trip, or at the workplace as a team treat. An approved
            therapist arrives with a professional table, fresh linen and
            everything else needed, so all you have to do is unwind.
          </p>
        </section>

        <section aria-labelledby="values-heading" className="flex flex-col gap-card-gap">
          <h2
            id="values-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
            {VALUES.map((v) => (
              <Card key={v.title} variant="row" className="items-start">
                <span
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <v.icon className="size-6 text-primary" />
                </span>
                <div className="flex flex-col gap-compact">
                  <CardTitle className="text-subtitle">{v.title}</CardTitle>
                  <CardDescription>{v.body}</CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="mission-heading" className="flex flex-col gap-component">
          <h2
            id="mission-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Our Mission &amp; Promise
          </h2>
          <p className="max-w-prose text-description text-bb-text-description">
            Our mission is simple: make professional massage effortless for
            Adelaide, no traffic, no waiting rooms, no compromise on quality.
            Our promise sits behind every booking: a reviewed and approved
            therapist, transparent all-inclusive pricing, private handling of
            your details, and a professional, respectful experience from the
            moment you book to the moment the table is packed away.
          </p>
          <p className="max-w-prose text-description text-bb-text-description">
            That promise runs both ways. We look after our therapists with
            fair conditions, clear conduct standards for customers, and the
            confidence that every home they walk into has been confirmed as a
            safe, appropriate space to work.
          </p>
        </section>

        <section aria-labelledby="founder-heading" className="flex flex-col gap-component">
          <h2
            id="founder-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            A Word From The Founder
          </h2>
          <Card variant="row" className="items-start">
            <span
              className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-title font-semibold text-secondary-foreground"
              aria-hidden="true"
            >
              L
            </span>
            <div className="flex flex-col gap-compact">
              <p className="max-w-prose text-description text-bb-text-description">
                &ldquo;After nine years welcoming Adelaide into our day spa, we
                kept hearing the same thing: the massage was perfect, but the
                drive home undid half the good work. Body Bliss Mobile is our
                answer, the same care, the same standards, delivered to the
                place you&apos;re already most relaxed. Your home.&rdquo;
              </p>
              <p className="text-description font-medium text-bb-text-display">
                Lily · Founder, Body Bliss
              </p>
              <p className="text-caption text-bb-text-caption">
                Placeholder founder content for demonstration.
              </p>
            </div>
          </Card>
        </section>

        <section aria-labelledby="timeline-heading" className="flex flex-col gap-card-gap">
          <h2
            id="timeline-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            How We Got Here
          </h2>
          <ol className="flex flex-col">
            {[
              {
                year: "2017",
                text: "Body Bliss Massage & Day Spa opens its doors in Adelaide.",
              },
              {
                year: "2020",
                text: "The team grows, and regulars start asking whether we'd ever come to them.",
              },
              {
                year: "2024",
                text: "First trial home visits for long-standing day-spa clients, the feedback settles it.",
              },
              {
                year: "2025",
                text: "The mobile service takes shape: therapist approval process, equipment kits and conduct standards.",
              },
              {
                year: "2026",
                text: "Body Bliss Mobile Massage launches across the Adelaide metro area.",
              },
            ].map((item, i, arr) => (
              <li key={item.year} className="relative flex gap-component">
                <div className="flex flex-col items-center">
                  <span
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-description font-semibold text-secondary-foreground"
                    aria-hidden="true"
                  >
                    {item.year.slice(2)}
                  </span>
                  {i < arr.length - 1 ? (
                    <span aria-hidden="true" className="w-0.5 flex-1 bg-border" />
                  ) : null}
                </div>
                <div className="flex flex-col gap-compact pb-card-gap">
                  <p className="font-heading text-subtitle text-bb-text-subtitle">
                    {item.year}
                  </p>
                  <p className="max-w-prose text-description text-bb-text-description">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-caption text-bb-text-caption">
            Timeline shown for demonstration, dates are illustrative.
          </p>
        </section>

        <section aria-labelledby="area-heading" className="flex flex-col gap-component">
          <h2
            id="area-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Where We Work
          </h2>
          <p className="max-w-prose text-description text-bb-text-description">
            We serve the Adelaide metropolitan area, South Australia. Enter your
            suburb during booking and we&apos;ll confirm coverage, and if
            we&apos;re not in your area yet, we&apos;re expanding as more
            therapists join.
          </p>
        </section>

        <section aria-labelledby="about-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="about-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Experience It Yourself
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Browse our massages or book in a couple of minutes, a vetted
              therapist comes to you.
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
                <Link href="/services">See Services &amp; Prices</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
