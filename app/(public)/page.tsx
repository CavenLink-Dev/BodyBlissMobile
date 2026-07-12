import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

/*
  Home shell — hero with the nine-years trust line (approved for hero +
  About only), primary action "Book a massage", and an About band.
  No pricing, policy wording or availability claims — owner-gated content.
*/

export default function Home() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <section className="flex flex-col gap-component" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="font-heading text-display text-bb-text-display">
            Massage That Comes To You
          </h1>
          <p className="max-w-prose text-description text-bb-text-description">
            Book a vetted massage therapist to your home, hotel or workplace in
            Adelaide — backed by nine years of Body Bliss massage and wellness
            experience.
          </p>
          <div className="mt-1.5 flex flex-wrap gap-component">
            <Button asChild>
              <Link href="/book">Book a massage</Link>
            </Button>
            <Button variant="quiet" asChild>
              <Link href="/services">Services &amp; prices</Link>
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-card-gap" aria-labelledby="how-heading">
          <h2 id="how-heading" className="font-heading text-title font-semibold text-bb-text-title">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
            <Card>
              <CardTitle>Tell us what you need</CardTitle>
              <CardDescription>
                Choose your massage, when you want it, and where — home, hotel
                or workplace.
              </CardDescription>
            </Card>
            <Card>
              <CardTitle>We match you</CardTitle>
              <CardDescription>
                We find you a vetted therapist, or you can choose one yourself.
                You are only charged once your booking is confirmed.
              </CardDescription>
            </Card>
            <Card>
              <CardTitle>Relax at your place</CardTitle>
              <CardDescription>
                Your therapist brings everything needed. Afterwards you can
                review, favourite and rebook.
              </CardDescription>
            </Card>
          </div>
        </section>

        <section aria-labelledby="about-heading">
          <Card variant="highlight" className="flex flex-col gap-component">
            <h2 id="about-heading" className="font-heading text-title font-semibold text-primary-foreground">
              About Body Bliss
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Body Bliss Mobile Massage is the mobile service of Body Bliss
              Massage &amp; Day Spa, caring for Adelaide for nine years.
            </p>
            <div>
              <Button variant="secondary" asChild>
                <Link href="/about">More about us</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
