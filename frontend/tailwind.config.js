/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      boxShadow: {
        'custom': '0 0 15px rgba(255, 255, 255)',
      },
    }
  },
  plugins: [],
}
