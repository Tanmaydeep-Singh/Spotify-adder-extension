/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    colors: {
      'base':"#1FAB89",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

