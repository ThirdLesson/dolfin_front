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
        'dol-light-sub': '#F1F6FD',
        'dol-point': '#C6B7FA',
        'dol-light-gray': '#B1B1B1',
        'dol-dark-gray': '#626262',
        'dol-error': '#E80B26',
        'dol-light-bg': '#F4F4F4',
        'dol-light': '#F2F2F2',
      },
      borderRadius: {
        lg: '20px',
        md: '8px',
        sm: '5px',
      },
      boxShadow: {
        'custom-shadow': '0 0 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        jua: ['Jua', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
