/*
  How-it-works step illustrations — original inline SVGs drawn purely from
  brand tokens (gold, charcoal, cream, white), so they recolour with the
  theme. Bright, flat, softly animated: each has one small looping motion
  (float / pulse / steam) using the bb-anim-* classes in globals.css, which
  the global prefers-reduced-motion rule freezes automatically.

  All four are decorative (aria-hidden) — the step title and body carry
  the meaning. No logos, no stock imagery.
*/

const GOLD = "hsl(var(--camel))";
const CHARCOAL = "hsl(var(--charcoal))";
const CREAM = "hsl(var(--cream))";
const LINEN = "hsl(var(--linen))";
const WHITE = "hsl(var(--white))";
/* Gentle supporting tones that stay within the warm palette:
   a muted eucalyptus green and a warm taupe brown. */
const GREEN = "hsl(150 28% 42%)";
const GREEN_LIGHT = "hsl(150 30% 55%)";
const TAUPE = "hsl(35 27% 43%)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      focusable="false"
      className="h-28 w-full"
    >
      {/* soft backdrop */}
      <circle cx="100" cy="78" r="64" fill={CREAM} />
      <circle cx="152" cy="34" r="10" fill={GOLD} opacity="0.25" />
      <circle cx="44" cy="118" r="6" fill={GOLD} opacity="0.25" />
      {children}
    </svg>
  );
}

/* Step 1 — Choose your treatment: a phone with a service list, the chosen
   row ticked in gold (tick pulses gently). */
export function IllustrationChoose() {
  return (
    <Frame>
      {/* small leaf accent */}
      <g className="bb-anim-sway">
        <path d="M52 60c-2-10 3-19 11-22 1 9-3 18-11 22z" fill={GREEN_LIGHT} />
      </g>
      <g className="bb-anim-float">
        <rect x="70" y="26" width="60" height="104" rx="10" fill={TAUPE} />
        <rect x="75" y="34" width="50" height="88" rx="6" fill={WHITE} />
        {/* service rows */}
        <rect x="80" y="42" width="40" height="12" rx="3" fill={LINEN} />
        <rect x="80" y="76" width="40" height="12" rx="3" fill={LINEN} />
        <rect x="80" y="93" width="40" height="12" rx="3" fill={LINEN} />
        {/* selected row */}
        <rect x="80" y="59" width="40" height="12" rx="3" fill={GOLD} />
        <g className="bb-anim-pulse" style={{ transformOrigin: "126px 58px" }}>
          <circle cx="126" cy="58" r="9" fill={GOLD} />
          <path
            d="M121.5 58l3 3 6-6"
            stroke={WHITE}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </Frame>
  );
}

/* Step 2 — Tell us where: a warm little house with a gold location pin
   floating above the roof. */
export function IllustrationLocation() {
  return (
    <Frame>
      {/* house */}
      <rect x="62" y="78" width="76" height="48" rx="4" fill={WHITE} />
      <path d="M56 82l44-30 44 30" stroke={TAUPE} strokeWidth="7" strokeLinecap="round" fill="none" />
      <rect x="90" y="96" width="20" height="30" rx="2" fill={GOLD} />
      <rect x="70" y="90" width="13" height="13" rx="2" fill={LINEN} />
      <rect x="117" y="90" width="13" height="13" rx="2" fill={LINEN} />
      {/* garden bush beside the house */}
      <g className="bb-anim-sway">
        <circle cx="50" cy="118" r="9" fill={GREEN} />
        <circle cx="42" cy="122" r="7" fill={GREEN_LIGHT} />
      </g>
      {/* floating pin */}
      <g className="bb-anim-float">
        <path
          d="M100 18c-9 0-16 7-16 15.5C84 44 100 58 100 58s16-14 16-24.5C116 25 109 18 100 18z"
          fill={GOLD}
        />
        <circle cx="100" cy="33" r="6" fill={WHITE} />
      </g>
    </Frame>
  );
}

/* Step 3 — Pick your therapist: two profile cards, the front one chosen
   with a pulsing gold tick. */
export function IllustrationTherapist() {
  return (
    <Frame>
      {/* back card */}
      <g opacity="0.55">
        <rect x="98" y="44" width="52" height="66" rx="8" fill={WHITE} />
        <circle cx="124" cy="66" r="11" fill={LINEN} />
        <rect x="108" y="84" width="32" height="7" rx="3" fill={LINEN} />
        <rect x="112" y="95" width="24" height="6" rx="3" fill={LINEN} />
      </g>
      {/* front card */}
      <rect x="52" y="38" width="56" height="74" rx="8" fill={WHITE} />
      <circle cx="80" cy="62" r="13" fill={GOLD} />
      <path
        d="M80 57a5 5 0 110 10 5 5 0 010-10zm-8.5 16a11 11 0 0117 0"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="62" y="82" width="36" height="7" rx="3" fill={LINEN} />
      <rect x="66" y="94" width="28" height="6" rx="3" fill={LINEN} />
      <g className="bb-anim-pulse" style={{ transformOrigin: "106px 44px" }}>
        <circle cx="106" cy="44" r="11" fill={GOLD} />
        <path
          d="M100.5 44l3.5 3.5 7-7"
          stroke={WHITE}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </Frame>
  );
}

/* Step 4 — Relax at your place: person resting on the massage table, a
   candle beside it with steam wisps drifting up. */
export function IllustrationRelax() {
  return (
    <Frame>
      {/* table */}
      <rect x="46" y="86" width="108" height="12" rx="6" fill={CHARCOAL} />
      <path d="M62 98l-8 30M138 98l8 30" stroke={CHARCOAL} strokeWidth="6" strokeLinecap="round" />
      {/* cushioned top + person */}
      <rect x="50" y="78" width="100" height="10" rx="5" fill={GOLD} />
      <circle cx="66" cy="72" r="9" fill={CHARCOAL} />
      <path
        d="M76 78c14-8 44-8 62-2"
        stroke={CHARCOAL}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* towel stripe */}
      <rect x="104" y="68" width="26" height="8" rx="4" fill={WHITE} />
      {/* candle */}
      <rect x="158" y="106" width="14" height="20" rx="3" fill={WHITE} />
      <rect x="158" y="106" width="14" height="6" rx="3" fill={GOLD} />
      <g stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="bb-anim-steam" d="M163 98c2-3-2-5 0-8" />
        <path className="bb-anim-steam-late" d="M168 96c2-3-2-5 0-8" />
      </g>
      {/* potted plant on the other side */}
      <g>
        <g className="bb-anim-sway">
          <path d="M36 104c-6-10-16-12-24-10 3 8 12 14 22 12" fill={GREEN_LIGHT} />
          <path d="M38 104c1-11-4-21-12-24-2 9 2 19 10 24" fill={GREEN} />
        </g>
        <path d="M28 104h18l-3 22H31l-3-22z" fill={TAUPE} />
      </g>
    </Frame>
  );
}
