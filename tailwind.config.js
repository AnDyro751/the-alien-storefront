module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        secondary: "#fbd0a5",
      }),
      height: {
        xxl: "30em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
