import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Home, Leaf, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About | Body Bliss Mobile Massage",
  description:
    "Professional mobile massage across Adelaide — a vetted therapist comes to your home, hotel or workplace.",
};

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Care first",
    body: "Professional care brought to wherever you're most comfortable.",
  },
  {
    icon: ShieldCheck,
    title: "Trust built in",
    body: "Vetted therapists, private handling of your details, upfront prices.",
  },
  {
    icon: Home,
    title: "Comfort of your space",
    body: "No travel, no waiting rooms, no rushing back into traffic afterwards.",
  },
  {
    icon: Leaf,
    title: "Simple and honest",
    body: "Clear services, clear prices, plain-English policies.",
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
            Professional massage, brought to your door across Adelaide.
          </p>
        </header>

        <section aria-labelledby="story-heading" className="flex flex-col gap-component">
          <h2
            id="story-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            What We Do
          </h2>
          <p className="max-w-prose text-description text-bb-text-description">
            We bring professional massage to wherever people are most relaxed —
            at home after a long week, in a hotel room during a trip, or at the
            workplace as a team treat. An approved therapist arrives with a
            professional table, fresh linen and everything else needed, so all
            you have to do is unwind.
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
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-wash"
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

        <section aria-labelledby="area-heading" className="flex flex-col gap-component">
          <h2
            id="area-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Where We Work
          </h2>
          <p className="max-w-prose text-description text-bb-text-description">
            We serve the Adelaide metropolitan area, South Australia. Enter your
            suburb during booking and we&apos;ll confirm coverage.
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
              Book in a couple of minutes — a vetted therapist comes to you.
            </p>
            <div className="flex flex-col gap-component tablet:flex-row">
              <Button asChild variant="primary" className="w-full tablet:w-auto">
                <Link href="/book">Book Now</Link>
              </Button>
              <Button
                asChild
                variant="soft"
                className="w-full tablet:w-auto"
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
