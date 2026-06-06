import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand blue (matches the FightCamp Wizard app — blue-600 primary)
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Accent text/highlight blue used on dark surfaces
        accent: "#5b9cff",
        // ── "Cornerman" dark system ──────────────────────────────────────
        // Page + surfaces (near-black with a faint navy lift)
        // NOTE: named `night` (not `base`) so it never collides with the
        // built-in `text-base` font-size utility.
        night: "#0a0e14", // page background
        surface: {
          DEFAULT: "#10151e", // cards / panels
          2: "#0d1320", // insets (phone screens, dashboards)
          3: "#161d2a", // hovered / raised
        },
        lift: "#15233f", // radial depth behind hero / CTA
        // Text on dark
        ink: {
          DEFAULT: "#eaf0fb", // primary text
          soft: "#c3cee0", // secondary
          muted: "#9fb0cc", // tertiary / captions
          faint: "#7d8ba6", // mono labels
        },
        // Championship accent — used sparingly (Pro, #1 rank, key highlights)
        gold: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          soft: "#fcd34d",
        },
        // Functional data-viz signals only
        success: "#34d399",
        warn: "#f59e0b",
        danger: "#f87171",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Archivo",
          "Inter",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        // Blue glows tuned for the dark base
        glow: "0 0 60px -10px rgba(59, 130, 246, 0.55)",
        "glow-sm": "0 0 28px -8px rgba(59, 130, 246, 0.5)",
        gold: "0 0 50px -12px rgba(245, 158, 11, 0.45)",
        card: "0 18px 50px -24px rgba(0, 0, 0, 0.7)",
        float: "0 28px 70px -22px rgba(37, 99, 235, 0.55)",
        soft: "0 8px 30px -14px rgba(0, 0, 0, 0.6)",
        // crisp primary-button depth (replaces the chunky 3D press shadow)
        btn: "0 10px 24px -10px rgba(37, 99, 235, 0.7)",
        "btn-hover": "0 16px 34px -10px rgba(37, 99, 235, 0.85)",
      },
      backgroundImage: {
        // Dark cinematic hero: radial navy lift fading into near-black
        "hero-grad":
          "radial-gradient(120% 110% at 78% -10%, #15233f 0%, #0b1018 48%, #0a0e14 100%)",
        "brand-grad": "linear-gradient(135deg, #2563eb 0%, #3b82f6 55%, #60a5fa 100%)",
        "sky-grad": "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
        "gold-grad": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        // Subtle surface sheen for elevated cards
        "surface-sheen":
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 40%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // ambient breathing glow for hero/CTA blobs
        breathe: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        // travelling sheen along the grid lines / connectors
        "pan-grid": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "32px 32px" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        breathe: "breathe 8s ease-in-out infinite",
        "pan-grid": "pan-grid 6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
