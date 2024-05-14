/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

