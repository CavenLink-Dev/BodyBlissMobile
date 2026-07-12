"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/*
  Body Bliss sheet — policies, FAQ detail and T&Cs live one tap away in
  sheets. Rules: always a visible close button, never stacked, focus
  trapped (Radix), 150ms fade only (honours prefers-reduced-motion via the
  global rule). Title is mandatory for accessible naming.
*/

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title: string;
  }
>(({ className, children, title, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/40 duration-fade data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-lg bg-card p-card-padding",
        "tablet:inset-x-auto tablet:inset-y-0 tablet:right-0 tablet:max-h-none tablet:w-full tablet:max-w-md tablet:rounded-none",
        "duration-fade data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-component">
        <DialogPrimitive.Title className="font-heading text-subtitle text-bb-text-subtitle">
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Close
          className={cn(
            "inline-flex min-h-hit-target min-w-hit-target items-center justify-center gap-compact rounded",
            "text-description font-medium text-foreground",
            "transition-colors duration-fade hover:bg-foreground/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
          <X aria-hidden="true" className="size-5" />
          Close
        </DialogPrimitive.Close>
      </div>
      <div className="mt-component text-description text-bb-text-description">
        {children}
      </div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetClose, SheetContent };
