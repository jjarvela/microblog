/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: "Merriweather Sans, sans-serif",
        body: "Montserrat, system-ui",
        sans: "Montserrat, system-ui", // This replaces the document wide default font.
      },

      fontSize: {
        sm: "0.833rem",
        base: "1rem",
        lg: "1.44rem",
        xl: "1.728rem",
        "2xl": "2.074rem",
        "3xl": "2.488rem",
        "4xl": "2.986rem",

        "md-lg": "1.266rem",
        "md-xl": "1.424rem",
        "md-2xl": "1.602rem",
        "md-3xl": "1.802rem",
        "md-4xl": "2.027rem",
      },

      colors: {
        primary: "#F28B36",
        primaryFrom: "#EF6140",
        primaryTo: "#F28B36",
        secondary: "#9E4DB9",
        black: "#3F3945",
        black75: "#6F6B74",
        black50: "#9F9CA2",
        black25: "#CFCDD0",
        white: "#FFFFFF",
        white75: "#CFCDD0",
        white50: "#9F9CA2",
        white25: "#6F6B74",
        warning: "#CC2929",
        warningBg: "#FFE6E6",
        warningHover: "#FF3333",
        warningDark: "#EA2626",
        warningBgDark: "#332424",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'short': { raw: '(min-height: 720px)'},
        'mid': { raw: '(min-height: 800px)'},
        'tall': { raw: '(min-height: 1080px)' },
      }
    },
    // Adding smaller breakpoints has to be done this way. https://tailwindcss.com/docs/screens#adding-smaller-breakpoints
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    }
  },
  plugins: [],
};
