/* Shared catalogue types — safe to import from client or server code. */

export type ServiceVariant = {
  id: string;
  durationMinutes: number;
  priceCents: number | null;
};

export type ServiceWithPricing = {
  id: string;
  code: string;
  name: string;
  description: string;
  variants: ServiceVariant[];
  fromPriceCents: number | null;
};
