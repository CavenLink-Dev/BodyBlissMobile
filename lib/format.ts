/* Money + misc formatting helpers. */

export function formatAud(cents: number | null | undefined): string {
  if (cents == null) return "—";
  const dollars = cents / 100;
  // Whole dollars show without decimals; anything else shows cents.
  const hasCents = Math.round(dollars * 100) % 100 !== 0;
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(dollars);
}
