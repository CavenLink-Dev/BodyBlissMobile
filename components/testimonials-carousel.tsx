"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/content";

/*
  Reviews — stripped back to how the best booking sites do it: one overall
  rating line up top, then a single quote at a time with just a name and a
  suburb. Nothing repeated, nothing extra. Slides automatically, pauses on
  hover and focus, honours prefers-reduced-motion.
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
    /* Full-bleed charcoal band: the section escapes the page container and
       spans the whole viewport; the content stays aligned to the grid. */
    <section
      aria-labelledby="testimonials-heading"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-primary py-page-block"
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-card-gap px-page-inline">
      <div className="flex flex-wrap items-end justify-between gap-component">
        <div className="flex flex-col gap-compact">
          <h2
            id="testimonials-heading"
            className="font-heading text-title font-semibold text-primary-foreground"
          >
            What Customers Say
          </h2>
          <p className="flex items-center gap-compact text-description text-linen">
            <Star aria-hidden="true" className="size-4 fill-bb-star text-bb-star" />
            <span>
              <span className="font-semibold text-primary-foreground">4.9</span>{" "}
              from 1,500+ reviews of our Prospect and Norwood day spas
            </span>
          </p>
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

      {/* Full-width sliding quotes */}
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
            <figure
              key={t.id}
              className="flex w-full shrink-0 flex-col gap-component py-2"
              aria-hidden={i !== index}
            >
              <blockquote className="max-w-prose text-subtitle text-primary-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-description text-linen">
                <span className="font-semibold text-primary-foreground">
                  {t.name}
                </span>
                , {t.suburb}
              </figcaption>
            </figure>
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
      </div>
    </section>
  );
}
