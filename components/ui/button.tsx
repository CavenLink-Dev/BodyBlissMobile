import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
  Body Bliss buttons — Rule of Three (design doc §5):
  - primary:   #3D3B36 fill + white label (11.2:1)
  - secondary: #EAC005 fill + charcoal label (8.79:1) + token inner shadow
  - quiet:     charcoal text only
  Metrics per tokens: 44px visual height, 48px hit target (2px invisible
  expansion per side), min-width 132, radius 8, padding-inline 12, gap 10,
  DM Sans 18/20 capitalize. Weight 600 is the proposed value (open item —
  pending owner approval). Pressed = darkened fill (relative darkening;
  no separate pressed colour token exists). Disabled = reduced opacity +
  not-allowed (interim treatment, open item pending owner approval).
  Focus = 2px #252525 ring, 2px offset. Motion = 150ms fade only.
*/

const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center whitespace-nowrap capitalize",
    "h-button-visual min-w-button gap-2.5 rounded px-3 text-button font-semibold",
    "transition-colors duration-fade",
    // 48px hit target: 44px visual + 2px per side
    "before:absolute before:-inset-0.5 before:content-['']",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground active:brightness-90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-secondary-inner active:brightness-95",
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
