import type { Config } from "tailwindcss";

const config = {
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        gold: {
          DEFAULT: "#ffd700",
          "50": "#ffffe7",
          "100": "#feffc1",
          "200": "#fffd86",
          "300": "#fff441",
          "400": "#ffe60d",
          "500": "#ffd700",
          "600": "#d19e00",
          "700": "#a67102",
          "800": "#89580a",
          "900": "#74480f",
          "950": "#442604",
        },
        zaffre: {
          DEFAULT: "#0818a8",
          "50": "#deeafd",
          "100": "#c3d7fc",
          "200": "#93b5fa",
          "300": "#5283f7",
          "400": "#0e3bf4",
          "500": "#0818a8",
          "600": "#070a94",
          "700": "#070c94",
          "800": "#060a7e",
          "900": "#0a0d61",
          "950": "#060738",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
} satisfies Config;

export default config;
