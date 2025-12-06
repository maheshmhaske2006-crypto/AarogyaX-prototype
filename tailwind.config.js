/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#f0f7f0',
          100: '#e0f0e0',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
        },
        saffron: {
          500: '#FF9933',
          600: '#FF8800',
        },
      },
    },
  },
  plugins: [],
};
