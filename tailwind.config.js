const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '.65rem',
        '3xs': '.6rem',
      },
      height: {
        '7.5': '1.85rem',
      },
      width: {
        '7.5': '1.85rem',
      }
    },
    screens: {
      'sm': '1024px',
      'md': '1081px',
      'lg': '1920px',
      'xl': '2560px',
    },
  },
  plugins: [],
}
