module.exports = {
  darkMode: "class",
  content: ["./src/*.vue", "./*.html"],
  theme: {
    extend: {
      animation: {
        tilt: "tilt 1.6s infinite linear alternate",
      },
      keyframes: {
        tilt: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
  plugins: [],
};
