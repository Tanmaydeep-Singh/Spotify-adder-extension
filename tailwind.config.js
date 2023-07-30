/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    colors: {
      'base':"#E5E5E5",
      'text':"#000000",

    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

