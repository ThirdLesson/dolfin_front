/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,mdx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'dol-main': '#5264BF',
        'dol-dark': '#354E73',
        'dol-sub': '#CEDFF6',
        'dol-point': '#C6B7FA',
        'dol-light-gray': '#B1B1B1',
        'dol-dark-gray': '#626262',
        'dol-error': '#E80B26',
      },
    },
  },
  plugins: [],
};
