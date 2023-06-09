/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/ui/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        origin: '14px 14px #404040',
      },
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
