"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Search, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { checkArea, type AreaCheckResult } from "@/lib/service-areas";
import { formatAud } from "@/lib/format";

/*
  Suburb availability checker — front-end only, against the local sample
  area list in lib/service-areas. No maps, geocoding or address APIs.
*/

export function SuburbChecker() {
  const [query, setQuery] = React.useState("");
  const [result, setResult] = React.useState<AreaCheckResult | null>(null);
  const [error, setError] = React.useState<string | undefined>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) {
      setError("Enter your suburb or 4-digit postcode.");
      setResult(null);
      return;
    }
    setError(undefined);
    setResult(checkArea(query));
  }

  return (
    <Card className="flex flex-col gap-component">
      <div className="flex items-center gap-component">
        <span
          className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
          aria-hidden="true"
        >
          <MapPin className="size-6 text-primary" />
        </span>
        <div className="flex flex-col">
          <h3 className="font-heading text-subtitle text-bb-text-subtitle">
            Do we come to you?
          </h3>
          <p className="text-description text-bb-text-description">
            Check your suburb or postcode in seconds.
          </p>
        </div>
      </div>

      <form
        noValidate
        onSubmit={onSubmit}
        className="flex flex-col gap-component tablet:flex-row tablet:items-end"
      >
        <Field
          id="suburb-check"
          label="Suburb or postcode"
          placeholder="e.g. Norwood or 5067"
          autoComplete="off"
          value={query}
          error={error}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="secondary" className="w-full tablet:w-auto">
          <Search aria-hidden="true" className="size-5" />
          Check Availability
        </Button>
      </form>

      {result ? (
        <div role="status" aria-live="polite">
          {result.status === "available" ? (
            <div className="flex flex-col items-start gap-component rounded border border-border bg-cream p-3">
              <p className="flex items-start gap-compact text-description text-bb-text-description">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                <span>
                  <span className="font-medium text-bb-text-display">
                    Great news — {result.area.suburb} is in our area.
                  </span>{" "}
                  No travel fee applies; the price you see is the price you pay.
                </span>
              </p>
              <Button asChild variant="secondary">
                <Link href="/book">Book Now</Link>
              </Button>
            </div>
          ) : result.status === "travel-fee" ? (
            <div className="flex flex-col items-start gap-component rounded border border-border bg-cream p-3">
              <p className="flex items-start gap-compact text-description text-bb-text-description">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                <span>
                  <span className="font-medium text-bb-text-display">
                    We come to {result.area.suburb}
                  </span>{" "}
                  with a {formatAud(result.feeCents)} travel fee, shown clearly
                  before you pay.
                </span>
              </p>
              <Button asChild variant="secondary">
                <Link href="/book">Book Now</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-component rounded border border-border bg-cream p-3">
              <p className="flex items-start gap-compact text-description text-bb-text-description">
                <XCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
                <span>
                  <span className="font-medium text-bb-text-display">
                    We&apos;re not in that area just yet.
                  </span>{" "}
                  We&apos;re expanding as more therapists join. For corporate or
                  group events outside our usual area,{" "}
                  <Link
                    href="/corporate"
                    className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    contact us for a quote
                  </Link>
                  .
                </span>
              </p>
            </div>
          )}
        </div>
      ) : null}

      <p className="text-caption text-bb-text-caption">
        See the full list on our{" "}
        <Link
          href="/areas"
          className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          service areas page
        </Link>
        .
      </p>
    </Card>
  );
}
