/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        accent: {
          50: '#e6f9f0',
          100: '#c2f0db',
          200: '#9ae6c5',
          300: '#72dcaf',
          400: '#4ed299',
          500: '#2bc883',
          600: '#24a66f',
          700: '#1d835a',
          800: '#166146',
          900: '#0f3e31',
        },
      },
    },
  },
  plugins: [],
}
