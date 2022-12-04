/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  important: true,
  theme: {
    screens: {
      xs: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
        sm: "1rem",
        lg: "45px",
        xl: "5rem",
        "2xl": "13rem",
      },
    },
    extend: {
      colors: {
        primary: {
          light: "rgba(246,141,47,.4)",
          DEFAULT: "#f78e2f",
          dark: "#e77e1f",
          heading: "#f97500",
        },
        secondary: {
          light: "#3d3d3d",
          DEFAULT: "#444444",
          dark: "#17222d",
          gray: "#f8fafc",
        },
        other: {
          light: "#e2dcd9",
          "cart-light": "#e5e5e5",
          gray: "#8d9296",
          blue: "#2fb5f6",
          red: "#ff0007",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "serif"],
        playfairDisplay: ["Playfair Display", "serif"],
        atcripley: ["ATC Ripley", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        sm: "0 2px 4px 0 rgb(60 72 88 / 0.15)",
        DEFAULT: "0 0 3px rgb(60 72 88 / 0.15)",
        md: "0 5px 13px rgb(60 72 88 / 0.20)",
        lg: "0 10px 25px -3px rgb(60 72 88 / 0.15)",
        xl: "0 20px 25px -5px rgb(60 72 88 / 0.1), 0 8px 10px -6px rgb(60 72 88 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(60 72 88 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(60 72 88 / 0.05)",
        cart: "0 15px 60px rgb(0 0 0 / 8%)",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        999: "999",
      },
      backgroundImage: {
        "client-banner": "url('/assets/images/banner-bg.svg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
