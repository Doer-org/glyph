/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/ui/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(370deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
    animation: {
      spinner: 'spinner 1.5s ease infinite;',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
