/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
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
        'danger': '#256e3d',
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
        'gradient': 'gradient 8s linear infinite',
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
          background: theme('colors.gray.200'),
          borderRadius: '50px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: theme('colors.gray.400'),
          borderRadius: '50px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: theme('colors.gray.500'),
        },
      })
    }),


  ],
}

