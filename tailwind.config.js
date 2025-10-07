/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebedff',
          200: '#d6dafe',
          300: '#b9bef8',
          400: '#989bef',
          500: '#667eea',
          600: '#5568d3',
          700: '#4451b8',
          800: '#3a429a',
          900: '#2f367d',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
