/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cbgreen: 'rgb(var(--color-green) / <alpha-value>)',
        cblive: 'rgb(var(--color-live) / <alpha-value>)',
        cbcompleted: 'rgb(var(--color-completed) / <alpha-value>)',
        cbupcoming: 'rgb(var(--color-upcoming) / <alpha-value>)',
        cbwicket: 'rgb(var(--color-wicket) / <alpha-value>)',
        cbalert: 'rgb(var(--color-alert) / <alpha-value>)',
        cbdark: 'rgb(var(--color-bg) / <alpha-value>)',
        cbcard: 'rgb(var(--color-card) / <alpha-value>)',
        cbaccent: 'rgb(var(--color-accent) / <alpha-value>)',
        cbsurface: 'rgb(var(--color-surface) / <alpha-value>)',
        cbborder: 'rgb(var(--color-border) / <alpha-value>)',
        cbtext: 'rgb(var(--color-text) / <alpha-value>)',
        cbmuted: 'rgb(var(--color-muted) / <alpha-value>)',
        cbonaccent: 'rgb(var(--color-on-accent) / <alpha-value>)',
        cbonlive: 'rgb(var(--color-on-live) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
