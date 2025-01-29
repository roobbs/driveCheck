/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      "1620p": { max: "1620px" },
      "1280p": { max: "1280px" },
      "1180p": { max: "1180px" },
      "1000p": { max: "1000px" },
      "900p": { max: "900px" },
      "825p": { max: "825px" },
      "780p": { max: "780px" },
      "750p": { max: "750px" },
      "680p": { max: "680px" },
      "650p": { max: "650px" },
      "580p": { max: "580px" },
      "490p": { max: "490px" },
      "440p": { max: "440px" },
      "400p": { max: "400px" },
      "390p": { max: "390px" },
      "372p": { max: "372px" },
    },
  },
  plugins: [],
};
