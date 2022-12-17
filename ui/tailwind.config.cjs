/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
      keyframes: {
        appear: {
          "0%": {
            opacity: 0,
            width: 0,
          },
          "50%": {
            opacity: 0,
            scale: 0,
          },
          "100%": {
            opacity: 1,
            scale: "100%",
          },
        },
      },
      animation: {
        appear: "appear 0.7s ease-in-out",
      },
    },
  },
  plugins: [],
};
