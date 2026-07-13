"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/*
  Cookie notice — honest and minimal. The site only sets essential cookies
  (Supabase sign-in session); there are no advertising or analytics cookies,
  so this is a notice with a single acknowledgement, not a consent maze.
  Dismissal is remembered in localStorage. If tracking cookies are ever
  added, this must become a real consent choice first.
*/

const STORAGE_KEY = "bb-cookie-notice-ack";

export function CookieNotice() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage unavailable (private mode etc.) — show once per page load.
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // ignore
    }
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-content flex-col gap-component px-page-inline py-3 tablet:flex-row tablet:items-center">
        <p className="flex-1 text-description text-bb-text-description">
          We only use essential cookies — they keep you signed in and make
          bookings work. No advertising or tracking cookies.{" "}
          <Link
            href="/help"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Learn more
          </Link>
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={dismiss}
          className="w-full tablet:w-auto"
        >
          OK
        </Button>
      </div>
    </div>
  );
}
