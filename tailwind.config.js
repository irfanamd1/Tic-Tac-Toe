/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonAqua: '#26FFCB',
        darkBlueGray: '#0F1B21',
        deepSlate: '#1F3540'
      },
    },
  },
  plugins: [],
}