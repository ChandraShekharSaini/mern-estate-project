/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    
    extend: {
      scale:{
       110:'1.100'
      },

      spacing: {
        '127':'7rem',
       '128':'10rem',
      }
    },
  },
  plugins: [],
}