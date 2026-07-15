import Link from "next/link";
import {
  Waves,
  Activity,
  Baby,
  Users,
  Hotel,
  Armchair,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

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

const SERVICE_ICONS: Record<string, LucideIcon> = {
  relaxation: Waves,
  deep_tissue: Activity,
  pregnancy: Baby,
  couples: Users,
  hotel: Hotel,
  corporate: Armchair,
};

export function ServicesCarousel({ services }: { services: ServiceWithPricing[] }) {
  return (
    <div className="flex flex-col gap-compact">
      <ul
        aria-label="Massage services"
        className="-mx-page-inline flex snap-x snap-mandatory gap-card-gap overflow-x-auto scroll-px-page-inline px-page-inline pb-2"
      >
        {services.map((s) => {
          const Icon = SERVICE_ICONS[s.code] ?? Sparkles;
          return (
          <li
            key={s.id}
            className="w-[78%] shrink-0 snap-start tablet:w-[45%] desktop:w-[31%]"
          >
            <Card className="flex h-full flex-col gap-component">
              <div className="flex items-start justify-between gap-component">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-full bg-secondary"
                  aria-hidden="true"
                >
                  <Icon className="size-6 text-secondary-foreground" />
                </span>
                {s.fromPriceCents != null ? (
                  <Badge variant="secondary">from {formatAud(s.fromPriceCents)}</Badge>
                ) : null}
              </div>
              <CardTitle className="text-subtitle">
                <Link
                  href={`/services/${s.code}`}
                  className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {s.name}
                </Link>
              </CardTitle>
              <CardDescription className="flex-1">{s.description}</CardDescription>
              <div className="flex flex-wrap gap-compact">
                <Button asChild variant="secondary">
                  <Link href={`/book?service=${s.code}`}>Book Now</Link>
                </Button>
                <Button asChild variant="quiet">
                  <Link
                    href={`/services/${s.code}`}
                    aria-label={`Learn more about ${s.name}`}
                  >
                    Details
                  </Link>
                </Button>
              </div>
            </Card>
          </li>
          );
        })}
      </ul>
      <p className="text-caption text-bb-text-caption" aria-hidden="true">
        Swipe to see more →
      </p>
    </div>
  );
}
