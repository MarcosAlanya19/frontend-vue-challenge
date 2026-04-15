import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/modules/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/composables/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Gray
        "gray-60": "#686868",
        "gray-40": "#A7A7A7",
        "gray-25": "#E0E0E0",
        "gray-21": "#EEEDED",
        "gray-23": "#E0E4EB",
        "gray-20": "#EFF0F6",
        "gray-10": "#F6F6F9",
        "gray-66": "#666666",
        "gray-background": "#f7f6f8",

        // Primary
        primary: "#00E3C2",
        "primary-ultra-light": "#B2E7DF",

        // Secondary
        secondary: "#060F26",
        "secondary-light": "#2D313D",
        "secondary-lighter": "#606B89",

        // Success
        green: "#05BE50",
        "green-lighter": "#D9FFE8",

        // Warning
        red: "#FF3D4A",
        "red-lighter": "#F1E1E4",

        // Informative
        blue: "#082774",
        "blue-lighter": "#D2E9FF",
        "blue-ultra-light": "#E8EEF4",

        // Brown
        brown: "#7B3F0A",
        "brown-light": "#F9F0E9",
      },
      fontFamily: {
        regular: ["Montserrat", "sans-serif"],
        medium: ["Montserrat", "sans-serif"],
        semibold: ["Montserrat", "sans-serif"],
        bold: ["Montserrat", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        sm: "12px",
        base: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "48px",
        "5xl": "64px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
