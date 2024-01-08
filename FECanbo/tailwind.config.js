/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        TSBlue: "#3178c6",
        cream: "#e3e7f3",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
