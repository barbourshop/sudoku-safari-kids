
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#64748b",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#86efac",
          foreground: "#1f2937",
        },
        success: {
          DEFAULT: "#4ade80",
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#f87171",
          foreground: "#ffffff",
        },
      },
      keyframes: {
        "number-pop": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "cell-highlight": {
          "0%": { backgroundColor: "rgba(134, 239, 172, 0.2)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        "number-pop": "number-pop 0.2s ease-out forwards",
        "cell-highlight": "cell-highlight 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
