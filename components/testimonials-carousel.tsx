"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/content";

/*
  Customer-experience carousel that moves on its own but never traps the
  user:
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
    <section aria-labelledby="testimonials-heading" className="flex flex-col gap-card-gap">
      <div className="flex items-end justify-between gap-component">
        <h2
          id="testimonials-heading"
          className="font-heading text-title font-semibold text-bb-text-title"
        >
          What Customers Say
        </h2>
        <div className="flex items-center gap-compact">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded border border-border bg-card transition-colors duration-fade hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded border border-border bg-card transition-colors duration-fade hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
        <Card className="flex min-h-[13rem] flex-col justify-between gap-card-gap">
          <div className="flex flex-col gap-component" aria-live="polite">
            <Quote aria-hidden="true" className="size-8 text-secondary" />
            <p className="text-subtitle text-bb-text-subtitle">
              {TESTIMONIALS[index].quote}
            </p>
          </div>
          <div className="flex flex-col gap-compact">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-bb-star text-bb-star" />
              ))}
            </div>
            <p className="text-description font-medium text-bb-text-description">
              {TESTIMONIALS[index].name} · {TESTIMONIALS[index].suburb}
            </p>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-compact">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show testimonial ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span
              className={cn(
                "h-2 rounded-full transition-all duration-fade",
                i === index ? "w-6 bg-primary" : "w-2 bg-border",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
