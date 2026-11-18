import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        ink: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#bcd3ff",
          300: "#8fb5ff",
          400: "#5b8cff",
          500: "#3b6cf6",
          600: "#2a4fe0",
          700: "#223fb8",
          800: "#1b318f",
          900: "#16296f",
          950: "#0a1229",
        },
        night: {
          900: "#060b18",
          850: "#080f20",
          800: "#0a1428",
          700: "#0e1a35",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter Variable", "system-ui", "sans-serif"],
        display: ["Space Grotesk Variable", "Inter Variable", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(120,160,255,0.10), 0 18px 50px -12px rgba(30,80,255,0.45)",
        card: "0 24px 70px -30px rgba(2,8,30,0.9)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 6s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
