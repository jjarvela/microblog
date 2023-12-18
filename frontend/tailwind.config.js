/** @type {import('tailwindcss').Config} */
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
      },
    },
  },
  plugins: [],
};
