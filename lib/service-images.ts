import type { StaticImageData } from "next/image";

import serviceRelaxation from "@/assets/service_relaxation.jpg";

/*
  Photos for the service selection cards (reference design, July 2026):
  each card leads with a photo, then title, description, a simple price
  line and the two actions.

  Only services with a real photo appear here — cards without one fall
  back to the icon band so nothing looks broken. To add a photo, drop it
  in /assets and add one line below.
*/
export const SERVICE_IMAGES: Record<string, StaticImageData> = {
  relaxation: serviceRelaxation,
};
