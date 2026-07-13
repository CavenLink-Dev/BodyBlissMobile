"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/*
  Subtle scroll reveal: sections fade in (opacity + 8px rise) the first time
  they enter the viewport. Deliberately minimal:
  - One 200ms fade, once. No parallax, no repeated animation.
  - prefers-reduced-motion: content simply appears (the global CSS also
    zeroes transition durations).
  - If IntersectionObserver is unavailable, content shows immediately.
  - Content is hidden only via opacity AFTER hydration, so users without
    JavaScript still see everything.
*/

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // Start visible (server render + no-JS); flip to hidden only if we can animate.
  const [state, setState] = React.useState<"initial" | "hidden" | "shown">("initial");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }

    // Already on screen? Don't hide it at all (avoids a flash at page top).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState("shown");
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-200 ease-out",
        state === "hidden" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
