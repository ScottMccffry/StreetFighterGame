module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  fontFamily: {
    'press_start_2p': ['Press Start 2P', 'monospace'],
    'permanent_marker': ['Permanent Marker', 'monospace'],
  },
  theme: {
    extend: {
      skew: {
        '-10': '-10deg',
      },
      rotate: {
        '-10': '-10deg',
      },
      translate: {
        '3': '3rem',
      },
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
