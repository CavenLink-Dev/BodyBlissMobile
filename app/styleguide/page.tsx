import { SiteNav } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/*
  Internal styleguide — renders every base component and state for review.
  Not linked from public navigation.
*/

export default function Styleguide() {
  return (
    <>
      <SiteNav />
      <main className="px-page-inline py-page-block">
        <div className="mx-auto flex max-w-content flex-col gap-section">
          <section className="flex flex-col gap-component">
            <h1 className="font-heading text-display text-bb-text-display">
              Styleguide
            </h1>
            <p className="text-description text-bb-text-description">
              Base components and states. Internal page for design review.
            </p>
          </section>

          <section className="flex flex-col gap-component">
            <h2 className="font-heading text-title font-semibold text-bb-text-title">
              Type Scale
            </h2>
            <p className="font-heading text-display text-bb-text-display">Display 44</p>
            <p className="font-heading text-title font-semibold text-bb-text-title">Title 32</p>
            <p className="font-heading text-subtitle text-bb-text-subtitle">Subtitle 22</p>
            <p className="text-description text-bb-text-description">Description 16 — body text.</p>
            <p className="text-caption text-bb-text-caption">Caption 12 — timestamps and fine print only, never essential information.</p>
          </section>

          <section className="flex flex-col gap-component">
            <h2 className="font-heading text-title font-semibold text-bb-text-title">
              Palette
            </h2>
            <p className="text-description text-bb-text-description">
              Charcoal anchor + layered warm neutrals. Text ratios verified
              against WCAG 2.2 AA (noted per swatch, vs the surface shown).
            </p>
            <ul className="grid grid-cols-2 gap-card-gap tablet:grid-cols-4">
              {[
                { name: "Ivory", hex: "#F7F3EC", note: "Page background", cls: "bg-ivory border border-border" },
                { name: "Cream", hex: "#F1EAE0", note: "Wash bands · charcoal 12.8:1", cls: "bg-cream" },
                { name: "Linen", hex: "#EAE0D1", note: "Chips, muted · charcoal 11.7:1", cls: "bg-linen" },
                { name: "Sand", hex: "#DDCFB9", note: "Hairlines · charcoal 10.0:1", cls: "bg-sand" },
                { name: "Camel", hex: "#C9AC7C", note: "The accent · charcoal 7.1:1", cls: "bg-camel" },
                { name: "Taupe", hex: "#8C7351", note: "Deep accent — never a text surface", cls: "bg-taupe" },
                { name: "Espresso", hex: "#3D3B36", note: "Primary · white 11.2:1", cls: "bg-espresso" },
                { name: "Charcoal", hex: "#252525", note: "Display text · white 15.3:1", cls: "bg-charcoal" },
              ].map((s) => (
                <li key={s.name} className="flex flex-col gap-compact">
                  <span aria-hidden="true" className={`block h-16 rounded shadow-rest ${s.cls}`} />
                  <p className="text-description font-semibold text-bb-text-display">{s.name}</p>
                  <p className="text-caption text-bb-text-caption">{s.hex} — {s.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-component">
            <h2 className="font-heading text-title font-semibold text-bb-text-title">
              Buttons
            </h2>
            <div className="flex flex-wrap items-center gap-component">
              <Button>Book a massage</Button>
              <Button variant="secondary">See prices</Button>
              <Button variant="quiet">Not now</Button>
              <Button disabled>Book a massage</Button>
              <Button variant="secondary" disabled>See prices</Button>
              <Button variant="quiet" disabled>Not now</Button>
            </div>
          </section>

          <section className="flex flex-col gap-component">
            <h2 className="font-heading text-title font-semibold text-bb-text-title">
              Cards
            </h2>
            <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2 desktop:grid-cols-3">
              <Card>
                <CardTitle>Plain card</CardTitle>
                <CardDescription>
                  White surface on the page background with a decorative hairline.
                </CardDescription>
              </Card>
              <Card variant="highlight">
                <CardTitle>Highlight card</CardTitle>
                <CardDescription className="text-primary-foreground">
                  Charcoal surface for emphasis. Camel and sand work as accents here.
                </CardDescription>
              </Card>
              <Card variant="row">
                <div className="size-12 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                <div>
                  <CardTitle>Row card</CardTitle>
                  <CardDescription>For lists such as therapists.</CardDescription>
                </div>
              </Card>
            </div>
          </section>

          <section className="flex max-w-md flex-col gap-component">
            <h2 className="font-heading text-title font-semibold text-bb-text-title">
              Inputs
            </h2>
            <Field id="sg-name" label="Your first name" placeholder="e.g. Maria" />
            <Field
              id="sg-email"
              label="Email address"
              type="email"
              hint="We only use this to send your booking details."
            />
            <Field
              id="sg-phone"
              label="Mobile number"
              type="tel"
              defaultValue="123"
              error="Enter the 10-digit mobile number you can be reached on."
            />
            <Field id="sg-disabled" label="Suburb" disabled placeholder="Locked" />
          </section>

          <section className="flex flex-col gap-component">
            <h2 className="font-heading text-title font-semibold text-bb-text-title">
              Sheet
            </h2>
            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="quiet">Cancellation policy</Button>
                </SheetTrigger>
                <SheetContent title="Cancellation policy">
                  <p>
                    Policy wording is owner-approved content and will be added
                    before launch. This sheet demonstrates layout, focus
                    handling and the visible close button.
                  </p>
                </SheetContent>
              </Sheet>
            </div>
          </section>

          <section className="flex flex-col gap-component">
            <h2 className="font-heading text-title font-semibold text-bb-text-title">
              Status
            </h2>
            <p className="text-description font-medium text-success">
              ✓ Booking confirmed — status colours always carry text or an icon.
            </p>
            <p className="text-description font-medium text-destructive">
              ✕ Payment failed — never colour alone.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
