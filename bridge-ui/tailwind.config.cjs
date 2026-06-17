// Consumes the generated token theme (src/tokens/tailwind-tokens.cjs).
// Regenerate that file with `npm run tokens` (i.e. /dev-tokens) after every /fig-sync.
const tokens = require('./src/tokens/tailwind-tokens.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      fontSize: tokens.fontSize,
      fontFamily: {
        // Real families from text-styles.json: Cal Sans (display/heading/label), DM Sans (body).
        display: ['Cal Sans', 'DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Cal Sans', 'DM Sans', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
