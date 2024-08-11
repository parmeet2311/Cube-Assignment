/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      extend: {
        fontFamily: {
            
            "SF-Pro-Regular": ["SF-Pro-Regular", "sans-serif"],
            "SF-Pro-Medium": ["SF-Pro-Medium", "sans-serif"],
            "SF-Pro-Semibold": ["SF-Pro-Semibold", "sans-serif"],
            "SF-Pro-Bold": ["SF-Pro-Bold", "sans-serif"],
          
          },
      },
    },
    plugins: [],
  }