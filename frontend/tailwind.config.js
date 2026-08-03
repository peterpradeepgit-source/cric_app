/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cbgreen: '#1a8e2a',
        cbdark: '#0e141b',
        cbcard: '#1a2330',
        cbaccent: '#2dd4bf',
      },
    },
  },
  plugins: [],
}
