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
        'auth': "url('/src/assets/auth-bg.jpg')",
        'register': "url('src/assets/register.svg')",
        'login': "url('src/assets/login.svg')",
        'radialGradient': 'radial-gradient(ellipse at bottom left, #DEF4C6, transparent), radial-gradient(ellipse at top, #b0cd61, transparent), radial-gradient(ellipse at right, #33a752, transparent), radial-gradient(ellipse at bottom, #4d9f0c, transparent);'
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
        "left": "-20px 0 20px -5px rgba(0, 0, 0, 0.15)",
      },
      animation: {
        'gradient': 'gradient 8s ease-in-out infinite',
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
      })
    }),


  ],
});

