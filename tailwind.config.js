/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#F1F1F4",
        "border-accent": "#1F212A",
        "background-accent": "#0d0e12",
      },
      height: {
        header: "74px",
      },
    },
  },
  plugins: [],
};
