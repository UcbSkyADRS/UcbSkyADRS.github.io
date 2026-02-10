/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        berkeleyBlue: "#003262",
        berkeleyGold: "#FDB515",
        primary: "#0f172a",
        secondary: "#475569",
        muted: "#94a3b8",
        surface: "#f8fafc",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
