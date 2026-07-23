import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
  Body Bliss buttons — updated colour system (July 2026 reference card):
  - primary:   gold #F6C440 fill (the previous secondary colour, cooled
               slightly from the reference #FFD46F) + charcoal label (≈9:1)
  - secondary: pale gold #FFD46F fill + espresso #3D3B36 label (the previous
               primary colour, ≈8:1) + token inner shadow
  - soft:      alias of secondary (kept for existing call sites)
  - quiet:     charcoal text only
  Metrics per tokens: 44px visual height, 48px hit target (2px invisible
  expansion per side), min-width 132, radius 8, padding-inline 12, gap 10,
  DM Sans 18/20 capitalize. Weight 600 is the proposed value (open item —
  pending owner approval). Pressed = darkened fill + 0.98 scale (150ms;
  the global prefers-reduced-motion rule zeroes the transition). Disabled =
  reduced opacity + not-allowed (interim treatment, open item pending
  owner approval). Focus = 2px #252525 ring, 2px offset. Motion ≤200ms.
*/

const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center whitespace-nowrap capitalize",
    "h-button-visual min-w-button gap-2.5 rounded px-3 text-button font-semibold",
    "transition-[color,background-color,box-shadow,transform,filter] duration-fade active:scale-[0.98]",
    // 48px hit target: 44px visual + 2px per side
    "before:absolute before:-inset-0.5 before:content-['']",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-secondary text-secondary-foreground shadow-secondary-inner active:brightness-95",
        secondary:
          "bg-gold-soft text-espresso shadow-secondary-inner active:brightness-95",
        /* soft: kept as an alias of secondary so existing call sites
           (Details, Buy a Gift Card) pick up the new pale-gold style. */
        soft: "bg-gold-soft text-espresso shadow-secondary-inner active:brightness-95",
        quiet: "bg-transparent text-foreground active:bg-foreground/10",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
