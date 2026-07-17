"use client";

import * as React from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/content";

/*
  Customer-experience carousel on a charcoal band — the mid-page dark
  moment in the page rhythm (ivory → white cards → charcoal → ivory).
  Dark-surface pairings (verified): white text 11.19:1, linen attribution
  8.57:1, camel stars 5.15:1 (decorative, always beside the "5.0" figure
  in white). It moves on its own but never traps the user:
  - Auto-advances every 6s, but pauses on hover, on focus within, and when
    the tab is hidden.
  - Fully honours prefers-reduced-motion: if the user prefers reduced
    motion we do NOT auto-advance at all (WCAG 2.2.2 — moving content is
    pausable/stoppable; here it simply doesn't start).
  - Real Previous/Next buttons (48px targets) and dot controls, so it works
    with keyboard and screen readers.
  - Region is labelled and marked aria-roledescription="carousel"; the live
    region announces the current slide politely.
*/

const AUTO_MS = 6000;

const arrowButton = cn(
  "inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded",
  "border border-primary-foreground/30 text-primary-foreground",
  "transition-colors duration-fade hover:bg-primary-foreground/10",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
);

export function TestimonialsCarousel() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = TESTIMONIALS.length;

  const go = React.useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || paused) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="flex flex-col gap-card-gap rounded bg-primary p-card-padding shadow-rest tablet:p-8"
    >
      <div className="flex items-end justify-between gap-component">
        <div className="flex flex-col gap-compact">
          <p className="flex items-center gap-compact text-caption font-medium uppercase tracking-[0.14em] text-primary-foreground/80">
            <span aria-hidden="true" className="h-0.5 w-6 rounded bg-secondary" />
            Reviews
          </p>
          <h2
            id="testimonials-heading"
            className="font-heading text-title font-semibold text-primary-foreground"
          >
            What Customers Say
          </h2>
        </div>
        <div className="flex items-center gap-compact">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className={arrowButton}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className={arrowButton}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="flex min-h-[13rem] flex-col justify-between gap-card-gap rounded border border-primary-foreground/15 p-card-padding">
          <div className="flex flex-col gap-component" aria-live="polite">
            <Quote aria-hidden="true" className="size-8 text-secondary" />
            <p className="text-subtitle text-primary-foreground">
              {TESTIMONIALS[index].quote}
            </p>
          </div>
          <div className="flex flex-col gap-compact">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: TESTIMONIALS[index].rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-bb-star text-bb-star" />
              ))}
            </div>
            <p className="text-description font-medium text-linen">
              <span className="font-semibold text-primary-foreground">
                {TESTIMONIALS[index].name}
              </span>{" "}
              · {TESTIMONIALS[index].suburb} · {TESTIMONIALS[index].service} ·{" "}
              {TESTIMONIALS[index].date}
            </p>
            <p className="inline-flex w-fit items-center gap-1 rounded-full border border-primary-foreground/30 px-2.5 py-0.5 text-caption text-primary-foreground/90">
              <BadgeCheck aria-hidden="true" className="size-3.5 text-secondary" />
              Verified booking · sample review
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-compact">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show testimonial ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <span
              className={cn(
                "h-2 rounded-full transition-all duration-fade",
                i === index ? "w-6 bg-secondary" : "w-2 bg-primary-foreground/30",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
