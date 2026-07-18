/*
  How-it-works step illustrations. Original inline SVG scenes drawn in the
  brand palette with gentle supporting tones (eucalyptus green, warm taupe,
  soft sky). Each scene loops one small motion (float, pulse, steam, sway)
  via the bb-anim classes in globals.css, and the whole illustration
  responds to touch and hover: it lifts slightly when you press the card,
  which works with a finger on iPhone through the active state. The global
  reduced motion rule freezes everything automatically.

  All four are decorative (aria-hidden); the step title and body carry the
  meaning.
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

function Frame({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      focusable="false"
      className="h-32 w-full transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] group-active:-translate-y-1 group-active:scale-[1.04]"
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
      {/* soft sky-to-cream backdrop */}
      <circle cx="100" cy="76" r="66" fill={`url(#${id}-bg)`} />
      {/* grounding shadow */}
      <ellipse cx="100" cy="134" rx="52" ry="7" fill={CHARCOAL} opacity="0.08" />
      {/* floating dust motes */}
      <circle cx="152" cy="32" r="5" fill={GOLD} opacity="0.35" className="bb-anim-float" />
      <circle cx="44" cy="40" r="3.5" fill={GREEN_LIGHT} opacity="0.5" />
      {children}
    </svg>
  );
}

/* Step 1. Choosing a treatment on a phone, the picked service glows gold
   and its tick pulses. A leaf sways beside the phone. */
export function IllustrationChoose() {
  return (
    <Frame id="ill-choose">
      <g className="bb-anim-sway">
        <path d="M50 66c-3-12 3-23 13-27 2 11-3 22-13 27z" fill={GREEN_LIGHT} />
        <path d="M52 68c-8-6-18-5-24 1 7 6 17 6 24-1z" fill={GREEN} opacity="0.85" />
      </g>
      <g className="bb-anim-float">
        {/* phone body with gold frame */}
        <rect x="68" y="24" width="64" height="108" rx="12" fill={`url(#ill-choose-gold)`} />
        <rect x="73" y="32" width="54" height="92" rx="7" fill={WHITE} />
        {/* header bar */}
        <rect x="78" y="38" width="26" height="5" rx="2.5" fill={CHARCOAL} opacity="0.7" />
        {/* service rows */}
        <rect x="78" y="50" width="44" height="13" rx="4" fill={LINEN} />
        <rect x="78" y="86" width="44" height="13" rx="4" fill={LINEN} />
        <rect x="78" y="104" width="44" height="13" rx="4" fill={LINEN} />
        {/* the chosen row */}
        <rect x="78" y="68" width="44" height="13" rx="4" fill={`url(#ill-choose-gold)`} />
        <rect x="82" y="72" width="20" height="5" rx="2.5" fill={WHITE} opacity="0.9" />
        <g className="bb-anim-pulse" style={{ transformOrigin: "128px 68px" }}>
          <circle cx="128" cy="68" r="10" fill={GREEN} />
          <path
            d="M123 68l3.5 3.5 7-7"
            stroke={WHITE}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </Frame>
  );
}

/* Step 2. A warm home with a glowing porch light and a gold pin floating
   above the roof, garden swaying beside it. */
export function IllustrationLocation() {
  return (
    <Frame id="ill-location">
      {/* path to the door */}
      <path d="M96 128c0-6 8-6 8 0" stroke={TAUPE} strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
      {/* house */}
      <rect x="60" y="76" width="80" height="52" rx="5" fill={WHITE} />
      <path d="M54 80l46-32 46 32" stroke={TAUPE} strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* door with tiny gold knob */}
      <rect x="90" y="96" width="21" height="32" rx="3" fill={`url(#ill-location-gold)`} />
      <circle cx="107" cy="112" r="1.8" fill={CHARCOAL} />
      {/* windows with warm light */}
      <rect x="68" y="90" width="14" height="14" rx="2.5" fill={GOLD} opacity="0.45" />
      <rect x="118" y="90" width="14" height="14" rx="2.5" fill={GOLD} opacity="0.45" />
      {/* garden */}
      <g className="bb-anim-sway">
        <circle cx="50" cy="120" r="10" fill={GREEN} />
        <circle cx="41" cy="124" r="7" fill={GREEN_LIGHT} />
      </g>
      <g className="bb-anim-sway" style={{ animationDelay: "1s" }}>
        <circle cx="152" cy="122" r="8" fill={GREEN_LIGHT} />
      </g>
      {/* floating pin */}
      <g className="bb-anim-float">
        <path
          d="M100 14c-9.5 0-17 7.3-17 16.3C83 41.5 100 56 100 56s17-14.5 17-25.7C117 21.3 109.5 14 100 14z"
          fill={`url(#ill-location-gold)`}
        />
        <circle cx="100" cy="30" r="6.2" fill={WHITE} />
      </g>
    </Frame>
  );
}

/* Step 3. Choosing between two therapist cards, the front one selected
   with a pulsing green tick. */
export function IllustrationTherapist() {
  return (
    <Frame id="ill-therapist">
      {/* back card */}
      <g opacity="0.55">
        <rect x="100" y="46" width="52" height="68" rx="9" fill={WHITE} />
        <circle cx="126" cy="68" r="11" fill={SKY} />
        <path d="M126 63a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm-7.5 14a10 10 0 0115 0" fill="none" stroke={TAUPE} strokeWidth="2" strokeLinecap="round" />
        <rect x="110" y="88" width="32" height="6" rx="3" fill={LINEN} />
        <rect x="114" y="98" width="24" height="5" rx="2.5" fill={LINEN} />
      </g>
      {/* front card */}
      <g className="bb-anim-float">
        <rect x="48" y="38" width="58" height="78" rx="9" fill={WHITE} />
        <circle cx="77" cy="63" r="14" fill={`url(#ill-therapist-gold)`} />
        <path
          d="M77 57a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm-9 17.5a12 12 0 0118 0"
          fill="none"
          stroke={WHITE}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <rect x="59" y="86" width="36" height="7" rx="3.5" fill={LINEN} />
        <rect x="63" y="98" width="28" height="6" rx="3" fill={LINEN} />
        <g className="bb-anim-pulse" style={{ transformOrigin: "104px 44px" }}>
          <circle cx="104" cy="44" r="11" fill={GREEN} />
          <path
            d="M98.5 44l3.5 3.5 7-7"
            stroke={WHITE}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </Frame>
  );
}

/* Step 4. Deep rest: person on the massage table, candle steam drifting,
   a plant swaying and a little sleepy "z" rising. */
export function IllustrationRelax() {
  return (
    <Frame id="ill-relax">
      {/* sleepy z's */}
      <g fill={TAUPE} className="bb-anim-float" style={{ animationDelay: "0.6s" }}>
        <text x="52" y="52" fontSize="13" fontFamily="inherit" fontWeight="700" opacity="0.65">z</text>
        <text x="62" y="42" fontSize="9" fontFamily="inherit" fontWeight="700" opacity="0.45">z</text>
      </g>
      {/* table */}
      <rect x="44" y="88" width="112" height="12" rx="6" fill={TAUPE} />
      <path d="M60 100l-8 30M140 100l8 30" stroke={TAUPE} strokeWidth="6" strokeLinecap="round" />
      {/* cushioned top + person under a white towel */}
      <rect x="48" y="80" width="104" height="10" rx="5" fill={`url(#ill-relax-gold)`} />
      <circle cx="64" cy="74" r="9" fill={CHARCOAL} />
      <path
        d="M74 80c16-9 46-9 64-2"
        stroke={CHARCOAL}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M100 72c10-4 26-4 34 1l-2 7h-32v-8z" fill={WHITE} />
      {/* candle */}
      <rect x="160" y="108" width="14" height="20" rx="3" fill={WHITE} />
      <rect x="160" y="108" width="14" height="6" rx="3" fill={`url(#ill-relax-gold)`} />
      <g stroke={GOLD_DEEP} strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="bb-anim-steam" d="M165 100c2-3-2-5 0-8" />
        <path className="bb-anim-steam-late" d="M170 98c2-3-2-5 0-8" />
      </g>
      {/* potted plant */}
      <g>
        <g className="bb-anim-sway">
          <path d="M34 104c-6-10-16-12-24-10 3 8 12 14 22 12" fill={GREEN_LIGHT} />
          <path d="M36 104c1-11-4-21-12-24-2 9 2 19 10 24" fill={GREEN} />
        </g>
        <path d="M26 104h18l-3 22H29l-3-22z" fill={TAUPE} />
      </g>
    </Frame>
  );
}
