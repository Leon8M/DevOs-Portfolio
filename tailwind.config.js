// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'xp-start-button-gradient': 'linear-gradient(to bottom, #74A536, #5E8F1F)',
        'xp-start-button-hover-gradient': 'linear-gradient(to bottom, #82B344, #6AA02D)',
        'xp-start-button-active-gradient': 'linear-gradient(to top, #74A536, #5E8F1F)',
        'xp-taskbar-gradient': 'linear-gradient(to top, #245DCF, #3D85E5)',
        'xp-button-inactive-gradient': 'linear-gradient(to bottom, #D4E0F4, #B7CDEE)',
        'xp-button-focused-gradient': 'linear-gradient(to top, #3667B7, #4A7FD3)',
        'xp-header-gradient': 'linear-gradient(to bottom, #084ac1, #1c64d1, #2575e9)',
      },
      colors: {
        'xp-blue-dark': '#245DCF',
        'xp-blue-medium': '#3D85E5',
        'xp-blue-light': '#D6E5F7',
        'xp-gray-light': '#D6D6D6',
        'xp-green': '#5E8F1F',
        'xp-border-dark': '#0A367E',
        'xp-text-dark': '#2F4F4F',
        'xp-clock-blue': '#A3C4FA',
        'xp-highlight-blue': '#316ac5',
        'xp-separator': '#a3b3c5',
      },
      boxShadow: {
        'xp-inset': 'inset 1px 1px 2px rgba(0,0,0,0.3)',
        'xp-outset': '2px 2px 5px rgba(0,0,0,0.3)',
        'xp-dialog': '5px 5px 15px rgba(0,0,0,0.4)',
      },
      fontFamily: {
        'xp-ui': ['Tahoma', 'Geneva', 'sans-serif'], // Add Tahoma as a primary UI font
      },
      // You can add more specific utility classes in globals.css if needed
    },
  },
  plugins: [],
}