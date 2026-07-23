import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/*
  Native <select> styled to match the Input. Native is deliberate: on iPhone
  it opens the system wheel picker, which is familiar, accessible and easy
  to operate one-handed. 48px hit target, description-size text, charcoal
  focus ring, error via aria-invalid + visible text.
*/

const SelectControl = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex min-h-hit-target w-full appearance-none rounded border border-input bg-card px-3 py-2 pr-10",
          "text-description text-foreground",
          "transition-colors duration-fade",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-bb-text-description"
      />
    </div>
  );
});
SelectControl.displayName = "SelectControl";

export interface SelectFieldProps extends React.ComponentProps<"select"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, hint, error, className, children, ...props }, ref) => {
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    return (
      <div className={cn("flex w-full flex-col gap-compact", className)}>
        <Label htmlFor={id} className="text-description font-medium text-foreground">
          {label}
        </Label>
        <SelectControl
          id={id}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [hintId, errorId].filter(Boolean).join(" ") || undefined
          }
          {...props}
        >
          {children}
        </SelectControl>
        {hint ? (
          <p id={hintId} className="text-caption text-bb-text-caption">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-description font-medium text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
SelectField.displayName = "SelectField";

export { SelectControl, SelectField };
