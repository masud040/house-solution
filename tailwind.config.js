/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screen: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          "extra-light": "#ffccdc",
          lightest: "#ff99b9",
          lighter: "#ff6795",
          light: "#ff3472",
          DEFAULT: "#ff014f",
          dark: "#cc013f",
          darker: "#99012f",
          darkest: "#660020",
          "extra-dark": "#330010",
        },
        secondary: { DEFAULT: "#3C3E41", light: "#d9dee2", dark: "#1b1c1d" },
        tertiary: { DEFAULT: "#C4CFDE" },
        "soft-petch": {
          DEFAULT: "#f0efef",
        },
        thunder: {
          DEFAULT: "#2e2e2e",
        },
        background: {
          light: "#FFFF",
          dark: "#212428",
          darkist: "#191b1e",
        },
      },
      height: {
        13: "52px",
      },
      boxShadow: {
        elevated: "5px 5px 15px #D1D9E6, -5px -5px 15px #ffffff",
        "elevated-dark": "10px 10px 19px #1c1e22, -10px -10px 19px #262a2e",
        "custom-inset":
          "rgb(204, 219, 232) 3px 4px 3px -3px inset, rgb(204, 219, 232) -3px -3px 3px -3px inset",
        "custom-inset-dark":
          "3px 4px 3px -3px rgba(0, 0, 0, 0.7) inset, -3px -3px 3px -3px rgba(255, 255, 255, 0.2) inset",
        "custom-dark": "0 8px -4px rgba(0, 0, 0, 0.7)",
        "custom-black": "0 8px -4px black",
        "custom-gray":
          "0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
