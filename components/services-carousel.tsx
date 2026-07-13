import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatAud } from "@/lib/format";
import type { ServiceWithPricing } from "@/lib/catalogue-types";

/*
  Space-saving services carousel: a native horizontal scroll-snap list.
  Zero JavaScript — swiping works on every phone, trackpads and keyboards
  scroll it, and screen readers read it as a plain list. Cards peek at the
  edge so it's obvious there's more to swipe.
*/

export function ServicesCarousel({ services }: { services: ServiceWithPricing[] }) {
  return (
    <div className="flex flex-col gap-compact">
      <ul
        aria-label="Massage services"
        className="-mx-page-inline flex snap-x snap-mandatory gap-card-gap overflow-x-auto scroll-px-page-inline px-page-inline pb-2"
      >
        {services.map((s) => (
          <li
            key={s.id}
            className="w-[78%] shrink-0 snap-start tablet:w-[45%] desktop:w-[31%]"
          >
            <Card className="flex h-full flex-col gap-component">
              <div className="flex items-start justify-between gap-component">
                <CardTitle className="text-subtitle">{s.name}</CardTitle>
                {s.fromPriceCents != null ? (
                  <Badge variant="secondary">from {formatAud(s.fromPriceCents)}</Badge>
                ) : null}
              </div>
              <CardDescription className="flex-1">{s.description}</CardDescription>
              <div>
                <Button asChild variant="secondary">
                  <Link href={`/book?service=${s.code}`}>Book Now</Link>
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <p className="text-caption text-bb-text-caption" aria-hidden="true">
        Swipe to see more →
      </p>
    </div>
  );
}
