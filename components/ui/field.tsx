import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/*
  Field = label + input + optional hint + error, wired for accessibility:
  - Label always visible (labels do what they say; nothing hidden)
  - Error text at description size or larger, #9E2B25 + text (never colour
    alone), linked via aria-describedby, input flagged with aria-invalid
  - Hints use description size too; captions never carry essential info
*/

export interface FieldProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ id, label, hint, error, className, ...props }, ref) => {
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    return (
      <div className={cn("flex w-full flex-col gap-compact", className)}>
        <Label htmlFor={id} className="text-description font-medium text-foreground">
          {label}
        </Label>
        {hint ? (
          <p id={hintId} className="text-description text-bb-text-description">
            {hint}
          </p>
        ) : null}
        <Input
          id={id}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [hintId, errorId].filter(Boolean).join(" ") || undefined
          }
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-description font-medium text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Field.displayName = "Field";

export { Field };
