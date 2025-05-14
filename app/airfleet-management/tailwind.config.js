/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#640D5F",
          light: "#8B4C84", // Lighter shade for accents
          dark: "#45083E", // Darker shade for depth
        },
        secondary: {
          DEFAULT: "#D91656",
          light: "#E94E7E", // Lighter shade for accents
          dark: "#A00F40", // Darker shade for depth
        },
        accent: {
          orange: {
            DEFAULT: "#EB5B00",
            light: "#FF7F33", // Lighter accent
            dark: "#B34100", // Darker shade
          },
          yellow: {
            DEFAULT: "#FFB200",
            light: "#FFD366", // Soft highlight
            dark: "#CC8E00", // Richer variant
          },
        },
        neutral: {
          light: "#F5F5F5", // Minimalist light gray for backgrounds
          dark: "#1A1A1A", // Deep dark for contrast
          muted: "#CCCCCC", // Soft gray for borders
        },
      },
      animation: {
        scroll: "scroll 15s linear infinite", // Applying scroll animation
      },
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(100%)", // Start at the right side of the screen
          },
          "100%": {
            transform: "translateX(-100%)", // End at the left side of the screen
          },
        },
      },
    },
  },
  plugins: [
     scrollbar,
    ],
};
