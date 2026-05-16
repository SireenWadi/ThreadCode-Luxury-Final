import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#0a0a0a",
          900: "#121212",
          800: "#1a1a1a",
          700: "#242424",
          600: "#2e2e2e",
        },
        silver: {
          100: "#f8f8f8",
          200: "#e8e8e4",
          300: "#d4d4cc",
          400: "#b8b8b0",
          500: "#9a9a92",
        },
        gold: {
          light: "#d4b896",
          DEFAULT: "#c9a97a",
          dark: "#a88550",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-luxury":
          "radial-gradient(ellipse at 50% 0%, rgba(201,169,122,0.08) 0%, transparent 60%)",
        "radial-card":
          "radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-up": "fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 1.4s ease forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
