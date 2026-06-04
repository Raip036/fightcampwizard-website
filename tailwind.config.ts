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
        ink: {
          DEFAULT: "#0b1220",
          soft: "#1a2436",
          muted: "#64748b",
        },
        sand: "#f7f9fc",
        // Accent pops for gamified/playful sections
        sun: "#ffb703",
        flame: "#fb5607",
        mint: "#2dd4bf",
        grape: "#8b5cf6",
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
          "Poppins",
          "Inter",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(37, 99, 235, 0.5)",
        card: "0 10px 40px -12px rgba(15, 23, 42, 0.18)",
        float: "0 24px 60px -18px rgba(37, 99, 235, 0.4)",
        soft: "0 4px 24px -6px rgba(15, 23, 42, 0.1)",
      },
      backgroundImage: {
        "hero-grad":
          "radial-gradient(120% 120% at 50% 0%, #dbeafe 0%, #eff6ff 35%, #ffffff 70%)",
        "brand-grad": "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
        "sky-grad": "linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        wiggle: "wiggle 2.5s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
