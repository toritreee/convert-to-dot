/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        popup: {
          '0%, 100%': { transform: 'translateY(100%)' },
          '15%, 85%': { transform: 'translateY(0%)' },
        }
      },
      animation: {
        popup: "popup 3s ease-in-out infinite"
      }
    },
  },
  plugins: [],
}

