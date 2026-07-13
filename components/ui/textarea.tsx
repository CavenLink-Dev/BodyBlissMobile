import * as React from "react";

import { cn } from "@/lib/utils";

/*
  Body Bliss textarea — mirrors the Input: description-size text (never
  smaller), white surface as the primary affordance, 2px charcoal focus
  ring. Error state driven by aria-invalid and always paired with visible
  error text via FieldTextarea — never colour alone.
*/

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[6rem] w-full rounded border border-input bg-card px-3 py-2",
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
});
Textarea.displayName = "Textarea";

export { Textarea };
