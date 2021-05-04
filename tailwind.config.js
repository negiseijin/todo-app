const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    // '.src/pages/**/*.{js,ts,jsx,tsx}',
    // '.src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
