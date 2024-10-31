/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'state-grid': {
          DEFAULT: '#004C29',
          light: '#00813d',
          dark: '#003920',
        },
      },
    },
  },
  plugins: [],
};