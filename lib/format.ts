/* Money + misc formatting helpers. */

export function formatAud(cents: number | null | undefined): string {
  if (cents == null) return "—";
  // Prices always show as whole dollars, rounded up (e.g. $169.99 → $170).
  const dollars = Math.ceil(cents / 100);
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}
