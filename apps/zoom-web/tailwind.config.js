/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        voom_base_primary: '#1D1F2E',
        voom_base_secondary: '#222534',
        voom_base_third: '#2F313E',
        voom_primary: '#0D78F9',
        voom_secondary: '#FF742E',
      },
    },
  },
  plugins: [],
};
