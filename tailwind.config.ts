import animate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

/*
  Body Bliss Mobile Massage — Tailwind theme wired to the design tokens in
  app/globals.css. Palette: charcoal + layered warm neutrals (owner decision,
  July 2026 — supersedes the token file's yellow accent). Typography/spacing/
  breakpoints per tokens: phone <640 · tablet 640–1007 · desktop ≥1008.
*/

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Token breakpoints (mobile-first): tablet 640, desktop 1008.
    screens: {
      tablet: "640px",
      desktop: "1008px",
    },
    extend: {
      colors: {
        // Named brand palette (raw values live in app/globals.css)
        ivory: "hsl(var(--ivory))",
        cream: "hsl(var(--cream))",
        linen: "hsl(var(--linen))",
        sand: "hsl(var(--sand))",
        camel: "hsl(var(--camel))",
        taupe: "hsl(var(--taupe))",
        stone: "hsl(var(--stone))",
        charcoal: "hsl(var(--charcoal))",
        espresso: "hsl(var(--espresso))",
        graphite: "hsl(var(--graphite))",
        "olive-ink": "hsl(var(--olive-ink))",
        "slate-ink": "hsl(var(--slate-ink))",
        "smoke-ink": "hsl(var(--smoke-ink))",
        "clay-red": "hsl(var(--clay-red))",
        forest: "hsl(var(--forest))",
        // Semantic roles
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Body Bliss token roles
        "bb-text": {
          display: "hsl(var(--bb-text-display))",
          title: "hsl(var(--bb-text-title))",
          subtitle: "hsl(var(--bb-text-subtitle))",
          description: "hsl(var(--bb-text-description))",
          caption: "hsl(var(--bb-text-caption))",
        },
        "bb-nav": {
          DEFAULT: "hsl(var(--bb-nav-default))",
          selected: "hsl(var(--bb-nav-selected-text))",
          accent: "hsl(var(--bb-nav-accent))",
        },
        "bb-star": "hsl(var(--bb-star))",
        "bb-social": "hsl(var(--bb-social-icon))",
      },
      fontFamily: {
        // Sora: display/title/subtitle + selected nav · DM Sans: body, captions, buttons, nav
        heading: ["var(--font-sora)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      // typography/styles_preserved — sizes in rem so user text-size settings scale everything
      fontSize: {
        display: ["2.75rem", { lineHeight: "2.875rem", fontWeight: "700" }], // 44/46 Sora 700
        title: ["2rem", { lineHeight: "2.125rem" }], // 32/34 Sora — weight open item (600 proposed)
        subtitle: ["1.375rem", { lineHeight: "1.5rem", fontWeight: "400" }], // 22/24 Sora
        description: ["1rem", { lineHeight: "1.125rem", fontWeight: "400" }], // 16/18 DM Sans
        caption: ["0.75rem", { lineHeight: "1.125rem", fontWeight: "400" }], // 12/18 — never essential info
        button: ["1.125rem", { lineHeight: "1.25rem" }], // 18/20 DM Sans — weight open item (600 proposed)
        nav: ["1rem", { lineHeight: "1.125rem" }], // 16/18
      },
      spacing: {
        // spacing/base_scale 4/8/12/16/24/32/48/64 map to Tailwind 1/2/3/4/6/8/12/16 (rem).
        // Semantic responsive values from tokens:
        "page-inline": "var(--bb-page-padding-inline)",
        "page-block": "var(--bb-page-padding-block)",
        section: "var(--bb-gap-section)",
        "card-gap": "var(--bb-gap-card)",
        component: "var(--bb-gap-component)",
        compact: "var(--bb-gap-compact)",
        "card-padding": "var(--bb-card-padding)",
        "nav-gap": "var(--bb-nav-item-gap)",
        // component/interaction: 48px universal hit target, 44px visual button height
        "hit-target": "3rem",
        "button-visual": "2.75rem",
      },
      maxWidth: {
        content: "75rem", // page/content_maximum_width 1200
      },
      minWidth: {
        button: "8.25rem", // button visual default_width 132
      },
      minHeight: {
        "hit-target": "3rem",
      },
      borderRadius: {
        DEFAULT: "var(--radius)", // button corner radius 8
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // component/button/effect/secondary_inner_shadow_if_needed
        "secondary-inner": "inset 0px 0px 8px rgba(127, 127, 127, 0.08)",
        // Elevation scale — 2 steps only (rest / raised), warm-tinted
        rest: "var(--shadow-rest)",
        raised: "var(--shadow-raised)",
      },
      transitionDuration: {
        // Motion rule: 150–200ms fades only
        fade: "150ms",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
