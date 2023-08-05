/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'idy': '#C76A57',
        'idy-light': '#ed9887'
      }
    },
  },
  plugins: [],
}