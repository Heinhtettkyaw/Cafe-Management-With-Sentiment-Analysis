/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'positive-color': '#4CAF50',
        'negative-color': '#F44336',
        'brown-600': '#694B2B',
        'brown-700': '#5A4125',
      },   fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}