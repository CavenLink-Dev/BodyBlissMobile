"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/content";

/*
  Customer-review carousel on the charcoal band. Cleaned up:
  - Full-width sliding track — cards transition left to right automatically
    (every 7s) and via subtle chevron controls.
  - One attribution line (name · suburb · service · date); the sample-data
    note lives once, below the carousel on the page — nothing said twice.
  - Pauses on hover/focus and when the tab is hidden; honours
    prefers-reduced-motion (no auto-advance; the global reduced-motion rule
    zeroes the slide transition).
*/

const AUTO_MS = 7000;

const arrowButton = cn(
  "inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded",
  "text-primary-foreground/60 transition-colors duration-fade hover:text-primary-foreground",
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
      if (document.visibilityState === "visible")
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
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className={arrowButton}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className={arrowButton}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      {/* Full-width sliding track */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="flex w-full shrink-0 flex-col justify-between gap-card-gap py-2"
              aria-hidden={i !== index}
            >
              <div className="flex flex-col gap-component">
                <Quote aria-hidden="true" className="size-8 text-secondary" />
                <p className="max-w-prose text-subtitle text-primary-foreground">
                  {t.quote}
                </p>
              </div>
              <p className="text-description text-linen">
                <span className="font-semibold text-primary-foreground">
                  {t.name}
                </span>{" "}
                · {t.suburb} · {t.service} · {t.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-compact">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show review ${i + 1} of ${count}`}
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
