/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-outfit)"],
      },
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffe',
          300: '#7cc2fd',
          400: '#36a3fa',
          500: '#0c87eb',
          600: '#0069c9',
          700: '#0054a3',
          800: '#044886',
          900: '#093d6f',
        },
      },
    },
  },
  plugins: [],
};
