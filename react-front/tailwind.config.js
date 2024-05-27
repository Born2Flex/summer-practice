/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'auth': "url('https://tailwindui.com/img/beams-pricing.png')",
        'register': "url('src/assets/register.svg')",
        'login': "url('src/assets/login.svg')",
        'radial-blur': "radial-gradient(ellipse 50% 100% at center , #ffff, #ffff, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))",
        'radial-blur-lg': "radial-gradient(ellipse 70% 120% at center , #ffff, #ffff, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))",
      },
      backgroundColor: {
        "primary": '#DEF4C6',
        'secondary': '#B1CF5F',
        'danger': '#1B512D',
        'neutral': '#a3b18a',
        'sidebar': '#dad7cd'
      },
      textColor: {
        'neutral': '#dad7cd',
        'danger': '#1B512D',
        'accent': '#588157',
      },
      gradientColorStops: {
        "primary": '#DEF4C6',
        'secondary': '#B1CF5F',
        'danger': '#1B512D',
        'neutral': '#a3b18a',
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      boxShadow: {
        "rounded": "0 0 10px rgba(0, 0, 0, 0.1)",
        "rounded-lg": "0 0 20px rgba(0, 0, 0, 0.1)",
        "left": "-20px 0 20px -5px rgba(0, 0, 0, 0.15)",
      },
      animation: {
        'gradient': 'gradient 11s linear infinite',
        'blobs': 'gradient 15s linear infinite',
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '300% center' },
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),

    plugin(function ({ addComponents, addBase, theme }) {
      addComponents({
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '5px',
          height: '3px',
          borderRadius: '2px',
          zIndex: 50,
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: '#e2e7d4',
          borderRadius: '50px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: '#9fa68e',
          borderRadius: '50px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: '#818774',
        },
        '.custom-scrollbar-gray::-webkit-scrollbar-track': {
          background: theme('colors.gray.800'),
          borderRadius: '50px',
        },
        '.custom-scrollbar-gray::-webkit-scrollbar-thumb': {
          background: theme('colors.gray.500'),
          borderRadius: '50px',
        },
        '.custom-scrollbar-gray::-webkit-scrollbar-thumb:hover': {
          background: theme('colors.gray.400'),
        },
      })
    }),


  ],
});

