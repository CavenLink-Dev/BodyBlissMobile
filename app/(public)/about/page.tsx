import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HeartHandshake, Home, Leaf, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import lotusCharcoal from "@/assets/body_bliss_lotus_charcoal.png";

export const metadata: Metadata = {
  title: "About — Body Bliss Mobile Massage",
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
    body: "No travel, no waiting rooms, no rushing back into traffic afterwards — just rest.",
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
          <Image
            src={lotusCharcoal}
            alt=""
            aria-hidden="true"
            className="h-14 w-auto self-start"
          />
          <h1 className="font-heading text-display text-bb-text-display">
            About Body Bliss
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Nine years of Adelaide massage and wellness experience — now at
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
            Massage &amp; Day Spa, where Adelaide locals have trusted us with
            their massage and wellness care for nine years.
          </p>
          <p className="max-w-prose text-description text-bb-text-description">
            The mobile service is a simple idea: the treatments our clients
            love, delivered wherever they&apos;re most relaxed — at home after a
            long week, in a hotel room mid-trip, or at the workplace as a team
            treat. A vetted therapist arrives with a professional table, fresh
            linens and everything else needed, so all you have to do is unwind.
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

        <section aria-labelledby="area-heading" className="flex flex-col gap-component">
          <h2
            id="area-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Where We Work
          </h2>
          <p className="max-w-prose text-description text-bb-text-description">
            We serve the Adelaide metropolitan area, South Australia. Enter your
            suburb during booking and we&apos;ll confirm coverage — and if
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
              Browse our massages or book in a couple of minutes — a vetted
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
