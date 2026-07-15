import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
  Body Bliss cards — Rule of Three:
  - plain:     white surface on the #F7F3EC ivory page, rest shadow + hairline
  - row:       horizontal list row (therapist lists, bookings) — same surface,
               laid out as a flex row with component gap
  - highlight: charcoal surface + white text (documented dark-surface pattern;
               sand/camel work as accents on charcoal, 7.3:1 / 5.2:1)
  Padding via --bb-card-padding (16 phone / 24 tablet+desktop). Radius 8.
  Elevation: shadow-rest (2-step warm scale) so cards sit gently above the
  page. The sand hairline is decorative only — cards also separate by
  surface colour + shadow, never by the stroke alone.
*/

const cardVariants = cva("rounded border border-border p-card-padding", {
  variants: {
    variant: {
      plain: "bg-card text-card-foreground shadow-rest",
      row: "flex items-center gap-component bg-card text-card-foreground shadow-rest",
      highlight: "bg-primary text-primary-foreground border-transparent shadow-rest",
    },
  },
  defaultVariants: {
    variant: "plain",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-subtitle", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-description", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export { Card, CardTitle, CardDescription, cardVariants };
