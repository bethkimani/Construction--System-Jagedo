/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#0D0D3C',
        'hover-red': '#ff0066',
        'hover-orange': '#ff6600',
        'cream-bg': '#FEF3E6',
        'text-white': '#FFFFFF',
        'card-shadow': 'rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #ff0066, #ff6600)',
      },
    },
  },
  plugins: [],
};