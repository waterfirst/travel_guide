/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#50C878',
        accent: '#FF6B6B',
        background: '#F7F9FC',
        textDark: '#2C3E50',
      },
    },
  },
  plugins: [],
}
