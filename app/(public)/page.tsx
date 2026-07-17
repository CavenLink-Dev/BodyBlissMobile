import Link from "next/link";
import Image from "next/image";
import {
  CalendarCheck,
  MapPin,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  Lock,
  ArrowRight,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ServicesCarousel } from "@/components/services-carousel";
import { BookNowBar } from "@/components/book-now-bar";
import { HeroIllustration } from "@/components/hero-illustration";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { getServicesWithPricing, getActiveSuburbs } from "@/lib/catalogue";
import { SuburbChecker } from "@/components/suburb-checker";
import { TherapistCard } from "@/components/therapists/therapist-card";
import { THERAPISTS } from "@/lib/therapists";
import lotusWhite from "@/assets/body_bliss_lotus_white.png";

/*
  Home — mobile-first, adapted from the service-booking layout in the Figma
  reference. Order: hero (prominent Book Now) → trust strip → services + live
  pricing → how it works → why choose → therapist preview (honest, no fake
  profiles) → reviews (clearly-labelled sample) → preparation → FAQ → final CTA.
  No invented safety claims; prices are all-inclusive and shown upfront.
*/

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Choose your treatment",
    body: "Pick the massage, length and time that suits you.",
  },
  {
    icon: MapPin,
    title: "Tell us where",
    body: "Add your address, parking and access notes so your therapist arrives ready.",
  },
  {
    icon: Users,
    title: "Pick your therapist",
    body: "Choose a therapist yourself, or let Body Bliss match you with the best available.",
  },
  {
    icon: Sparkles,
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

const PREP = [
  "Choose a quiet, comfortable room with space for a massage table — about the size of a single bed, plus room to walk around.",
  "Add parking and access instructions when you book — driveway, street or visitor parking all work.",
  "Let us know about stairs, lifts, gates or any accessibility requirements ahead of time.",
  "Secure pets in another room during the appointment if they're curious types.",
  "Wear whatever's comfortable — you'll be professionally draped throughout a table massage.",
  "Complete your treatment notes during booking so your therapist arrives prepared.",
];

const FAQS = [
  {
    q: "What does the therapist bring?",
    a: "Everything: a professional massage table, fresh linen, oils, towels and music. You just need a quiet room with a little space.",
  },
  {
    q: "Can I choose my therapist?",
    a: "Yes. You can browse the team and choose a therapist during booking — including a gender or language preference — or let us match you with the best available.",
  },
  {
    q: "What should I wear?",
    a: "Whatever's comfortable. For table massage you undress to your level of comfort and are always professionally draped; for chair massage you stay fully clothed.",
  },
  {
    q: "What about parking?",
    a: "Add a note about parking when you book — a driveway, street parking or a visitor bay all work. If paid parking is unavoidable, we'll flag any estimate before you pay.",
  },
  {
    q: "Do you come to apartments and hotels?",
    a: "Absolutely. Just include your unit or room number, buzzer or intercom details, and let hotel reception know you're expecting a therapist.",
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
    q: "How does couples massage work?",
    a: "Two therapists arrive together with two tables and work side by side, so you and your partner or friend are massaged at the same time — each with your own style and pressure.",
  },
  {
    q: "Can you do our office or event?",
    a: "Yes — corporate chair massage for workplaces, conferences and events. Tell us your numbers and timing through the corporate enquiry form and we'll put together a quote.",
  },
  {
    q: "Where do you operate?",
    a: "Across the Adelaide metro area, with selected Adelaide Hills suburbs available for a small travel fee. Use the availability checker above to check your suburb.",
  },
];

export default async function Home() {
  const [services, suburbs] = await Promise.all([
    getServicesWithPricing(),
    getActiveSuburbs(),
  ]);

  return (
    <>
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-content flex-col gap-section">
          {/* Hero — charcoal band (documented dark-surface pattern: white text
              11.2:1, camel strictly as accent 5.2:1, white lotus watermark) */}
          <section aria-labelledby="hero-heading">
            <div className="relative overflow-hidden rounded bg-primary p-card-padding tablet:p-12">
              <Image
                src={lotusWhite}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-4 h-36 w-auto opacity-10 tablet:h-56"
              />
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

          {/* At a glance — factual stats band on the cream wash */}
          <section aria-label="Body Bliss at a glance" className="-mt-4">
            <dl className="grid grid-cols-3 divide-x divide-border rounded border border-border bg-cream shadow-rest">
              {[
                { value: "9", label: "Years in Adelaide" },
                { value: "6", label: "Massage styles" },
                { value: "100%", label: "Mobile — we come to you" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse items-center gap-compact px-2 py-card-gap text-center"
                >
                  <dt className="text-caption text-bb-text-caption">{stat.label}</dt>
                  <dd className="font-heading text-title font-semibold text-bb-text-display">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
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
            {/* De-boxed numbered timeline: vertical rail on phone,
                three columns on tablet+. Calmer than three identical cards. */}
            <ol className="flex flex-col tablet:grid tablet:grid-cols-3 tablet:gap-card-gap">
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative flex gap-component tablet:flex-col">
                  <div className="flex flex-col items-center tablet:flex-row tablet:items-center tablet:gap-component">
                    <span
                      className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-subtitle font-semibold text-secondary-foreground"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {i < STEPS.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="w-0.5 flex-1 bg-border tablet:h-0.5 tablet:w-auto tablet:flex-1"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-compact pb-card-gap tablet:pb-0 tablet:pr-card-gap">
                    <p className="flex items-center gap-compact font-heading text-subtitle text-bb-text-subtitle">
                      <step.icon aria-hidden="true" className="size-5 text-primary" />
                      {step.title}
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

          {/* Preparation guidance */}
          <Reveal>
          <section className="flex flex-col gap-card-gap" aria-labelledby="prep-heading">
            <SectionHeading
              id="prep-heading"
              eyebrow="Be ready"
              title="Getting Ready"
            />
            <Card variant="row" className="items-start border-transparent bg-cream">
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

          {/* Service areas — live from the database */}
          {suburbs.length > 0 ? (
            <Reveal>
              <section className="flex flex-col gap-card-gap" aria-labelledby="areas-heading">
                <SectionHeading
                  id="areas-heading"
                  eyebrow="Service areas"
                  title="Where We Go"
                />
                <ul className="flex flex-wrap gap-compact">
                  {suburbs.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-description text-bb-text-description"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-caption text-bb-text-caption">
                  …and nearby, including selected Adelaide Hills suburbs.{" "}
                  <Link
                    href="/areas"
                    className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    See all service areas
                  </Link>
                  .
                </p>
              </section>
            </Reveal>
          ) : null}

          {/* Final CTA */}
          <Reveal>
          <section aria-labelledby="cta-heading">
            <Card
              variant="highlight"
              className="relative flex flex-col items-start gap-card-gap overflow-hidden"
            >
              <Image
                src={lotusWhite}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-auto opacity-10"
              />
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
