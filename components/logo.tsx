import { cn } from "@/lib/utils";

/*
  Body Bliss wordmark — inline SVG lotus above a stacked wordmark
  (BODY BLISS / MASSAGE AND DAY SPA). Built as an SVG + text so we fully
  control weight and colour: the lotus uses a thick stroke via currentColor,
  and the type is bold and set in the brand charcoal. Set the colour with a
  text-* class on the wrapper (charcoal in the header, white in the footer).
*/

function LotusMark({ className }: { className?: string }) {
  // One petal, tip up, base at origin. Reused and rotated to build the flower.
  const petal = "M0 0 C 15 -28, 15 -62, 0 -86 C -15 -62, -15 -28, 0 0 Z";
  return (
    <svg
      viewBox="0 0 200 108"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={6}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <g transform="translate(100 96)">
        <path d={petal} />
        <path d={petal} transform="rotate(-30) scale(0.96)" />
        <path d={petal} transform="rotate(30) scale(0.96)" />
        <path d={petal} transform="rotate(-58) scale(0.9)" />
        <path d={petal} transform="rotate(58) scale(0.9)" />
        <path d={petal} transform="rotate(-84) scale(0.82)" />
        <path d={petal} transform="rotate(84) scale(0.82)" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("flex flex-col items-center gap-1 leading-none", className)}>
      <LotusMark className={cn("h-8 w-auto tablet:h-10", markClassName)} />
      <span className="font-heading text-lg font-bold tracking-[0.22em] tablet:text-xl">
        BODY BLISS
      </span>
      <span className="text-[0.5rem] font-semibold tracking-[0.3em] tablet:text-[0.6rem]">
        MASSAGE AND DAY SPA
      </span>
    </span>
  );
}
