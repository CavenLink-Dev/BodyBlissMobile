"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

/*
  Route error boundary — replaces the raw "Server Components render" crash
  with a calm, recoverable screen. No technical details are shown to users.
*/
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center px-page-inline py-page-block">
      <div className="mx-auto flex w-full max-w-md flex-col gap-card-gap">
        <h1 className="font-heading text-title font-semibold text-bb-text-title">
          Something Went Wrong
        </h1>
        <p className="text-description text-bb-text-description">
          Sorry, that didn&apos;t load properly. It&apos;s usually temporary.
        </p>
        <div className="flex flex-col gap-component tablet:flex-row">
          <Button type="button" variant="secondary" onClick={reset} className="w-full tablet:w-auto">
            Try again
          </Button>
          <Button asChild variant="quiet" className="w-full tablet:w-auto">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
