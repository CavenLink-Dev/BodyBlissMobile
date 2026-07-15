import * as React from "react";

import { cn } from "@/lib/utils";

/*
  Body Bliss input — 48px hit target, description-size text (never smaller),
  white surface + stone #8A8172 border (3.84:1 vs white, 3.47:1 vs the ivory
  page — meets the 3:1 non-text minimum, resolving the old too-faint-border
  open item). Focus = 2px charcoal ring, 2px offset. Error state driven by
  aria-invalid; always paired with visible error text via the Field
  component — never colour alone.
*/

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-hit-target w-full rounded border border-input bg-card px-3 py-2",
          "text-description text-foreground placeholder:text-muted-foreground",
          "transition-colors duration-fade",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
