import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  Lock,
  ArrowRight,
} from "lucide-react";

import {
  IllustrationChoose,
  IllustrationLocation,
  IllustrationTherapist,
  IllustrationRelax,
} from "@/components/step-illustrations";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ServicesCarousel } from "@/components/services-carousel";
import { BookNowBar } from "@/components/book-now-bar";
import { HeroIllustration } from "@/components/hero-illustration";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { getServicesWithPricing } from "@/lib/catalogue";
import { SuburbChecker } from "@/components/suburb-checker";
import { TherapistCard } from "@/components/therapists/therapist-card";
import { THERAPISTS } from "@/lib/therapists";

/*
  Home — mobile-first, adapted from the service-booking layout in the Figma
  reference. Order: hero (prominent Book Now) → trust strip → services + live
  pricing → how it works → why choose → therapist preview (honest, no fake
  profiles) → reviews (clearly-labelled sample) → preparation → FAQ → final CTA.
  No invented safety claims; prices are all-inclusive and shown upfront.
*/

const STEPS = [
  {
    illustration: IllustrationChoose,
    title: "Choose your treatment",
    body: "Pick the massage, length and time that suits you.",
  },
  {
    illustration: IllustrationLocation,
    title: "Tell us where",
    body: "Add your address, parking and access notes so your therapist arrives ready.",
  },
  {
    illustration: IllustrationTherapist,
    title: "Pick your therapist",
    body: "Choose a therapist yourself, or let Body Bliss match you with the best available.",
  },
  {
    illustration: IllustrationRelax,
    title: "Relax at your place",
    body: "Your therapist brings the table, fresh linen and everything else needed.",
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
    title: "Upfront pricing",
    body: "The price you see is the price you pay — travel, table and equipment included. No hidden fees.",
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

const FAQS = [
  {
    q: "What does the therapist bring?",
    a: "Everything: a professional massage table, fresh linen, oils, towels and music. You just need a quiet room with a little space.",
  },
  {
    q: "Can I choose my therapist?",
    a: "Yes. You can browse the team and choose a therapist during booking — including a gender preference — or let us match you with the best available.",
  },
  {
    q: "What should I wear?",
    a: "Whatever's comfortable. You undress to your level of comfort and are always professionally draped throughout the massage.",
  },
  {
    q: "Is pregnancy massage available?",
    a: "Yes, from the second trimester (12+ weeks), delivered by therapists experienced in prenatal work with side-lying positioning and supportive cushioning. If your pregnancy is high-risk, please check with your midwife or doctor first.",
  },
  {
    q: "I have a health condition — can I still book?",
    a: "Massage supports general wellbeing and isn't a medical treatment. If you're recovering from injury or surgery or managing a condition, check with your health practitioner first, and add a note to your booking so we match a suitable therapist.",
  },
  {
    q: "What if I need to cancel?",
    a: "Cancellation is free from your account until your therapist is on the way, with a full refund to your original payment method.",
  },
  {
    q: "Do you sell gift cards?",
    a: "Yes — digital gift cards for any amount, delivered by email, valid for three years. The recipient books whenever suits them.",
  },
  {
    q: "Where do you operate?",
    a: "Across the Adelaide metro area, with selected Adelaide Hills suburbs available for a small travel fee. Use the availability checker above to check your suburb.",
  },
];

export default async function Home() {
  const services = await getServicesWithPricing();

  return (
    <>
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-content flex-col gap-section">
          {/* Hero — charcoal band (documented dark-surface pattern: white text
              11.2:1, camel strictly as accent 5.2:1, white lotus watermark) */}
          <section aria-labelledby="hero-heading">
            <div className="relative overflow-hidden rounded bg-primary p-card-padding tablet:p-12">
              <div className="relative grid grid-cols-1 items-center gap-card-gap desktop:grid-cols-[3fr_2fr]">
              <div className="flex flex-col gap-card-gap">
                <span className="inline-flex w-fit items-center gap-compact rounded-full border border-primary-foreground/30 px-3 py-1 text-description font-medium text-primary-foreground">
                  <MapPin aria-hidden="true" className="size-4 text-secondary" />
                  Mobile massage across Adelaide
                </span>
                <h1
                  id="hero-heading"
                  className="font-heading text-display text-primary-foreground"
                >
                  Massage That Comes To You
                </h1>
                <span aria-hidden="true" className="h-1.5 w-16 rounded bg-secondary" />
                <p className="max-w-prose text-subtitle text-primary-foreground">
                  Book a vetted massage therapist to your home, hotel or
                  workplace — backed by nine years of Body Bliss massage and
                  wellness experience.
                </p>
                <div className="mt-1 flex flex-col gap-component tablet:flex-row">
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
                <ul className="mt-1 flex flex-wrap gap-compact">
                  {["Reviewed therapists", "Upfront pricing", "Adelaide metro"].map(
                    (t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-compact rounded-full bg-primary-foreground/10 px-3 py-1 text-description text-primary-foreground"
                      >
                        <BadgeCheck aria-hidden="true" className="size-4 text-secondary" />
                        {t}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Original at-home massage illustration (decorative) */}
              <HeroIllustration className="mx-auto mt-2 w-full max-w-md desktop:mt-0" />
              </div>
            </div>
          </section>

          {/* Suburb availability checker */}
          <Reveal>
            <section aria-label="Check availability in your suburb" id="availability">
              <SuburbChecker />
            </section>
          </Reveal>

          {/* Services + live pricing */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="services-heading">
            <SectionHeading
              id="services-heading"
              eyebrow="Services"
              title="Our Massages"
              action={
                <Link
                  href="/services"
                  className="inline-flex min-h-hit-target items-center gap-compact text-nav font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  All prices
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
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
              Prices include travel, table and equipment — no hidden fees.
            </p>
          </section>
          </Reveal>

          {/* How It Works */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="how-heading">
            <SectionHeading
              id="how-heading"
              eyebrow="Simple as"
              title="How It Works"
            />
            {/* Immersive step cards: vertical gold rail on phone, four even
                columns on desktop — no orphaned steps, no dangling lines. */}
            <ol className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="h-full">
                  <div className="group relative flex h-full flex-col gap-component overflow-hidden rounded border border-border bg-card p-card-padding shadow-rest transition-shadow duration-fade hover:shadow-md">
                    <step.illustration />
                    <p className="flex items-center gap-compact font-heading text-subtitle font-semibold text-bb-text-subtitle">
                      <span
                        aria-hidden="true"
                        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-description font-bold text-secondary-foreground"
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </span>
                    </p>
                    <p className="text-description text-bb-text-description">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          </Reveal>

          {/* Why choose */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="trust-heading">
            <SectionHeading
              id="trust-heading"
              eyebrow="Trust"
              title="Why Choose Body Bliss"
            />
            <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
              {TRUST.map((item) => (
                <Card key={item.title} variant="row" className="items-start">
                  <span
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-linen"
                    aria-hidden="true"
                  >
                    <item.icon className="size-6 text-charcoal" />
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

          {/* Therapist preview — fictional sample profiles (labelled) */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="therapists-heading">
            <SectionHeading
              id="therapists-heading"
              eyebrow="The team"
              title="Meet Our Therapists"
              action={
                <Link
                  href="/therapists"
                  className="inline-flex min-h-hit-target items-center gap-compact text-nav font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  View all
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
            <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
              {THERAPISTS.slice(0, 4).map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
            </div>
            <p className="text-caption text-bb-text-caption">
              Sample profiles for demonstration — every live therapist is
              reviewed and approved before taking bookings.
            </p>
          </section>
          </Reveal>

          {/* Reviews — adapted from real day-spa Google reviews */}
          <Reveal>
          <div className="flex flex-col gap-compact">
            <TestimonialsCarousel />
            <p className="text-caption text-bb-text-caption">
              Sample reviews for demonstration — showing how verified customer
              feedback will appear once the mobile service is live.
            </p>
          </div>
          </Reveal>

          {/* FAQ — accessible native accordion */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="faq-heading">
            <SectionHeading
              id="faq-heading"
              eyebrow="Answers"
              title="Frequently Asked Questions"
            />
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
            <Card
              variant="highlight"
              className="relative flex flex-col items-start gap-card-gap overflow-hidden"
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
                  <Link href="/book">Book a Massage</Link>
                </Button>
                <Button
                  asChild
                  variant="quiet"
                  className="w-full text-primary-foreground active:bg-primary-foreground/10 tablet:w-auto"
                >
                  <Link href="/gift-cards">Buy a Gift Card</Link>
                </Button>
                <Button
                  asChild
                  variant="quiet"
                  className="w-full text-primary-foreground active:bg-primary-foreground/10 tablet:w-auto"
                >
                  <Link href="#availability">Check Availability</Link>
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
