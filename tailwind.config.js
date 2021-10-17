module.exports = {
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      "text-white",
      "bg-index-top-xs",
      "md:bg-index-top-tt",
      "bg-index-top-tt-xs",
      "w-1/3",
      "w-1/4",
      "/w-[1-9]/[1-9]/",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      dark: "#101317",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
