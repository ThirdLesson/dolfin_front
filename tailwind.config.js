// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,mdx}'],
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
        corelight: ['S-CoreDream-3Light', 'sans-serif'],
      },
      keyframes: {
        fadein: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
            visibility: 'hidden',
          },
          '1%': {
            visibility: 'visible',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            visibility: 'visible',
          },
        },
      },
      animation: {
        fadein: 'fadein 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
