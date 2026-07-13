"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/*
  Minimal cookie-agreement banner. Shows once on first visit, remembers the
  choice, then never shows again. No animation, no tracking scripts — it's a
  plain acknowledgement with a link to more info. Renders nothing on the
  server (and until mounted) to avoid a hydration flash.
*/

const STORAGE_KEY = "bb-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      // localStorage unavailable (private mode) — just don't show.
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-content flex-col gap-component px-page-inline py-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <p className="text-description text-bb-text-description">
          We use essential cookies to keep the site working and to remember your
          session.{" "}
          <Link
            href="/help"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Learn more
          </Link>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={accept}
          className="w-full tablet:w-auto"
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
