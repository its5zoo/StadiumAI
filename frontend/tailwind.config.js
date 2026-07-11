/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a", // Navy background
        primary: "#1e3a8a", // FIFA Deep Blue
        accent: "#16a34a", // FIFA Green
        fifagold: "#facc15"
      }
    },
  },
  plugins: [],
}
