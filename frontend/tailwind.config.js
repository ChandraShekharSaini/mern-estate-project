/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    
    extend: {
      scale:{
       110:'0.9'
      },

      spacing: {
      //   '127':'7rem',
      //  '128':'10rem',


       '127':'9rem',
       '128':'12rem',
      
       //image
       '123':'35.25rem',
        '124':'80rem'
      },

     
    },
  },
  plugins: [],
}