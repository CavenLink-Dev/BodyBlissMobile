"use client";

import * as React from "react";
import { CheckCircle2, Info, WifiOff, X } from "lucide-react";

import { cn } from "@/lib/utils";

/*
  Lightweight toast system — no dependencies. Fire a toast from anywhere:

    import { toast } from "@/components/toaster";
    toast("Saved");

  The <Toaster /> is mounted once in the root layout. It also watches the
  browser online/offline events so the prototype has a polished offline
  state without any network code.
*/

type ToastKind = "success" | "info";
type ToastItem = { id: number; message: string; kind: ToastKind };

const EVENT = "bb-toast";

export function toast(message: string, kind: ToastKind = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(EVENT, { detail: { message, kind } }),
  );
}

let nextId = 1;

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const [offline, setOffline] = React.useState(false);

  React.useEffect(() => {
    const onToast = (e: Event) => {
      const { message, kind } = (e as CustomEvent).detail as {
        message: string;
        kind: ToastKind;
      };
      const id = nextId++;
      setToasts((t) => [...t, { id, message, kind }]);
      window.setTimeout(
        () => setToasts((t) => t.filter((x) => x.id !== id)),
        4000,
      );
    };
    const onOffline = () => setOffline(true);
    const onOnline = () => setOffline(false);
    window.addEventListener(EVENT, onToast);
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    return () => {
      window.removeEventListener(EVENT, onToast);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-compact px-page-inline tablet:bottom-6"
    >
      {offline ? (
        <div
          role="status"
          className="pointer-events-auto flex w-full max-w-md items-center gap-compact rounded border border-border bg-primary p-3 text-description text-primary-foreground shadow-rest"
        >
          <WifiOff aria-hidden="true" className="size-5 shrink-0 text-secondary" />
          You appear to be offline. The prototype keeps working, but changes
          stay on this device.
        </div>
      ) : null}
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-md items-center gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description shadow-rest"
        >
          {t.kind === "success" ? (
            <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-success" />
          ) : (
            <Info aria-hidden="true" className="size-5 shrink-0 text-primary" />
          )}
          <span className="flex-1">{t.message}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            className={cn(
              "inline-flex size-8 shrink-0 items-center justify-center rounded",
              "hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
