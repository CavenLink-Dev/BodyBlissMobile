/*
  Original illustration — an at-home mobile massage scene drawn in the named
  brand palette (ivory, camel, espresso, charcoal). Lives on the
  charcoal hero band. Decorative only (aria-hidden); the gentle "aroma"
  animation is CSS-only and disabled by the global prefers-reduced-motion
  rule in globals.css.
*/

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
          0%   { transform: translateY(0);    opacity: 0;   }
          25%  { opacity: 0.9; }
          100% { transform: translateY(-26px); opacity: 0;  }
        }
        .bb-aroma { animation: bb-aroma 4s ease-in-out infinite; }
        .bb-aroma-2 { animation-delay: 1.3s; }
        .bb-aroma-3 { animation-delay: 2.6s; }
      `}</style>

      {/* soft ivory glow behind the scene */}
      <ellipse cx="210" cy="160" rx="190" ry="120" fill="hsl(38 41% 95%)" opacity="0.08" />

      {/* window with night sky + moon (we come to you, evenings too) */}
      <rect x="288" y="38" width="96" height="118" rx="8" fill="hsl(38 41% 95%)" opacity="0.12" />
      <rect x="296" y="46" width="80" height="102" rx="4" fill="hsl(43 6% 16%)" />
      <circle cx="352" cy="72" r="12" fill="hsl(var(--camel))" opacity="0.9" />
      <circle cx="316" cy="96" r="2" fill="hsl(38 41% 95%)" opacity="0.7" />
      <circle cx="332" cy="118" r="1.6" fill="hsl(38 41% 95%)" opacity="0.5" />
      <circle cx="312" cy="128" r="1.6" fill="hsl(38 41% 95%)" opacity="0.6" />

      {/* potted plant */}
      <g>
        <path
          d="M64 176c-10-18-30-22-42-18 4 14 20 24 38 22"
          fill="hsl(152 40% 30%)"
        />
        <path
          d="M66 176c2-20-8-38-22-44-4 16 4 34 18 42"
          fill="hsl(152 40% 38%)"
        />
        <path d="M52 174h28l-5 44H57l-5-44z" fill="hsl(var(--camel))" />
        <rect x="50" y="172" width="32" height="8" rx="3" fill="hsl(43 6% 30%)" />
      </g>

      {/* aromatherapy wisps rising from the oil burner */}
      <g stroke="hsl(38 41% 95%)" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="bb-aroma" d="M330 206c-4-6 4-10 0-16" opacity="0" />
        <path className="bb-aroma bb-aroma-2" d="M340 206c-4-6 4-10 0-16" opacity="0" />
        <path className="bb-aroma bb-aroma-3" d="M350 206c-4-6 4-10 0-16" opacity="0" />
      </g>
      {/* oil burner / candle */}
      <rect x="322" y="208" width="36" height="12" rx="4" fill="hsl(var(--camel))" />
      <rect x="328" y="220" width="24" height="6" rx="2" fill="hsl(43 6% 30%)" />

      {/* therapist */}
      <g>
        {/* body */}
        <path
          d="M132 128c0-12 10-22 22-22s22 10 22 22v10l16 34-14 60h-14l6-52-16-26-16 26 6 52h-14l-14-60 16-34v-10z"
          fill="hsl(var(--camel))"
        />
        {/* head */}
        <circle cx="154" cy="92" r="15" fill="hsl(38 41% 95%)" />
        {/* hair bun */}
        <circle cx="164" cy="80" r="6" fill="hsl(43 6% 16%)" />
        <path d="M140 88c2-10 12-15 21-13-8 2-12 6-13 13h-8z" fill="hsl(43 6% 16%)" />
        {/* arms reaching to the client */}
        <path
          d="M146 132l40 44 12-8-36-48c-6-6-18 4-16 12z"
          fill="hsl(38 41% 95%)"
        />
        <path
          d="M170 128l44 36 10-10-40-38c-8-6-18 4-14 12z"
          fill="hsl(38 41% 95%)"
        />
      </g>

      {/* client on the massage table */}
      <g>
        {/* towel-covered client */}
        <path
          d="M188 186c0-8 8-14 16-14h116c10 0 18 6 18 14v8H188v-8z"
          fill="hsl(38 41% 95%)"
        />
        {/* head on the cradle */}
        <circle cx="352" cy="186" r="12" fill="hsl(38 41% 95%)" opacity="0.95" />
        <path d="M344 178c6-4 14-2 17 3-5-1-11 0-14 4l-3-7z" fill="hsl(43 6% 16%)" />
        {/* camel trim on the towel */}
        <rect x="188" y="192" width="150" height="4" fill="hsl(var(--camel))" />
      </g>

      {/* portable massage table */}
      <g>
        <rect x="176" y="194" width="188" height="14" rx="7" fill="hsl(43 6% 30%)" />
        {/* folding legs */}
        <path d="M198 208l-14 54h9l14-54h-9z" fill="hsl(38 41% 95%)" opacity="0.85" />
        <path d="M214 208l14 54h-9l-14-54h9z" fill="hsl(38 41% 95%)" opacity="0.85" />
        <path d="M330 208l-14 54h9l14-54h-9z" fill="hsl(38 41% 95%)" opacity="0.85" />
        <path d="M346 208l14 54h-9l-14-54h9z" fill="hsl(38 41% 95%)" opacity="0.85" />
        {/* leg cross-braces */}
        <rect x="192" y="238" width="48" height="4" rx="2" fill="hsl(38 41% 95%)" opacity="0.5" />
        <rect x="324" y="238" width="48" height="4" rx="2" fill="hsl(38 41% 95%)" opacity="0.5" />
      </g>

      {/* therapist's carry bag — the "mobile" in mobile massage */}
      <g>
        <rect x="86" y="234" width="52" height="30" rx="6" fill="hsl(var(--camel))" />
        <path
          d="M100 234v-6c0-5 4-9 9-9h6c5 0 9 4 9 9v6h-7v-6c0-1-1-2-2-2h-6c-1 0-2 1-2 2v6h-7z"
          fill="hsl(43 6% 30%)"
        />
        {/* lotus mark on the bag */}
        <path
          d="M112 244c2 3 2 7 0 10-2-3-2-7 0-10zm-7 3c3 1 5 4 6 7-3-1-6-3-6-7zm14 0c0 4-3 6-6 7 1-3 3-6 6-7z"
          fill="hsl(43 6% 16%)"
        />
      </g>

      {/* floor line */}
      <rect x="40" y="262" width="344" height="4" rx="2" fill="hsl(38 41% 95%)" opacity="0.25" />
    </svg>
  );
}
