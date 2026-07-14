/*
  Global loading state — a quiet skeleton in token colours. No spinners or
  fancy animation; a gentle pulse that reduced-motion users see as static
  blocks (global CSS zeroes animation durations).
*/
export default function Loading() {
  return (
    <main className="px-page-inline py-page-block" role="status" aria-label="Loading">
      <div className="mx-auto flex max-w-content flex-col gap-card-gap">
        <div className="h-10 w-3/4 max-w-sm animate-pulse rounded bg-muted" />
        <div className="h-5 w-full max-w-prose animate-pulse rounded bg-muted" />
        <div className="h-5 w-2/3 max-w-prose animate-pulse rounded bg-muted" />
        <div className="mt-4 grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
          <div className="h-40 animate-pulse rounded bg-muted" />
          <div className="hidden h-40 animate-pulse rounded bg-muted tablet:block" />
          <div className="hidden h-40 animate-pulse rounded bg-muted tablet:block" />
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </main>
  );
}
