module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#EAEDF6",
          main: "#3041C7",
          dark: "#000320",
          accent: "#0f30ab",
          "contrast-text": "#ffffff",
        },
        white:{
          DEFAULT: '#fff',
        },

      },
    },
    screens: {
      'xs': '0px',
      'sm': '640px',
      'md': '770px',
      'lg': '992px',
      'xl': '1500px',
      
    }
  },
  variants: {
    extend: {},
  
  },
  plugins: [],
};
