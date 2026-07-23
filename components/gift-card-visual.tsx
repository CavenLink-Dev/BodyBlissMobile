"use client";

/*
  Gift card visual — a genuine "present" you can send or download.

  This deliberately steps outside the page's flat token palette (per the
  owner's steer) to look like a premium, foiled gift card: warm charcoal
  gradient, gold foil type, and a lotus motif. The card is built as a single
  SVG so the exact same artwork is used on screen AND for the PNG download —
  one source of truth, always in sync.
*/

export type GiftCardArt = {
  amount: string; // preformatted, e.g. "$100"
  to?: string;
  from?: string;
  message?: string;
  code?: string;
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clamp(s: string, max: number): string {
  const t = s.trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

/* One lotus petal, tip up, base at origin — rotated to build the flower. */
const PETAL = "M0 0 C 15 -28 15 -62 0 -86 C -15 -62 -15 -28 0 0 Z";

export function buildGiftCardSvg(art: GiftCardArt): string {
  const to = clamp(art.to?.trim() || "someone special", 26);
  const from = clamp(art.from?.trim() || "you", 26);
  const message = art.message ? clamp(art.message, 42) : "";
  const code = art.code?.trim();

  // Vertical rhythm shifts a little when a message is present.
  const toY = 284;
  const msgY = 314;
  const fromY = message ? 344 : 314;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 420" width="700" height="420" role="img" aria-label="Body Bliss gift card for ${esc(
    to,
  )}, ${esc(art.amount)}">
  <defs>
    <linearGradient id="bbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2A2822"/>
      <stop offset="0.55" stop-color="#343128"/>
      <stop offset="1" stop-color="#211F1A"/>
    </linearGradient>
    <linearGradient id="bfoil2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F9D26B"/>
      <stop offset="1" stop-color="#EBB02F"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="700" height="420" rx="30" fill="url(#bbg)"/>
  <rect x="16" y="16" width="668" height="388" rx="20" fill="none" stroke="#F6C440" stroke-opacity="0.45" stroke-width="1.5"/>

  <!-- lotus watermark -->
  <g transform="translate(566 322) scale(1.7)" fill="none" stroke="#F6C440" stroke-opacity="0.10" stroke-width="6" stroke-linejoin="round">
    <path d="${PETAL}"/>
    <path d="${PETAL}" transform="rotate(-30) scale(0.96)"/>
    <path d="${PETAL}" transform="rotate(30) scale(0.96)"/>
    <path d="${PETAL}" transform="rotate(-58) scale(0.9)"/>
    <path d="${PETAL}" transform="rotate(58) scale(0.9)"/>
    <path d="${PETAL}" transform="rotate(-84) scale(0.82)"/>
    <path d="${PETAL}" transform="rotate(84) scale(0.82)"/>
  </g>

  <!-- brand -->
  <text x="52" y="56" fill="#F6C440" font-family="'Helvetica Neue', Arial, sans-serif" font-size="13" font-weight="600" letter-spacing="5">GIFT CARD</text>
  <text x="52" y="94" fill="#F6EFE2" font-family="'Helvetica Neue', Arial, sans-serif" font-size="29" font-weight="700" letter-spacing="4">BODY BLISS</text>
  <text x="53" y="116" fill="#F6C440" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="4">MASSAGE AND DAY SPA</text>

  <!-- amount -->
  <text x="50" y="214" fill="url(#bfoil2)" font-family="'Helvetica Neue', Arial, sans-serif" font-size="80" font-weight="800">${esc(
    art.amount,
  )}</text>
  <rect x="54" y="234" width="90" height="4" rx="2" fill="#F6C440"/>

  <!-- recipient / message / sender -->
  <text x="52" y="${toY}" fill="#ECE7DE" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="500">For ${esc(
    to,
  )}</text>
  ${
    message
      ? `<text x="52" y="${msgY}" fill="#FCE3A4" font-family="Georgia, 'Times New Roman', serif" font-size="16" font-style="italic">“${esc(
          message,
        )}”</text>`
      : ""
  }
  <text x="52" y="${fromY}" fill="#BDB6A8" font-family="'Helvetica Neue', Arial, sans-serif" font-size="16">From ${esc(
    from,
  )}</text>

  <!-- code / validity -->
  ${
    code
      ? `<text x="52" y="390" fill="#F6EFE2" font-family="'Courier New', monospace" font-size="17" font-weight="700" letter-spacing="3">${esc(
          code,
        )}</text>`
      : `<text x="52" y="390" fill="#B7B1A6" font-family="'Helvetica Neue', Arial, sans-serif" font-size="13">Redeemable against any massage</text>`
  }
  <text x="648" y="390" text-anchor="end" fill="#B7B1A6" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12.5">Valid for 3 years</text>
</svg>`;
}

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** On-screen card — the same SVG that downloads, so what you see is what you get. */
export function GiftCardVisual({
  art,
  className,
}: {
  art: GiftCardArt;
  className?: string;
}) {
  const svg = buildGiftCardSvg(art);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={svgToDataUrl(svg)}
      alt={`Body Bliss gift card for ${art.to || "someone special"}, ${art.amount}`}
      className={className ?? "w-full rounded-xl shadow-raised"}
    />
  );
}

/** Rasterise the card SVG to a PNG and trigger a download. Client-only. */
export function downloadGiftCardPng(art: GiftCardArt): Promise<void> {
  return new Promise((resolve, reject) => {
    const svg = buildGiftCardSvg(art);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scale = 2; // crisp on retina / print
      const canvas = document.createElement("canvas");
      canvas.width = 700 * scale;
      canvas.height = 420 * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not available"));
        return;
      }
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, 700, 420);
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not create image"));
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "body-bliss-gift-card.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        resolve();
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Could not render gift card"));
    img.src = svgToDataUrl(svg);
  });
}
