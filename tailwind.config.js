module.exports = {
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      dark: "#101317",
      lightGrey: "#a7aab2",
      grey: '#4e5361',
      black: '#000000',
      white: '#FFFFFF',
      red: '#a92f2f',
      green: '#01825b',
      greenFade: '#103534',
      redFade: '#3e1e28',
      purple: '#5739dd'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
