import Link from "next/link";
import Image from "next/image";
import {
  Waves,
  Activity,
  Baby,
  Users,
  Hotel,
  Sparkles,
  HandHeart,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { formatAud } from "@/lib/format";
import { SERVICE_IMAGES } from "@/lib/service-images";
import type { ServiceWithPricing } from "@/lib/catalogue-types";

/*
  Space-saving services carousel: a native horizontal scroll-snap list.
  Zero JavaScript — swiping works on every phone, trackpads and keyboards
  scroll it, and screen readers read it as a plain list. Cards peek at the
  edge so it's obvious there's more to swipe.

  Card layout (reference design, July 2026): photo on top, title,
  description, a simple price line, then Book Now (gold) + Details
  (pale gold). Services without a photo fall back to the icon band.
*/

const SERVICE_ICONS: Record<string, LucideIcon> = {
  relaxation: Waves,
  remedial: HandHeart,
  deep_tissue: Activity,
  pregnancy: Baby,
  couples: Users,
  hotel: Hotel,
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
          const photo = SERVICE_IMAGES[s.code];
          return (
          <li
            key={s.id}
            className="w-[78%] shrink-0 snap-start tablet:w-[45%] desktop:w-[31%]"
          >
            <Card className="flex h-full flex-col gap-component overflow-hidden p-0">
              {photo ? (
                <Image
                  src={photo}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 78vw"
                  placeholder="blur"
                />
              ) : (
                <div
                  className="flex aspect-[4/3] w-full items-center justify-center bg-linen"
                  aria-hidden="true"
                >
                  <Icon className="size-10 text-charcoal" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-component p-card-padding pt-0">
                <CardTitle className="text-title font-semibold text-bb-text-display">
                  <Link
                    href={`/services/${s.code}`}
                    className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {s.name}
                  </Link>
                </CardTitle>
                <CardDescription className="flex-1">{s.description}</CardDescription>
                {s.fromPriceCents != null ? (
                  <p className="text-description font-medium text-bb-text-display">
                    From {formatAud(s.fromPriceCents)}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-compact">
                  <Button asChild variant="primary">
                    <Link href={`/book?service=${s.code}`}>Book Now</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link
                      href={`/services/${s.code}`}
                      aria-label={`Learn more about ${s.name}`}
                    >
                      Details
                    </Link>
                  </Button>
                </div>
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
