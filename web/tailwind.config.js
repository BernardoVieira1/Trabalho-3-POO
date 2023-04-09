/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: "Roboto, sans-serif"
      },

      backgroundImage:{
        app: 'url(/background.svg)',
        check:'url(/background.svg)'
      },

      colors:{
        gray: {
          100: "rgba(67, 67, 67, 0.9)",
          500:"#434343",
          900: "#3F3F3F"
        },

        violet:{
          500: "#B500F4",
          600: "#A302DB"

        },

        red:{
          300: "#FF0000",
          400: "#D20000"

        },

        yellow:{
          100: "#FBFF3F",
          200: "#D5D839"
        }



      }
    },
  },
  plugins: [],
}

