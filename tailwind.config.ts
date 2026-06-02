import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B1A1A",
          hover: "#7A1717",
          light: "#F5E6E6",
        },
        secondary: "#C9848A",
        blush: {
          DEFAULT: "#FDF5F5",
          dark: "#F8EBEB",
        },
        borderBlush: "#E8D5D5",
        textDark: "#2D2D2D",
        laylNavy: "#1a1a2e",
        laylGold: "#D4AF37",
        rabi3Green: "#7C9A7E",
        rabi3Cream: "#F5F0E8",
        gold: "#C9A84C",
        cream: "#FAF6F0",
        burgundy: "#2D1B1B",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        amiri: ["var(--font-amiri)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
