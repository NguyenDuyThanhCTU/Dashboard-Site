import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        p: '240px',
        d: '1024px',
        lg: '1650px',
      },
      fontFamily: {
        LexendDeca: ['Lexend Deca', 'sans-serif'],
      },

      colors: {},
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
