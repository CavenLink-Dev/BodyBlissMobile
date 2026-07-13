"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/app/(public)/book/actions";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  async function onCancel() {
    setPending(true);
    setError(undefined);
    const result = await cancelBooking(bookingId);
    if (result.ok) {
      router.refresh();
      return;
    }
    setPending(false);
    setError("We couldn't cancel this booking. Please try again or contact support.");
  }

  if (!confirming) {
    return (
      <Button type="button" variant="quiet" onClick={() => setConfirming(true)}>
        Cancel booking
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-component">
      <p className="text-description text-bb-text-description">
        Are you sure you want to cancel this booking?
      </p>
      {error ? (
        <p className="text-description font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-component tablet:flex-row">
        <Button
          type="button"
          variant="secondary"
          disabled={pending}
          onClick={onCancel}
          className="w-full tablet:w-auto"
        >
          {pending ? "Cancelling…" : "Yes, cancel"}
        </Button>
        <Button
          type="button"
          variant="quiet"
          onClick={() => setConfirming(false)}
          className="w-full tablet:w-auto"
        >
          Keep booking
        </Button>
      </div>
    </div>
  );
}
