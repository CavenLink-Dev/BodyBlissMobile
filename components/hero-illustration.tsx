/*
  Hero illustration. An original at-home massage scene for the charcoal
  hero band, redrawn for a natural pose: the therapist stands behind the
  table with both hands on the client's back, the client rests face down
  under a towel with their head on the cradle. Night window, candle with
  drifting aroma, plant and the gold carry bag set the scene.

  Decorative only (aria-hidden). Motion is subtle and CSS only: rising
  aroma wisps, a slow breathing rise on the client, and a gentle press of
  the therapist's shoulders. The global prefers-reduced-motion rule
  freezes all of it.
*/

const IVORY = "hsl(38 41% 95%)";
const LINEN = "hsl(36 37% 84%)";
const GOLD = "hsl(var(--camel))";
const GOLD_DEEP = "hsl(41 60% 46%)";
const INK = "hsl(43 6% 14%)";
const SOOT = "hsl(43 6% 30%)";
const GREEN = "hsl(150 28% 40%)";
const GREEN_LIGHT = "hsl(150 30% 52%)";

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 300"
      role="img"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes bb-aroma {
          0%   { transform: translateY(0);     opacity: 0; }
          25%  { opacity: 0.9; }
          100% { transform: translateY(-24px); opacity: 0; }
        }
        .bb-aroma   { animation: bb-aroma 4s ease-in-out infinite; }
        .bb-aroma-2 { animation-delay: 1.3s; }
        .bb-aroma-3 { animation-delay: 2.6s; }
        @keyframes bb-breathe {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        .bb-breathe { animation: bb-breathe 4.5s ease-in-out infinite; }
        @keyframes bb-press {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(2.5px); }
        }
        .bb-press { animation: bb-press 4.5s ease-in-out infinite; }
      `}</style>

      <defs>
        <linearGradient id="bb-hero-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
      </defs>

      {/* soft ivory glow behind the scene */}
      <ellipse cx="215" cy="165" rx="195" ry="120" fill={IVORY} opacity="0.07" />

      {/* window: night sky, gold moon, stars */}
      <rect x="286" y="30" width="104" height="122" rx="10" fill={IVORY} opacity="0.14" />
      <rect x="294" y="38" width="88" height="106" rx="6" fill={INK} />
      <circle cx="354" cy="66" r="13" fill={GOLD} opacity="0.95" />
      <circle cx="348" cy="61" r="10" fill={INK} opacity="0.85" />
      <circle cx="314" cy="90" r="2" fill={IVORY} opacity="0.8" />
      <circle cx="332" cy="116" r="1.6" fill={IVORY} opacity="0.55" />
      <circle cx="308" cy="126" r="1.6" fill={IVORY} opacity="0.65" />
      <circle cx="366" cy="104" r="1.8" fill={IVORY} opacity="0.5" />

      {/* potted plant, left */}
      <g>
        <path d="M66 172c-11-19-31-23-44-19 5 15 22 25 40 23" fill={GREEN} />
        <path d="M68 172c2-21-8-39-23-45-4 17 5 35 19 43" fill={GREEN_LIGHT} />
        <path d="M79 170c9-13 24-16 34-12-5 11-19 17-32 15" fill={GREEN} opacity="0.85" />
        <path d="M54 172h30l-5 46H59l-5-46z" fill="url(#bb-hero-gold)" />
        <rect x="51" y="169" width="36" height="9" rx="4" fill={SOOT} />
      </g>

      {/* side table with candle + aroma */}
      <g>
        <rect x="96" y="216" width="52" height="8" rx="4" fill={SOOT} />
        <path d="M104 224l-4 38M140 224l4 38" stroke={SOOT} strokeWidth="5" strokeLinecap="round" />
        <rect x="112" y="196" width="20" height="20" rx="4" fill={IVORY} />
        <rect x="112" y="196" width="20" height="6" rx="3" fill="url(#bb-hero-gold)" />
        <g stroke={IVORY} strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path className="bb-aroma" d="M118 188c-3-5 3-8 0-13" opacity="0" />
          <path className="bb-aroma bb-aroma-2" d="M126 188c-3-5 3-8 0-13" opacity="0" />
          <path className="bb-aroma bb-aroma-3" d="M122 190c-3-5 3-8 0-13" opacity="0" />
        </g>
      </g>

      {/* therapist head and tunic, standing behind the table */}
      <g className="bb-press">
        {/* head with hair swept into a low bun */}
        <circle cx="222" cy="102" r="16" fill={IVORY} />
        <path d="M206 102c-1-13 9-21 20-20 6 1 10 4 12 8-8-3-16-1-20 4-3 3-4 6-4 9l-8-1z" fill={INK} />
        <circle cx="240" cy="94" r="6.5" fill={INK} />
        {/* torso in gold tunic */}
        <path
          d="M198 196c-2-38 6-62 24-66 18 4 26 28 24 66h-48z"
          fill="url(#bb-hero-gold)"
        />
        {/* collar */}
        <path d="M214 132c3 4 13 4 16 0l-8 10-8-10z" fill={IVORY} opacity="0.9" />
      </g>

      {/* client on the table, breathing gently */}
      <g className="bb-breathe">
        {/* body under a towel, lying face down */}
        <path
          d="M172 196c0-10 9-17 19-17h124c8 0 15 5 17 12l2 5H172z"
          fill={IVORY}
        />
        {/* gold trim on the towel */}
        <path d="M172 192h162v5H172z" fill="url(#bb-hero-gold)" opacity="0.9" />
        {/* head resting on the cradle, dark hair cap */}
        <circle cx="352" cy="188" r="13" fill={IVORY} />
        <path d="M340 183a13 13 0 0121-4c-7-3-14-2-21 4z" fill={INK} />
      </g>

      {/* therapist arms, drawn last so the hands rest on the client's back */}
      <g className="bb-press">
        <path
          d="M203 150c13 16 29 28 48 34"
          stroke={IVORY}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M243 148c12 12 24 20 38 26"
          stroke={IVORY}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        {/* hands, a shade warmer so they read against the towel */}
        <circle cx="253" cy="185" r="8" fill={LINEN} />
        <circle cx="283" cy="175" r="8" fill={LINEN} />
      </g>

      {/* portable massage table */}
      <g>
        <rect x="160" y="196" width="204" height="15" rx="7.5" fill={SOOT} />
        {/* head cradle */}
        <rect x="352" y="199" width="26" height="9" rx="4.5" fill={SOOT} />
        {/* A-frame legs */}
        <path d="M186 211l-16 51M202 211l16 51" stroke={IVORY} strokeWidth="7" strokeLinecap="round" opacity="0.85" />
        <path d="M322 211l-16 51M338 211l16 51" stroke={IVORY} strokeWidth="7" strokeLinecap="round" opacity="0.85" />
        <rect x="176" y="240" width="38" height="4" rx="2" fill={IVORY} opacity="0.45" />
        <rect x="312" y="240" width="38" height="4" rx="2" fill={IVORY} opacity="0.45" />
      </g>

      {/* gold carry bag, the mobile in mobile massage */}
      <g>
        <rect x="86" y="236" width="54" height="30" rx="7" fill="url(#bb-hero-gold)" />
        <path
          d="M101 236v-6c0-5 4-9 9-9h6c5 0 9 4 9 9v6h-7v-6c0-1-1-2-2-2h-6c-1 0-2 1-2 2v6h-7z"
          fill={SOOT}
        />
        <path
          d="M113 246c2 3 2 7 0 10-2-3-2-7 0-10zm-7 3c3 1 5 4 6 7-3-1-6-3-6-7zm14 0c0 4-3 6-6 7 1-3 3-6 6-7z"
          fill={INK}
        />
      </g>

      {/* floor line */}
      <rect x="36" y="262" width="352" height="4" rx="2" fill={IVORY} opacity="0.25" />
    </svg>
  );
}
