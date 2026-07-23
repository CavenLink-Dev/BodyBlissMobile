/*
  Service card illustrations. Original inline SVG scenes drawn in the same
  visual language as the how-it-works step illustrations (see
  step-illustrations.tsx): brand palette, soft circular backdrop, grounding
  shadow, one gentle accent per scene. Every service gets its own scene so
  the cards read at a glance, and the style stays consistent across the set.

  All are decorative (aria-hidden) — the card title carries the meaning.
*/

const GOLD = "hsl(var(--camel))";
const GOLD_DEEP = "hsl(41 65% 45%)";
const CHARCOAL = "hsl(var(--charcoal))";
const CREAM = "hsl(var(--cream))";
const LINEN = "hsl(var(--linen))";
const WHITE = "hsl(var(--white))";
const GREEN = "hsl(150 28% 42%)";
const GREEN_LIGHT = "hsl(150 32% 56%)";
const TAUPE = "hsl(35 27% 43%)";
const SKY = "hsl(200 45% 88%)";
const STONE_DARK = "hsl(0 0% 30%)";

function Frame({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      focusable="false"
      className="aspect-[4/3] w-full bg-cream"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKY} />
          <stop offset="100%" stopColor={CREAM} />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
      </defs>
      <circle cx="100" cy="76" r="66" fill={`url(#${id}-bg)`} />
      <ellipse cx="100" cy="130" rx="56" ry="7" fill={CHARCOAL} opacity="0.08" />
      <circle cx="154" cy="30" r="5" fill={GOLD} opacity="0.35" />
      <circle cx="42" cy="38" r="3.5" fill={GREEN_LIGHT} opacity="0.5" />
      {children}
    </svg>
  );
}

/* Shared massage table with a resting person, reused so every treatment
   scene stays consistent. */
function TableWithPerson({ id }: { id: string }) {
  return (
    <g>
      {/* table top + legs */}
      <rect x="40" y="96" width="120" height="12" rx="6" fill={`url(#${id}-gold)`} />
      <path d="M56 108l-8 20M144 108l8 20" stroke={TAUPE} strokeWidth="5" strokeLinecap="round" />
      {/* towel */}
      <rect x="46" y="90" width="108" height="10" rx="5" fill={WHITE} />
      {/* person lying face down */}
      <circle cx="62" cy="83" r="9" fill={TAUPE} />
      <path
        d="M72 88c14-7 42-7 58-3 8 2 14 4 16 6"
        stroke={GREEN}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

export function IllustrationRelaxation() {
  return (
    <Frame id="svc-relax">
      <TableWithPerson id="svc-relax" />
      {/* calm, flowing air above */}
      <path d="M60 48c10-8 22-8 32 0s22 8 32 0" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M72 62c8-6 18-6 26 0s18 6 26 0" stroke={GREEN_LIGHT} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* lotus */}
      <g transform="translate(100 30)">
        <path d="M0 8C-4 2 -4 -4 0 -8 4 -4 4 2 0 8z" fill={GOLD} />
        <path d="M-2 8C-9 6 -13 1 -13 -4 -7 -4 -3 1 -2 8z" fill={GOLD} opacity="0.7" />
        <path d="M2 8C9 6 13 1 13 -4 7 -4 3 1 2 8z" fill={GOLD} opacity="0.7" />
      </g>
    </Frame>
  );
}

export function IllustrationDeepTissue() {
  return (
    <Frame id="svc-deep">
      <TableWithPerson id="svc-deep" />
      {/* firm forearm pressure from above */}
      <path d="M124 38l-16 30" stroke={TAUPE} strokeWidth="9" strokeLinecap="round" />
      <circle cx="106" cy="72" r="8" fill={TAUPE} />
      {/* concentric pressure arcs into the back */}
      <path d="M94 66a14 14 0 0 1 24 0" stroke={GOLD} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M88 60a22 22 0 0 1 36 0" stroke={GOLD} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />
    </Frame>
  );
}

export function IllustrationRemedial() {
  return (
    <Frame id="svc-remedial">
      <TableWithPerson id="svc-remedial" />
      {/* assessment target over the problem area */}
      <g transform="translate(112 60)">
        <circle r="14" stroke={GOLD_DEEP} strokeWidth="3" fill="none" />
        <circle r="7" stroke={GOLD_DEEP} strokeWidth="3" fill="none" opacity="0.7" />
        <circle r="2.5" fill={GOLD_DEEP} />
      </g>
      {/* therapist's guiding hand */}
      <path d="M70 40c6 8 10 14 12 22" stroke={TAUPE} strokeWidth="8" strokeLinecap="round" />
      <circle cx="84" cy="66" r="7" fill={TAUPE} />
    </Frame>
  );
}

export function IllustrationPregnancy() {
  return (
    <Frame id="svc-pregnancy">
      {/* table */}
      <rect x="40" y="96" width="120" height="12" rx="6" fill={`url(#svc-pregnancy-gold)`} />
      <path d="M56 108l-8 20M144 108l8 20" stroke={TAUPE} strokeWidth="5" strokeLinecap="round" />
      <rect x="46" y="90" width="108" height="10" rx="5" fill={WHITE} />
      {/* side-lying mum with bump and support cushion */}
      <circle cx="66" cy="78" r="9" fill={TAUPE} />
      <path d="M76 86c12-6 30-6 44-2" stroke={GREEN} strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="98" cy="80" r="10" fill={GREEN_LIGHT} />
      <rect x="118" y="78" width="26" height="12" rx="6" fill={LINEN} />
      {/* gentle heart above the bump */}
      <path
        d="M98 52c-3-5-10-5-10 1 0 5 7 8 10 11 3-3 10-6 10-11 0-6-7-6-10-1z"
        fill={GOLD}
      />
    </Frame>
  );
}

export function IllustrationCouples() {
  return (
    <Frame id="svc-couples">
      {/* two smaller tables side by side */}
      <g transform="translate(-2 0)">
        <rect x="30" y="98" width="66" height="9" rx="4.5" fill={`url(#svc-couples-gold)`} />
        <path d="M40 107l-5 16M88 107l5 16" stroke={TAUPE} strokeWidth="4" strokeLinecap="round" />
        <rect x="34" y="93" width="58" height="8" rx="4" fill={WHITE} />
        <circle cx="44" cy="87" r="6.5" fill={TAUPE} />
        <path d="M52 90c8-4 22-4 32-1" stroke={GREEN} strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      <g transform="translate(76 0)">
        <rect x="30" y="98" width="66" height="9" rx="4.5" fill={`url(#svc-couples-gold)`} />
        <path d="M40 107l-5 16M88 107l5 16" stroke={TAUPE} strokeWidth="4" strokeLinecap="round" />
        <rect x="34" y="93" width="58" height="8" rx="4" fill={WHITE} />
        <circle cx="44" cy="87" r="6.5" fill={TAUPE} />
        <path d="M52 90c8-4 22-4 32-1" stroke={GREEN_LIGHT} strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      {/* two hearts, one per person */}
      <path d="M86 46c-2-4-8-4-8 1 0 4 5 6 8 9 3-3 8-5 8-9 0-5-6-5-8-1z" fill={GOLD} />
      <path d="M114 38c-2-4-8-4-8 1 0 4 5 6 8 9 3-3 8-5 8-9 0-5-6-5-8-1z" fill={GOLD} opacity="0.7" />
    </Frame>
  );
}

export function IllustrationHotel() {
  return (
    <Frame id="svc-hotel">
      <TableWithPerson id="svc-hotel" />
      {/* hotel window with moon — massage in your room */}
      <rect x="126" y="26" width="34" height="40" rx="4" fill={WHITE} />
      <rect x="126" y="26" width="34" height="40" rx="4" stroke={TAUPE} strokeWidth="2.5" fill="none" />
      <path d="M143 32a10 10 0 1 0 10 14 12 12 0 0 1-10-14z" fill={GOLD} />
      {/* bedside lamp glow */}
      <path d="M44 52h16l-4 12h-8z" fill={LINEN} />
      <path d="M52 64v10" stroke={TAUPE} strokeWidth="3" strokeLinecap="round" />
      <circle cx="52" cy="52" r="12" fill={GOLD} opacity="0.25" />
    </Frame>
  );
}

export function IllustrationHotStone() {
  return (
    <Frame id="svc-hotstone">
      <TableWithPerson id="svc-hotstone" />
      {/* warm basalt stones along the back */}
      <ellipse cx="92" cy="80" rx="7" ry="5" fill={STONE_DARK} />
      <ellipse cx="108" cy="79" rx="7" ry="5" fill={STONE_DARK} opacity="0.85" />
      <ellipse cx="124" cy="81" rx="7" ry="5" fill={STONE_DARK} opacity="0.7" />
      {/* rising warmth */}
      <path d="M96 62c-2-4 2-6 0-10" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M110 60c-2-4 2-6 0-10" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M124 62c-2-4 2-6 0-10" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </Frame>
  );
}

export function IllustrationChiropractic() {
  return (
    <Frame id="svc-chiro">
      {/* healthy spine curve */}
      <path d="M100 34c-10 12 10 22 0 34s10 22 0 34" stroke={TAUPE} strokeWidth="6" strokeLinecap="round" fill="none" />
      {[42, 58, 74, 90, 106].map((y, i) => (
        <circle key={y} cx={i % 2 === 0 ? 95 : 105} cy={y} r="4.5" fill={i === 2 ? GOLD : LINEN} stroke={TAUPE} strokeWidth="1.5" />
      ))}
      {/* supporting hands */}
      <path d="M64 66c8 2 14 4 20 8" stroke={GREEN} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M136 84c-8-2-14-4-20-8" stroke={GREEN} strokeWidth="7" strokeLinecap="round" fill="none" />
    </Frame>
  );
}

export function IllustrationDryNeedling() {
  return (
    <Frame id="svc-needle">
      <TableWithPerson id="svc-needle" />
      {/* fine needles at trigger points */}
      <g stroke={GOLD_DEEP} strokeWidth="2" strokeLinecap="round">
        <path d="M98 78V52" />
        <path d="M112 77V56" />
        <path d="M126 80V60" />
      </g>
      <circle cx="98" cy="50" r="3" fill={GOLD} />
      <circle cx="112" cy="54" r="3" fill={GOLD} />
      <circle cx="126" cy="58" r="3" fill={GOLD} />
    </Frame>
  );
}

export function IllustrationCupping() {
  return (
    <Frame id="svc-cupping">
      <TableWithPerson id="svc-cupping" />
      {/* glass cups on the back */}
      <g>
        <path d="M88 80a8 8 0 0 1 16 0z" fill={SKY} stroke={TAUPE} strokeWidth="2" />
        <path d="M110 79a8 8 0 0 1 16 0z" fill={SKY} stroke={TAUPE} strokeWidth="2" />
        <path d="M132 82a8 8 0 0 1 16 0z" fill={SKY} stroke={TAUPE} strokeWidth="2" />
      </g>
      <circle cx="96" cy="68" r="2.5" fill={GOLD} opacity="0.7" />
      <circle cx="118" cy="66" r="2.5" fill={GOLD} opacity="0.5" />
    </Frame>
  );
}

const ILLUSTRATIONS: Record<string, () => React.JSX.Element> = {
  relaxation: IllustrationRelaxation,
  deep_tissue: IllustrationDeepTissue,
  remedial: IllustrationRemedial,
  pregnancy: IllustrationPregnancy,
  couples: IllustrationCouples,
  hotel: IllustrationHotel,
  hot_stone: IllustrationHotStone,
  chiropractic: IllustrationChiropractic,
  "dry-needling": IllustrationDryNeedling,
  cupping: IllustrationCupping,
};

export function ServiceIllustration({ code }: { code: string }) {
  const Scene = ILLUSTRATIONS[code] ?? IllustrationRelaxation;
  return <Scene />;
}
