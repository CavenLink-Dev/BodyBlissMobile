import { cn } from "@/lib/utils";

/*
  Section heading with an "eyebrow" overline — a short yellow rule + small
  tracked label above the title. Gives every section a consistent, designed
  entry point and improves scanning rhythm. The eyebrow is supportive only
  (caption size never carries essential info) and the yellow rule is purely
  decorative, per the yellow rule.
*/

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  action,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-compact", className)}>
      {eyebrow ? (
        <p className="flex items-center gap-compact text-caption font-medium uppercase tracking-[0.14em] text-bb-text-description">
          <span aria-hidden="true" className="h-0.5 w-6 rounded bg-secondary" />
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-component">
        <h2
          id={id}
          className="font-heading text-title font-semibold text-bb-text-title"
        >
          {title}
        </h2>
        {action}
      </div>
      {lead ? (
        <p className="max-w-prose text-description text-bb-text-description">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
