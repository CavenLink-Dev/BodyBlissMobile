/* Shared booking display helpers (plain words for status, friendly dates). */

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  requested: "Requested",
  matched: "Therapist matched",
  confirmed: "Confirmed",
  on_the_way: "On the way",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function statusLabel(status: string): string {
  return BOOKING_STATUS_LABEL[status] ?? status;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}
